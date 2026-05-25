export interface Metric { value: string; label: string }

export interface ProjectData {
  id: number
  name: string
  description: string
  tags: string[]
  year: string
  bg: string
  category: string
  image: string
  cats: string[]
  caseStudy: {
    tagline: string
    duration: string
    role: string
    team: string
    contextImage: string
    designImage: string
    context: { headline: string; body: string[]; image?: string }
    designApproach: { headline: string; body: string[]; images: string[] }
    myRole: { headline: string; bullets: string[] }
    impact: { headline: string; body: string; metrics: Metric[]; image?: string }
    outcome: { headline: string; body: string; images: string[] }
  }
}

export const PROJECTS: ProjectData[] = [
  {
    id: 1,
    name: 'Moove',
    description: 'Mobility app redesign that boosted ride completion rates by 23% through simplified UX flows.',
    tags: ['MOBILE', 'UX'],
    year: '2026',
    bg: '#6B35B0',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1620207284057-e6c6b3d1b4c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Application', 'Mobile'],
    caseStudy: {
      tagline: 'Simplifying a ride-hailing flow to eliminate friction and drive 23% more completed rides.',
      duration: '8 Weeks',
      role: 'Lead UX Designer',
      team: 'Product, Engineering',
      contextImage: 'https://images.unsplash.com/photo-1620207284057-e6c6b3d1b4c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      designImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      context: {
        headline: "A ride-hailing app losing users at the worst possible moment",
        body: [
          "Moove's app had strong market penetration but suffered from high drop-off rates mid-booking. Users were abandoning at pricing, pickup accuracy, and ETA screens — creating friction that cost both users and drivers.",
          "The challenge wasn't a feature gap. It was a clarity problem. Users didn't trust what they were seeing. Every added screen felt like a barrier. The product needed a UX overhaul that restored confidence without stripping functionality."
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      designApproach: {
        headline: "Stripping back complexity to reveal the essential path",
        body: [
          "I mapped every decision point in the existing booking flow, identifying where users hesitated or dropped off. The audit revealed 11 screens where users had to reconcile conflicting information — a clear sign of accumulated design debt.",
          "The redesign focused on progressive disclosure: show users only what they need at each moment. Pricing confidence was solved with upfront fare locks. Pickup accuracy was addressed with a live map and one-tap confirmation. Every screen was rebuilt around a single, clear action."
        ],
        images: ["https://images.unsplash.com/photo-1581291518655-9523c932dedf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"]
      },
      myRole: {
        headline: "End-to-end design from discovery through delivery",
        bullets: [
          "Led 12 user interviews to identify friction points and core trust barriers",
          "Mapped the complete journey from app open to post-ride rating across all edge cases",
          "Designed and A/B tested 3 iterations of the core booking flow with real users",
          "Built a 48-component library for consistent UI across 28 screens",
          "Collaborated directly with engineering for pixel-precise implementation handoff",
          "Presented weekly design reviews with product and stakeholders"
        ]
      },
      impact: {
        headline: "Real, measurable results from better design decisions",
        body: "The redesigned flow launched to 40,000+ active users. Within 6 weeks, all key metrics improved significantly — validating the hypothesis that clarity, not features, was the primary driver of completion rates.",
        metrics: [
          { value: '23%', label: 'Increase in ride completions' },
          { value: '18%', label: 'Drop in support tickets' },
          { value: '4.7★', label: 'App Store rating' }
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      outcome: {
        headline: "A scalable foundation, not just a screen refresh",
        body: "The Moove redesign became the design benchmark for all future features. The component library and flow architecture were adopted for three subsequent launches. The project proved that systematic UX thinking — not visual polish — is what moves product metrics.",
        images: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1581291518655-9523c932dedf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000"
        ]
      }
    }
  },
  {
    id: 2,
    name: 'Metrix',
    description: 'Replaced a dense configuration form with a step-by-step wizard. Setup became 35% faster.',
    tags: ['WEB', 'SAAS'],
    year: '2026',
    bg: '#C75028',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1669101602104-bfa264a17cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Website', 'Application'],
    caseStudy: {
      tagline: 'Transforming a complex SaaS configuration into a guided workflow that cut setup time by 35%.',
      duration: '6 Weeks',
      role: 'Product Designer',
      team: 'Product, Engineering, CS',
      contextImage: 'https://images.unsplash.com/photo-1669101602104-bfa264a17cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      designImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      context: {
        headline: "A setup experience driving away new customers",
        body: [
          "Metrix's onboarding flow required new users to configure over 40 settings across a single dense form before they could use the product. Customer success reported that 1 in 3 trials abandoned during setup.",
          "The product was powerful, but the entry point was hostile. New users couldn't see the value because they couldn't get through the door. The product needed a configuration experience that respected users' time and context."
        ],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      designApproach: {
        headline: "Turning a wall of settings into a guided conversation",
        body: [
          "I restructured the configuration into a 5-step wizard that asked only the minimum viable questions at each stage. Each step had a single purpose, clear progress, and explained the 'why' behind each setting — turning an interrogation into guidance.",
          "Secondary and advanced settings were deferred to after the initial setup, letting users get to 'first value' faster. The design prioritized immediate product activation over comprehensive configuration."
        ],
        images: ["https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"]
      },
      myRole: {
        headline: "UX research, information architecture, and interaction design",
        bullets: [
          "Conducted sessions with 8 churned trial users to understand setup pain points",
          "Audited the existing form and categorised all 40+ settings by priority and frequency",
          "Designed the 5-step wizard information architecture from scratch",
          "Created interactive prototypes for usability testing with 6 new trial participants",
          "Worked closely with engineering on form validation logic and step transition patterns",
          "Documented design decisions and edge cases in a comprehensive spec"
        ]
      },
      impact: {
        headline: "Faster setup, higher confidence, better retention",
        body: "Within 8 weeks of launching the redesigned onboarding, setup abandonment dropped dramatically and trial-to-paid conversion improved. Users who completed the new wizard were significantly more likely to activate core features within their first session.",
        metrics: [
          { value: '35%', label: 'Faster average setup time' },
          { value: '100%', label: 'Preferred new wizard in tests' },
          { value: '2.4×', label: 'Increase in trial activation' }
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      outcome: {
        headline: "A template for every complex workflow in the product",
        body: "The wizard framework I built for Metrix's onboarding became the default pattern for all subsequent complex flows. The engineering team implemented it as a reusable component. It's now the standard for any multi-step configuration in the product.",
        images: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000"
        ]
      }
    }
  },
  {
    id: 3,
    name: 'Vox Swap',
    description: 'Designed transaction states and system health dashboards for a DeFi exchange.',
    tags: ['WEB', 'DEFI', 'WEB3'],
    year: '2025',
    bg: '#2B3EB5',
    category: 'Website',
    image: 'https://images.unsplash.com/photo-1639825988283-39e5408b75e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Website', 'Web3'],
    caseStudy: {
      tagline: 'Designing clarity and trust into a DeFi exchange — where one confusing state can cost users money.',
      duration: '10 Weeks',
      role: 'UX/UI Designer',
      team: 'Product, Smart Contract Eng',
      contextImage: 'https://images.unsplash.com/photo-1639825988283-39e5408b75e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      designImage: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      context: {
        headline: "High stakes interfaces where confusion is expensive",
        body: [
          "Vox Swap was a fast-growing DeFi exchange where users executed token swaps with real money. The existing interface provided minimal feedback during transactions — users couldn't tell if a swap was processing, failed, or stuck in a pending state.",
          "In crypto, ambiguity at the transaction layer erodes trust fast. Users were posting in support channels, abandoning swaps mid-flow, and in some cases, re-submitting transactions — costing themselves gas fees. The interface needed to be as reliable as the protocol underneath it."
        ],
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      designApproach: {
        headline: "Designing every state before touching the happy path",
        body: [
          "I started by mapping all possible transaction states: pending, confirming, success, failed, timed out, insufficient gas, and edge cases like network congestion. Each state got a dedicated design with clear explanations, user guidance, and recovery paths.",
          "The system health dashboard was designed for power users who needed protocol-level visibility — liquidity pool depth, slippage, fee estimates — all surfaced contextually without cluttering the primary swap interface."
        ],
        images: ["https://images.unsplash.com/photo-1642790106117-e829e14a795f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"]
      },
      myRole: {
        headline: "Transaction UX design and dashboard architecture",
        bullets: [
          "Mapped 14 distinct transaction states and designed feedback for each",
          "Created the system health dashboard from initial concept to final spec",
          "Collaborated with smart contract engineers to understand protocol-layer constraints",
          "Designed a consistent notification and alert system across all transaction types",
          "Ran a design audit of 6 competing DeFi products to identify pattern conventions",
          "Delivered annotated specs covering animations, transitions, and edge-case handling"
        ]
      },
      impact: {
        headline: "Trust restored through transparency and feedback clarity",
        body: "After launch, support tickets related to transaction confusion dropped significantly. Users reported higher confidence in executing large swaps, and the dashboard became one of the most-referenced features in community feedback.",
        metrics: [
          { value: '40%', label: 'Drop in transaction-related support tickets' },
          { value: '2.3×', label: 'Task completion speed improvement' },
          { value: '4.6★', label: 'Product satisfaction score' }
        ],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      outcome: {
        headline: "A design system built for financial trust",
        body: "The state management patterns and component system built for Vox Swap were adopted across the broader product. The project established that DeFi UX isn't just about aesthetics — it's about designing systems that users trust with real value.",
        images: [
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1621761191319-c6fb62004040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1642790106117-e829e14a795f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000"
        ]
      }
    }
  },
  {
    id: 4,
    name: 'Pago',
    description: 'Personal finance tracker with AI-powered insights and automated budget recommendations.',
    tags: ['MOBILE', 'FINTECH'],
    year: '2025',
    bg: '#1A2B50',
    category: 'App',
    image: 'https://images.unsplash.com/photo-1642142784847-83b9b8a22910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Application', 'Mobile'],
    caseStudy: {
      tagline: 'Making personal finance approachable — an AI-driven tracker that people actually open every day.',
      duration: '12 Weeks',
      role: 'Product Designer',
      team: 'Product, iOS/Android Eng, Data',
      contextImage: 'https://images.unsplash.com/photo-1642142784847-83b9b8a22910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      designImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      context: {
        headline: "Finance apps people open once and abandon",
        body: [
          "Most personal finance apps fail the same way: they're built for accountants, not humans. Pago's predecessor had strong categorisation features but a weekly active user rate below 22%. Users set up the app, checked it once, and never returned.",
          "The challenge was designing an experience that felt like a trusted advisor, not a spreadsheet. The AI engine was powerful — but the interface was burying its value behind dense charts and data tables. The design needed to lead with insight, not information."
        ],
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      designApproach: {
        headline: "Designing for the emotional reality of money",
        body: [
          "I led a series of diary studies tracking how users thought and felt about their finances day-to-day. The research revealed that users didn't want more data — they wanted reassurance, gentle nudges, and clear next steps. The design philosophy shifted from 'show everything' to 'show what matters now'.",
          "The AI insights were redesigned as conversational cards — short, specific, actionable. Instead of overwhelming dashboards, users saw a single most-important insight each day, with the option to explore deeper. The budget recommendation flow was rebuilt around natural language, not form fields."
        ],
        images: ["https://images.unsplash.com/photo-1563013544-824ae1d704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"]
      },
      myRole: {
        headline: "Full product design from research to launch",
        bullets: [
          "Led 2-week diary study with 14 participants tracking real financial behaviour and emotions",
          "Designed new information architecture reducing primary navigation to 3 core areas",
          "Created the AI insight card system — the design pattern now used across all AI features",
          "Designed the conversational budget setup flow replacing the previous form-based approach",
          "Built full design system for iOS and Android with 60+ components",
          "Collaborated with data team to define how AI recommendations surface and are presented"
        ]
      },
      impact: {
        headline: "From open-once to open-daily",
        body: "Within 3 months of launch, Pago's retention metrics transformed. The redesigned insight system drove the most significant daily active user increase in the product's history. User interviews post-launch described the app as 'the first finance app that actually helps me'.",
        metrics: [
          { value: '62%', label: 'Increase in daily active users' },
          { value: '89%', label: '30-day user retention rate' },
          { value: '4.8★', label: 'App Store rating' }
        ],
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      outcome: {
        headline: "A new standard for how the product communicates value",
        body: "The insight card pattern and conversational setup flow became the design foundation for Pago's entire product roadmap. The project demonstrated that in fintech, emotional design — making users feel in control and informed — directly drives the metrics that matter.",
        images: [
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1563013544-824ae1d704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000"
        ]
      }
    }
  },
  {
    id: 5,
    name: 'Nomo Studio',
    description: 'End-to-end design system and brand identity for a fast-growing B2B SaaS company.',
    tags: ['WEB', 'BRANDING'],
    year: '2024',
    bg: '#1E3D30',
    category: 'Website',
    image: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Website', 'Branding'],
    caseStudy: {
      tagline: 'Building a scalable design system and brand identity that unified a growing product team.',
      duration: '14 Weeks',
      role: 'Design Systems Lead',
      team: 'Marketing, Engineering, Leadership',
      contextImage: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      designImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
      context: {
        headline: "A product at scale without a design language to match",
        body: [
          "Nomo Studio had grown from a 3-person startup to a 60-person B2B SaaS company in 18 months. Along the way, the product accumulated 4 separate visual styles, 3 component libraries, and no shared design language. Every team was building from scratch.",
          "The inconsistency wasn't just a design problem — it was slowing engineering down and making the product feel fragmented to customers. Nomo needed a unified design system and a brand identity that could scale with the company."
        ],
        image: "https://images.unsplash.com/photo-1541462608141-2ff01dd914e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      designApproach: {
        headline: "System before style — architecture before aesthetics",
        body: [
          "I started with a full audit of the existing product — cataloguing every component, pattern, and visual inconsistency across the 4 divergent codebases. The audit identified 340 unique UI elements, of which only 80 were truly distinct. The rest were duplicates and variations that could be unified.",
          "The design system was built token-first: colour, spacing, typography, and motion were defined as semantic tokens before any component was designed. This ensured the system could adapt to future brand evolution without requiring a full rebuild."
        ],
        images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"]
      },
      myRole: {
        headline: "Design systems architecture and brand identity",
        bullets: [
          "Conducted full product audit identifying 340 UI elements across 4 divergent codebases",
          "Defined complete token architecture: colour, spacing, typography, motion, elevation",
          "Designed 120-component library with full documentation and usage guidelines",
          "Led brand identity project: logo, typography system, colour palette, motion language",
          "Created the design system governance model — how components get added, updated, and deprecated",
          "Trained 8 product designers and 12 engineers on system adoption and contribution"
        ]
      },
      impact: {
        headline: "One system, faster teams, consistent product",
        body: "Within 3 months of the design system launch, feature delivery velocity improved significantly. Designers reported spending 60% less time on component decisions. Engineering handoff went from an average of 4 revision rounds to 1.2.",
        metrics: [
          { value: '80%', label: 'Reduction in UI inconsistencies' },
          { value: '3 mo', label: 'Full system shipped from zero' },
          { value: '100%', label: 'Designer & engineer adoption' }
        ],
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
      },
      outcome: {
        headline: "A system that scales with the company",
        body: "The Nomo design system is now the single source of truth for 8 product teams. The brand identity was adopted across marketing, product, and sales materials within 6 weeks of launch. The project proved that investing in foundations — not features — is the highest-leverage design work a growing team can do.",
        images: [
          "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1541462608141-2ff01dd914e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000",
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000"
        ]
      }
    }
  }
]
