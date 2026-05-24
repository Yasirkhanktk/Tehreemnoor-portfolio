import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
import { useIsMobile } from "../utils/useIsMobile";
import logoImg from "../../imports/Logo-1.png";
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
    ease: [0.22, 1, 0.36, 1],
    delay,
  },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.78,
    ease: [0.22, 1, 0.36, 1],
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
}: {
  src: string;
  alt: string;
  bg: string;
}) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 14,
        padding: "28px 24px 0",
        overflow: "hidden",
      }}
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

  // Scroll to top on mount or project change
  useEffect(() => {
    const scroller = document.getElementById("main-scroll");
    if (scroller) {
      // Use smooth or auto, but instant can sometimes be ignored
      scroller.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [project.id]);

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
            src={logoImg}
            alt="logo"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
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
          minHeight: isMobile ? "auto" : "100vh",
          background: "#fafafa",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent color wash — top-right blob */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-12%",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.bg}28 0%, transparent 62%)`,
            pointerEvents: "none",
          }}
        />
        {/* Second soft blob bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-8%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.bg}14 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        {/* Dot grid watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.35,
            backgroundImage:
              "radial-gradient(circle, #d0d0d0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top accent strip */}
        <div
          style={{
            height: 4,
            background: project.bg,
            flexShrink: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "stretch",
            padding: isMobile
              ? "52px 24px 60px"
              : "72px 60px 80px",
            gap: isMobile ? 52 : 64,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left: text */}
          <div
            style={{
              flex: isMobile ? "none" : "0 0 48%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
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
                  color:
                    project.bg === "#C5F135"
                      ? "#526500"
                      : "#fff",
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
                  color: "#bbb",
                  fontFamily: FB,
                }}
              >
                {project.year}
              </span>
              <span
                style={{
                  width: 20,
                  height: 1,
                  background: "#ddd",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: "#ccc",
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
                  ? "clamp(54px, 14vw, 74px)"
                  : "clamp(68px, 7.8vw, 108px)",
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: "-0.045em",
                color: "#0d0d0d",
                fontFamily: FH,
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
                    color: "#888",
                    fontFamily: FB,
                    letterSpacing: "0.1em",
                    background: "#efefed",
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
                color: "#666",
                lineHeight: 1.75,
                fontFamily: FB,
                maxWidth: 430,
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
                background: "#e8e8e8",
                marginBottom: 32,
              }}
            />

            {/* Meta grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px 32px",
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
                      margin: "0 0 3px",
                      fontSize: 9,
                      color: "#bbb",
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
                      color: "#0d0d0d",
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

          {/* Right: stacked floating mockups */}
          {!isMobile && (
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Back card — slightly rotated */}
              <motion.div
                initial={{ opacity: 0, rotate: -4, y: 30 }}
                animate={{ opacity: 1, rotate: -3, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.28,
                }}
                style={{
                  position: "absolute",
                  width: "90%",
                  top: "6%",
                  background: `${project.bg}22`,
                  border: `1px solid ${project.bg}44`,
                  borderRadius: 16,
                  padding: "18px 16px 0",
                  overflow: "hidden",
                  boxShadow: `0 24px 60px rgba(0,0,0,0.08)`,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "6px 6px 0 0",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {["#ff605c", "#ffbd44", "#00ca4e"].map(
                    (c) => (
                      <div
                        key={c}
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: c,
                        }}
                      />
                    ),
                  )}
                  <div
                    style={{
                      flex: 1,
                      background: "#f5f5f5",
                      borderRadius: 3,
                      height: 14,
                      marginLeft: 6,
                    }}
                  />
                </div>
                <ImageWithFallback
                  src={cs.designImage}
                  alt="preview"
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                    maxHeight: 300,
                    opacity: 0.7,
                  }}
                />
              </motion.div>

              {/* Front card — main mockup */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.38,
                }}
                style={{
                  position: "relative",
                  width: "86%",
                  marginTop: 40,
                  background: "#fff",
                  borderRadius: 16,
                  padding: "18px 16px 0",
                  overflow: "hidden",
                  boxShadow: `0 32px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)`,
                }}
              >
                <div
                  style={{
                    background: "#f8f8f8",
                    borderRadius: "6px 6px 0 0",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    borderBottom: "1px solid #efefef",
                  }}
                >
                  {["#ff605c", "#ffbd44", "#00ca4e"].map(
                    (c) => (
                      <div
                        key={c}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: c,
                        }}
                      />
                    ),
                  )}
                  <div
                    style={{
                      flex: 1,
                      background: "#ebebeb",
                      borderRadius: 4,
                      height: 15,
                      marginLeft: 7,
                    }}
                  />
                </div>
                <ImageWithFallback
                  src={cs.contextImage}
                  alt={project.name}
                  style={{
                    width: "100%",
                    display: "block",
                    objectFit: "cover",
                    maxHeight: 380,
                  }}
                />
              </motion.div>
            </div>
          )}
        </div>

        {/* Mobile hero image */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{
              padding: "0 24px 60px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <BrowserMockup
              src={cs.contextImage}
              alt={project.name}
              bg={`${project.bg}18`}
            />
          </motion.div>
        )}
      </section>

      {/* ── 01 CONTEXT ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          padding: isMobile ? "72px 24px" : "96px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 48 : 72,
            alignItems: "flex-start",
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
              src={cs.contextImage}
              alt="Context visual"
              bg={`${project.bg}22`}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 02 DESIGN APPROACH ────────────────────────────────────────────── */}
      <section
        style={{
          background: "#F7F7F5",
          borderTop: "1px solid #eee",
          padding: isMobile ? "72px 24px" : "96px 60px",
        }}
      >
        <motion.div {...fadeUp()}>
          <SectionLabel number="02" title="Design Approach" />
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              gap: isMobile ? 16 : 60,
              marginBottom: 52,
            }}
          >
            <h2
              style={{
                margin: 0,
                flex: "0 0 44%",
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
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                justifyContent: "center",
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
        </motion.div>

        {/* Full-width image */}
        <motion.div {...fadeUp(0.2)}>
          <BrowserMockup
            src={cs.designImage}
            alt="Design approach"
            bg={`${project.bg}18`}
          />
        </motion.div>
      </section>

      {/* ── 03 MY ROLE ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: isMobile ? "72px 24px" : "96px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 36 : 80,
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
      <section
        style={{
          background: "#F7F7F5",
          borderTop: "1px solid #eee",
          padding: isMobile ? "72px 24px" : "96px 60px",
        }}
      >
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
            marginBottom: 52,
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

        {/* Design image */}
        <motion.div {...fadeUp(0.15)}>
          <BrowserMockup
            src={cs.designImage}
            alt="Impact visual"
            bg={`${project.bg}18`}
          />
        </motion.div>
      </section>

      {/* ── 05 OUTCOME ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: isMobile ? "72px 24px" : "96px 60px",
        }}
      >
        {/* Text + CTAs */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 36 : 80,
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? 52 : 72,
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

        {/* Image grid — 3 images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr",
            gridTemplateRows: isMobile ? "auto" : "auto auto",
            gap: 16,
          }}
        >
          {/* Large image — spans 2 rows on desktop */}
          <motion.div
            {...fadeUp()}
            style={{ gridRow: isMobile ? "auto" : "span 2" }}
          >
            <BrowserMockup
              src={cs.contextImage}
              alt="Final screens"
              bg={`${project.bg}18`}
            />
          </motion.div>

          {/* Top-right image */}
          <motion.div {...fadeUp(0.1)}>
            <div
              style={{
                background: `${project.bg}14`,
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${project.bg}30`,
              }}
            >
              <ImageWithFallback
                src={cs.designImage}
                alt="Design detail"
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  height: isMobile ? 200 : 220,
                }}
              />
            </div>
          </motion.div>

          {/* Bottom-right — accent card */}
          <motion.div {...fadeUp(0.1)}>
            <div
              style={{
                background: `${project.bg}14`,
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${project.bg}30`,
              }}
            >
              <ImageWithFallback
                src={cs.designImage}
                alt="Design detail"
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  height: isMobile ? 200 : 220,
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NEXT PROJECT ──────────────────────────────────────────────────── */}
      {nextProject && (
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
      )}

      <Footer noBridge />
    </div>
  );
}