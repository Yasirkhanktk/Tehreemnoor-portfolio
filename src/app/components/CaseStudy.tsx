"use client"

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
import { useIsMobile } from "../utils/useIsMobile";
import logoImg from "../../imports/Logo-dark.png";
import type { ProjectData } from "../data/projects";

const LIME = "#C5F135";
const FH = "'Space Grotesk', sans-serif";
const FB = "'Inter', sans-serif";

// ─── Reusable animation preset ───────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.78,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.78,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
});

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <p
      style={{
        margin: "0 0 18px",
        fontSize: 9.5,
        letterSpacing: "0.18em",
        color: "#bbb",
        textTransform: "uppercase",
        fontFamily: FB,
      }}
    >
      {number} — {title}
    </p>
  );
}

// ─── Browser mockup frame ─────────────────────────────────────────────────────
function BrowserMockup({
  src,
  alt,
  bg,
  onClick,
}: {
  src: string;
  alt: string;
  bg: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: bg,
        borderRadius: 14,
        padding: "28px 24px 0",
        overflow: "hidden",
        cursor: onClick ? "zoom-in" : "default",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={onClick ? "hover:scale-[1.02] active:scale-[0.98] hover:brightness-[1.02]" : ""}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "8px 8px 0 0",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff605c", "#ffbd44", "#00ca4e"].map((c) => (
            <div
              key={c}
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "#f3f3f3",
            borderRadius: 4,
            height: 18,
            marginLeft: 8,
          }}
        />
      </div>
      <ImageWithFallback
        src={src}
        alt={alt}
        style={{
          width: "100%",
          display: "block",
          objectFit: "cover",
          maxHeight: 380,
        }}
      />
    </div>
  );
}

interface Props {
  project: ProjectData;
  nextProject: ProjectData | null;
  onClose: () => void;
  onLogoClick?: () => void;
  onNavigate: (id: number) => void;
}

export function CaseStudy({
  project,
  nextProject,
  onClose,
  onLogoClick,
  onNavigate,
}: Props) {
  const isMobile = useIsMobile();
  const cs = project.caseStudy;
  const px = isMobile ? 24 : 60;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [previewSrc, setPreviewSrc] = useState<any>(null);
  const [previewAlt, setPreviewAlt] = useState<string>("");

  const handleImageClick = (src: any, alt: string) => {
    setPreviewSrc(src);
    setPreviewAlt(alt);
    dialogRef.current?.showModal();
  };

  // Scroll to top on mount or project change
  useEffect(() => {
    const scroller = document.getElementById("main-scroll");
    if (scroller) {
      // Use smooth or auto, but instant can sometimes be ignored
      scroller.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [project.id]);

  // Fallback for light-dismiss on backdrop click (e.g. Safari / older browsers)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if ('closedBy' in HTMLDialogElement.prototype) return;
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (!isDialogContent) {
        dialog.close();
      }
    };

    dialog.addEventListener("click", handleBackdropClick);
    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  return (
    <div>
      {/* ── STICKY NAV ────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${px}px`,
          height: 64,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #ebebeb",
        }}
      >
        <button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            fontSize: 12,
            color: "#555",
            fontFamily: FB,
            letterSpacing: "0.04em",
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          {!isMobile && "Back to Home"}
        </button>

        <button
          onClick={onLogoClick || onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src={typeof logoImg === 'string' ? logoImg : logoImg.src}
            alt="logo"
            style={{
              width: 36,
              height: 36,
              objectFit: 'contain',
            }}
          />
          {!isMobile && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#0d0d0d",
                fontFamily: FH,
              }}
            >
              Tehreem Noor
            </span>
          )}
        </button>

        <div style={{ width: isMobile ? 40 : 120 }} />
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: isMobile ? "70vh" : "calc(100vh - 64px)",
          height: isMobile ? "auto" : "calc(100vh - 64px)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          scrollSnapAlign: isMobile ? "none" : "start",
          boxSizing: "border-box",
        }}
      >
        {/* ── Full-bleed background image ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <ImageWithFallback
            src={cs.contextImage || cs.designImage}
            alt={project.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </div>

        {/* ── Dark gradient overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.52) 40%, rgba(0,0,0,0.90) 100%)",
          }}
        />

        {/* ── Top accent strip ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: project.bg,
            zIndex: 2,
          }}
        />


        {/* ── Content overlaid on image ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: isMobile ? "60px 24px 52px" : "80px 60px 72px",
            maxWidth: 860,
          }}
        >
            {/* Category + year row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: project.bg === "#C5F135" ? "#526500" : "#fff",
                  background: project.bg,
                  padding: "4px 12px",
                  borderRadius: 100,
                  fontFamily: FB,
                }}
              >
                {project.category.toUpperCase()}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: FB,
                }}
              >
                {project.year}
              </span>
              <span
                style={{
                  width: 20,
                  height: 1,
                  background: "rgba(255,255,255,0.3)",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: FB,
                  letterSpacing: "0.08em",
                }}
              >
                Case Study
              </span>
            </motion.div>

            {/* Project name */}
            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.92,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.07,
              }}
              style={{
                margin: "0 0 6px",
                fontSize: isMobile
                  ? "clamp(48px, 12vw, 68px)"
                  : "clamp(64px, 7.2vw, 100px)",
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: "-0.045em",
                color: "#ffffff",
                fontFamily: FH,
                textShadow: "0 2px 32px rgba(0,0,0,0.4)",
              }}
            >
              {project.name}
            </motion.h1>

            {/* Tags row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 28,
                marginTop: 16,
              }}
            >
              {project.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: FB,
                    letterSpacing: "0.1em",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2 }}
              style={{
                margin: "0 0 40px",
                fontSize: isMobile ? 14 : 15.5,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.75,
                fontFamily: FB,
                maxWidth: 520,
              }}
            >
              {cs.tagline}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                height: 1,
                background: "rgba(255,255,255,0.18)",
                marginBottom: 32,
                maxWidth: 520,
              }}
            />

            {/* Meta grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, auto)",
                gap: isMobile ? "18px 32px" : "0 48px",
              }}
            >
              {[
                { label: "Role", value: cs.role },
                { label: "Duration", value: cs.duration },
                { label: "Team", value: cs.team },
                { label: "Category", value: project.category },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: 9,
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: FB,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: "#ffffff",
                      fontFamily: FH,
                      fontWeight: 600,
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* ── 01 CONTEXT ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          padding: isMobile ? "72px 24px" : "40px 60px",
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          display: isMobile ? "block" : "flex",
          alignItems: "center",
          boxSizing: "border-box",
          scrollSnapAlign: isMobile ? "none" : "start",
          scrollMarginTop: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 48 : 72,
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Text */}
          <div style={{ flex: "0 0 48%" }}>
            <motion.div {...fadeUp()}>
              <SectionLabel number="01" title="Context" />
              <h2
                style={{
                  margin: "0 0 28px",
                  fontSize: isMobile
                    ? "clamp(24px, 7vw, 34px)"
                    : "clamp(28px, 3vw, 40px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#0d0d0d",
                  fontFamily: FH,
                }}
              >
                {cs.context.headline}
              </h2>
            </motion.div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {cs.context.body.map((p, i) => (
                <motion.p
                  key={i}
                  {...fadeUp(0.1 + i * 0.08)}
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    color: "#777",
                    lineHeight: 1.8,
                    fontFamily: FB,
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Image */}
          <motion.div
            {...fadeLeft(0.18)}
            style={{ flex: 1, minWidth: 0 }}
          >
            <BrowserMockup
              src={cs.context.image || cs.contextImage}
              alt="Context visual"
              bg={`${project.bg}22`}
              onClick={() => handleImageClick(cs.context.image || cs.contextImage, "Context visual")}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 02 DESIGN APPROACH ────────────────────────────────────────────── */}
      <section
        style={{
          background: "#F7F7F5",
          borderTop: "1px solid #eee",
          padding: isMobile ? "72px 24px" : "40px 60px",
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          display: isMobile ? "block" : "flex",
          alignItems: "center",
          boxSizing: "border-box",
          scrollSnapAlign: isMobile ? "none" : "start",
          scrollMarginTop: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row-reverse",
            gap: isMobile ? 48 : 72,
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Text column on right (using row-reverse) */}
          <div style={{ flex: "0 0 48%" }}>
            <motion.div {...fadeUp()}>
              <SectionLabel number="02" title="Design Approach" />
              <h2
                style={{
                  margin: "0 0 28px",
                  fontSize: isMobile
                    ? "clamp(24px, 7vw, 34px)"
                    : "clamp(28px, 3vw, 40px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#0d0d0d",
                  fontFamily: FH,
                }}
              >
                {cs.designApproach.headline}
              </h2>
            </motion.div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {cs.designApproach.body.map((p, i) => (
                <motion.p
                  key={i}
                  {...fadeUp(0.12 + i * 0.08)}
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    color: "#777",
                    lineHeight: 1.8,
                    fontFamily: FB,
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Image column on left (rendered after due to row-reverse) */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {(() => {
              const imgs = cs.designApproach.images && cs.designApproach.images.length > 0
                ? cs.designApproach.images.filter(Boolean)
                : [cs.designImage];

              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {imgs.map((img, i) => (
                    <motion.div
                      key={i}
                      {...fadeUp(0.2 + i * 0.1)}
                      onClick={() => handleImageClick(img, `Design approach ${i + 1}`)}
                      style={{
                        width: "100%",
                        height: isMobile ? 260 : "clamp(300px, 45vh, 460px)",
                        borderRadius: 16,
                        overflow: "hidden",
                        border: "1px solid #e8e8e8",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                        background: "#f5f5f5",
                        flexShrink: 0,
                        cursor: "zoom-in",
                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      className="hover:scale-[1.015] active:scale-[0.99] hover:brightness-[1.02]"
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`Design approach ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                          objectFit: "cover",
                          objectPosition: "top center",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── 03 MY ROLE ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: isMobile ? "72px 24px" : "40px 60px",
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          display: isMobile ? "block" : "flex",
          alignItems: "center",
          boxSizing: "border-box",
          scrollSnapAlign: isMobile ? "none" : "start",
          scrollMarginTop: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 36 : 80,
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ flex: "0 0 38%" }}>
            <motion.div {...fadeUp()}>
              <SectionLabel number="03" title="My Role" />
              <h2
                style={{
                  margin: 0,
                  fontSize: isMobile
                    ? "clamp(24px, 7vw, 34px)"
                    : "clamp(28px, 3vw, 40px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#0d0d0d",
                  fontFamily: FH,
                }}
              >
                {cs.myRole.headline}
              </h2>
            </motion.div>
          </div>

          <div style={{ flex: 1 }}>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {cs.myRole.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  {...fadeUp(i * 0.07)}
                  style={{
                    padding: "18px 0",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      flexShrink: 0,
                      borderRadius: "50%",
                      border: `1.5px solid ${LIME}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: LIME,
                      }}
                    />
                  </span>
                  <span
                    style={{
                      fontSize: 13.5,
                      color: "#555",
                      fontFamily: FB,
                      lineHeight: 1.65,
                    }}
                  >
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 04 IMPACT ─────────────────────────────────────────────────────── */}
      {/* ── 04 IMPACT (A): DESCRIPTION & METRICS ──────────────────────────── */}
      <section
        style={{
          background: "#F7F7F5",
          borderTop: "1px solid #eee",
          padding: isMobile ? "72px 24px" : "40px 60px",
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          display: isMobile ? "block" : "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxSizing: "border-box",
          scrollSnapAlign: isMobile ? "none" : "start",
          scrollMarginTop: 64,
        }}
      >
        <div style={{ width: "100%" }}>
          <motion.div {...fadeUp()} style={{ marginBottom: 52 }}>
            <SectionLabel number="04" title="Impact" />
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                gap: isMobile ? 16 : 48,
                alignItems: isMobile ? "flex-start" : "flex-end",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  flex: "0 0 40%",
                  fontSize: isMobile
                    ? "clamp(24px, 7vw, 34px)"
                    : "clamp(28px, 3vw, 40px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#0d0d0d",
                  fontFamily: FH,
                }}
              >
                {cs.impact.headline}
              </h2>
              <p
                style={{
                  margin: 0,
                  flex: 1,
                  fontSize: 13.5,
                  color: "#777",
                  lineHeight: 1.8,
                  fontFamily: FB,
                }}
              >
                {cs.impact.body}
              </p>
            </div>
          </motion.div>

          {/* Metrics */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 16,
            }}
          >
            {cs.impact.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.1,
                }}
                style={{
                  flex: 1,
                  padding: isMobile ? "28px 24px" : "36px 32px",
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid #eee",
                }}
              >
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: isMobile ? 44 : 56,
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: "#0d0d0d",
                    fontFamily: FH,
                  }}
                >
                  {m.value}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "#888",
                    fontFamily: FB,
                    lineHeight: 1.5,
                  }}
                >
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 IMPACT (B): VISUAL SHOWCASE ────────────────────────────────── */}
      <section
        style={{
          background: "#F7F7F5",
          padding: isMobile ? "48px 24px 72px" : "40px 60px",
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          display: isMobile ? "block" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          scrollSnapAlign: isMobile ? "none" : "start",
          scrollMarginTop: 64,
          borderTop: isMobile ? "none" : "1px solid #f0f0f0",
        }}
      >
        <div style={{ width: "100%" }}>
          {(() => {
            const imgs = (cs.impact.images || []).filter(Boolean);
            const fallback = imgs.length === 0 ? [cs.designImage] : imgs;
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {fallback.map((img, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp(0.15 + i * 0.08)}
                    onClick={() => handleImageClick(img, `Impact visual ${i + 1}`)}
                    style={{
                      width: "100%",
                      height: isMobile ? 260 : "clamp(350px, 58vh, 520px)",
                      borderRadius: 16,
                      overflow: "hidden",
                      border: "1px solid #e8e8e8",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                      background: "#f5f5f5",
                      flexShrink: 0,
                      cursor: "zoom-in",
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="hover:scale-[1.015] active:scale-[0.99] hover:brightness-[1.02]"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`Impact visual ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── 05 OUTCOME ────────────────────────────────────────────────────── */}
      {/* ── 05 OUTCOME (A): SUMMARY ───────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: isMobile ? "72px 24px" : "40px 60px",
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          display: isMobile ? "block" : "flex",
          alignItems: "center",
          boxSizing: "border-box",
          scrollSnapAlign: isMobile ? "none" : "start",
          scrollMarginTop: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 36 : 80,
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ flex: "0 0 46%" }}>
            <motion.div {...fadeUp()}>
              <SectionLabel number="05" title="Outcome" />
              <h2
                style={{
                  margin: "0 0 24px",
                  fontSize: isMobile
                    ? "clamp(28px, 8vw, 40px)"
                    : "clamp(30px, 3.5vw, 46px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#0d0d0d",
                  fontFamily: FH,
                }}
              >
                {cs.outcome.headline}
              </h2>
              <p
                style={{
                  margin: "0 0 36px",
                  fontSize: 14,
                  color: "#777",
                  lineHeight: 1.8,
                  fontFamily: FB,
                }}
              >
                {cs.outcome.body}
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.12)}
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  background: LIME,
                  color: "#0d0d0d",
                  border: "none",
                  borderRadius: 100,
                  padding: "13px 28px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: FH,
                  letterSpacing: "0.1em",
                }}
              >
                LET'S WORK TOGETHER
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </button>
              <button
                onClick={onClose}
                style={{
                  background: "transparent",
                  color: "#555",
                  border: "1.5px solid #ddd",
                  borderRadius: 100,
                  padding: "13px 28px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: FH,
                }}
              >
                <ArrowLeft size={13} strokeWidth={2} />
                Back to Work
              </button>
            </motion.div>
          </div>

          {/* Right: quick stat summary */}
          {!isMobile && (
            <motion.div {...fadeLeft(0.15)} style={{ flex: 1 }}>
              <div
                style={{
                  background: "#f9f9f7",
                  borderRadius: 16,
                  padding: "32px 36px",
                  border: "1px solid #efefed",
                }}
              >
                <p
                  style={{
                    margin: "0 0 20px",
                    fontSize: 9.5,
                    letterSpacing: "0.15em",
                    color: "#bbb",
                    fontFamily: FB,
                    textTransform: "uppercase",
                  }}
                >
                  Project Summary
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {[
                    { label: "Role", value: cs.role },
                    { label: "Duration", value: cs.duration },
                    { label: "Team", value: cs.team },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #efefed",
                        paddingBottom: 14,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "#aaa",
                          fontFamily: FB,
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "#0d0d0d",
                          fontFamily: FH,
                          fontWeight: 600,
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      paddingTop: 4,
                    }}
                  >
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          color: "#777",
                          background: "#ebebeb",
                          padding: "4px 10px",
                          borderRadius: 100,
                          fontFamily: FB,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── 05 OUTCOME (B): VISUAL SCREENS ────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          padding: isMobile ? "48px 24px 72px" : "40px 60px",
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          display: isMobile ? "block" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          scrollSnapAlign: isMobile ? "none" : "start",
          scrollMarginTop: 64,
          borderTop: isMobile ? "none" : "1px solid #f0f0f0",
        }}
      >
        <div style={{ width: "100%" }}>
          {(() => {
            const imgs = (cs.outcome.images || []).filter(Boolean);
            if (imgs.length === 0) return null;

            const gridImgs = imgs.slice(0, 3);
            const extraImgs = imgs.slice(3);

            const img1 = gridImgs[0] || cs.contextImage;
            const img2 = gridImgs[1] || cs.designImage;
            const img3 = gridImgs[2] || cs.designImage;

            return (
              <>
                {/* Original editorial grid — big left + 2 stacked right */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
                    gridTemplateRows: isMobile ? "auto" : "1fr 1fr",
                    gap: 16,
                    height: isMobile ? "auto" : "clamp(380px, 60vh, 560px)",
                    marginBottom: extraImgs.length > 0 ? 24 : 0,
                  }}
                >
                  {/* Large image — spans 2 rows on desktop */}
                  <motion.div
                    {...fadeUp()}
                    onClick={() => handleImageClick(img1, "Final screens")}
                    style={{
                      gridRow: isMobile ? "auto" : "span 2",
                      height: "100%",
                      borderRadius: 14,
                      overflow: "hidden",
                      border: "1px solid #e8e8e8",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                      background: "#f5f5f5",
                      cursor: "zoom-in",
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="hover:scale-[1.015] active:scale-[0.99] hover:brightness-[1.02]"
                  >
                    <ImageWithFallback
                      src={img1}
                      alt="Final screens"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", minHeight: isMobile ? 280 : "100%" }}
                    />
                  </motion.div>

                  {/* Top-right image */}
                  <motion.div
                    {...fadeUp(0.1)}
                    onClick={() => handleImageClick(img2, "Design detail")}
                    style={{
                      borderRadius: 14,
                      overflow: "hidden",
                      border: "1px solid #e8e8e8",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      background: "#f5f5f5",
                      cursor: "zoom-in",
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      height: "100%",
                    }}
                    className="hover:scale-[1.02] active:scale-[0.98] hover:brightness-[1.02]"
                  >
                    <ImageWithFallback
                      src={img2}
                      alt="Design detail"
                      style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top center", height: "100%", minHeight: isMobile ? 200 : "100%" }}
                    />
                  </motion.div>

                  {/* Bottom-right image */}
                  <motion.div
                    {...fadeUp(0.18)}
                    onClick={() => handleImageClick(img3, "Design detail")}
                    style={{
                      borderRadius: 14,
                      overflow: "hidden",
                      border: "1px solid #e8e8e8",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      background: "#f5f5f5",
                      cursor: "zoom-in",
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      height: "100%",
                    }}
                    className="hover:scale-[1.02] active:scale-[0.98] hover:brightness-[1.02]"
                  >
                    <ImageWithFallback
                      src={img3}
                      alt="Design detail"
                      style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top center", height: "100%", minHeight: isMobile ? 200 : "100%" }}
                    />
                  </motion.div>
                </div>

                {/* Extra images (4th, 5th, 6th…) — full-width stacked */}
                {extraImgs.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 24 }}>
                    {extraImgs.map((img, i) => (
                      <motion.div
                        key={i}
                        {...fadeUp(0.1 + i * 0.08)}
                        onClick={() => handleImageClick(img, `Outcome extra ${i + 4}`)}
                        style={{
                          width: "100%",
                          height: isMobile ? 260 : "clamp(300px, 45vh, 460px)",
                          borderRadius: 16,
                          overflow: "hidden",
                          border: "1px solid #e8e8e8",
                          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                          background: "#f5f5f5",
                          flexShrink: 0,
                          cursor: "zoom-in",
                          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                        className="hover:scale-[1.015] active:scale-[0.99] hover:brightness-[1.02]"
                      >
                        <ImageWithFallback
                          src={img}
                          alt={`Outcome extra ${i + 4}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>

      {/* ── NEXT PROJECT & FOOTER COMBINED SNAP POINT ─────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          boxSizing: "border-box",
          scrollSnapAlign: isMobile ? "none" : "start",
          scrollMarginTop: 64,
          background: "#0d0d0d",
        }}
      >
        {nextProject ? (
          <section
            style={{
              background: "#0d0d0d",
              borderTop: `3px solid ${LIME}`,
              padding: isMobile ? "60px 24px" : "80px 60px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: 32,
              flex: 1,
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 9.5,
                  letterSpacing: "0.18em",
                  color: "#555",
                  textTransform: "uppercase",
                  fontFamily: FB,
                }}
              >
                Next Project
              </p>
              <h3
                style={{
                  margin: 0,
                  fontSize: isMobile
                    ? "clamp(40px, 12vw, 60px)"
                    : "clamp(52px, 6vw, 76px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  fontFamily: FH,
                }}
              >
                {nextProject.name}
              </h3>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 13,
                  color: "#555",
                  fontFamily: FB,
                }}
              >
                {nextProject.description.substring(0, 72)}…
              </p>
            </div>
            <button
              onClick={() => onNavigate(nextProject.id)}
              style={{
                flexShrink: 0,
                background: LIME,
                color: "#0d0d0d",
                border: "none",
                borderRadius: 100,
                padding: "14px 28px",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 700,
                fontFamily: FH,
                letterSpacing: "0.1em",
              }}
            >
              VIEW CASE STUDY
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </section>
        ) : (
          <div style={{ flex: 1 }} />
        )}

        <Footer noBridge />
      </div>

      {/* Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        closedby="any"
        onClose={() => setPreviewSrc(null)}
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          maxWidth: "100vw",
          maxHeight: "100vh",
          outline: "none",
          overflow: "visible",
        }}
      >
        {previewSrc && (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100vw",
              height: "100vh",
              padding: isMobile ? 16 : 40,
              boxSizing: "border-box",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => dialogRef.current?.close()}
              style={{
                position: "absolute",
                top: isMobile ? 16 : 30,
                right: isMobile ? 16 : 30,
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",
                width: 46,
                height: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                zIndex: 10,
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="hover:bg-white/20 hover:scale-105 active:scale-95 hover:border-white/30"
              aria-label="Close image preview"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Preview Image */}
            <img
              src={typeof previewSrc === "string" ? previewSrc : previewSrc.src}
              alt={previewAlt}
              onClick={() => dialogRef.current?.close()}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: isMobile ? 8 : 16,
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.95)",
              }}
              className="lightbox-img-anim"
            />
          </div>
        )}
      </dialog>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            dialog[open], dialog[open] * {
              cursor: zoom-out !important;
            }
            dialog[open] button, dialog[open] button * {
              cursor: pointer !important;
            }
            dialog::backdrop {
              background-color: rgba(10, 10, 10, 0.92) !important;
              backdrop-filter: blur(12px) !important;
              opacity: 0;
              transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            dialog[open]::backdrop {
              opacity: 1;
            }
            .lightbox-img-anim {
              animation: lightbox-zoom 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes lightbox-zoom {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `,
        }}
      />
    </div>
  );
}