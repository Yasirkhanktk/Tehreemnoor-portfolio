import { Project, Testimonial, Experience } from './dataStore';

/**
 * SAMPLE DATA FOR SUPABASE MIGRATION
 * 
 * Use these objects as reference when creating your Supabase tables.
 * Each object includes ALL available fields with realistic data.
 */

// ============================================
// PROJECTS - Complete Sample Data
// ============================================

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform Redesign',
    category: 'websites',
    description: 'Complete UX overhaul of an online shopping experience for 50K+ daily users',
    image: 'https://images.unsplash.com/photo-1758598303946-385680e4eabd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3NTAzNjYxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['UI Design', 'UX Research', 'Prototyping', 'User Testing', 'Figma'],
    fullDescription: 'A comprehensive redesign of a major e-commerce platform serving over 50,000 daily users. The project involved extensive user research, competitive analysis, and iterative design processes to create a seamless shopping experience that balances business goals with user needs.',
    challenge: 'The existing platform had a 68% cart abandonment rate and users were struggling to find products efficiently. Customer feedback indicated confusion in the checkout process and poor mobile experience. The design needed to address these issues while maintaining brand consistency.',
    solution: 'I conducted extensive user research, including interviews with 50+ users and heat map analysis to identify pain points. Created a streamlined navigation system, simplified the checkout process to 3 steps, and implemented a responsive design system. Prototyped and tested 5 iterations with real users before final implementation.',
    results: [
      'Reduced cart abandonment by 32%',
      'Increased conversion rate by 45%',
      'Improved mobile user satisfaction from 2.3 to 4.6 stars',
      'Decreased average checkout time from 8 minutes to 3 minutes'
    ],
    timeline: '4 months',
    client: 'ShopHub Inc.',
    role: 'Lead UI/UX Designer',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
    ]
  },
  {
    id: '2',
    title: 'HealthTech Mobile Application',
    category: 'apps',
    description: 'Patient management app connecting healthcare providers with patients',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1080',
    tags: ['Mobile App', 'Healthcare', 'UI/UX', 'Accessibility', 'React Native'],
    fullDescription: 'Designed a comprehensive mobile application that bridges the gap between healthcare providers and patients. The app includes features for appointment scheduling, medical record access, prescription management, and secure messaging with healthcare professionals.',
    challenge: 'Healthcare apps require exceptional security, accessibility, and ease of use for diverse age groups. The challenge was to create an interface that elderly patients could navigate while maintaining modern design standards and HIPAA compliance requirements.',
    solution: 'Implemented a card-based UI with large, clear CTAs and simplified navigation. Conducted usability testing with patients aged 25-75. Integrated voice navigation options and high contrast mode for accessibility. Designed a three-tier information hierarchy to prevent cognitive overload.',
    results: [
      '4.8 star rating on App Store within first month',
      '85% user retention rate after 3 months',
      'Reduced no-show appointments by 40%',
      'Achieved WCAG 2.1 AA accessibility compliance'
    ],
    timeline: '6 months',
    client: 'MediConnect Health',
    role: 'Senior Product Designer',
    gallery: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800'
    ]
  },
  {
    id: '3',
    title: 'Social Media Campaign - EcoLife',
    category: 'social',
    description: 'Environmental awareness campaign across Instagram, Facebook, and TikTok',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1080',
    tags: ['Social Media', 'Brand Design', 'Content Strategy', 'Animation'],
    fullDescription: 'Created a comprehensive social media campaign for an environmental nonprofit aimed at raising awareness about sustainable living. The campaign included custom graphics, animated content, and cohesive visual storytelling across multiple platforms.',
    challenge: 'Environmental content often struggles to engage younger audiences who are fatigued by doom-and-gloom messaging. The challenge was to create visually appealing, shareable content that educates while maintaining an optimistic, action-oriented tone.',
    solution: 'Developed a vibrant color palette and illustration style that feels fresh and approachable. Created templates for 50+ post types, including infographics, quote cards, and animated tips. Designed interactive Instagram stories with polls and swipe-up features to boost engagement.',
    results: [
      'Increased follower count by 245% in 3 months',
      'Average engagement rate of 8.2% (industry average: 1.5%)',
      'Generated 15K website visits from social channels',
      '500+ user-generated content posts with campaign hashtag'
    ],
    timeline: '2 months',
    client: 'EcoLife Foundation',
    role: 'Social Media Designer',
    gallery: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800',
      'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800'
    ]
  },
  {
    id: '4',
    title: 'TechStart Brand Identity',
    category: 'branding',
    description: 'Complete brand identity system for a technology startup',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1080',
    tags: ['Branding', 'Logo Design', 'Style Guide', 'Typography', 'Color Theory'],
    fullDescription: 'Developed a complete brand identity system for a B2B SaaS startup from scratch. The project included logo design, color palette, typography system, brand guidelines, business card design, and marketing collateral templates.',
    challenge: 'The tech industry is saturated with similar blue-and-white corporate branding. The startup wanted to stand out while still appearing professional and trustworthy to enterprise clients. They needed a brand that felt innovative but not gimmicky.',
    solution: 'Created a unique visual identity using an unexpected color combination of deep teal and warm coral. Designed a geometric logo that represents connectivity and growth. Developed a comprehensive 50-page brand guideline document covering all touchpoints from digital to print.',
    results: [
      'Brand recognition increased by 67% in target market',
      'Featured in 3 design publications',
      'Won Bronze in Brand Identity category at Regional Design Awards',
      'Client secured $2M Series A funding partially attributed to strong brand presence'
    ],
    timeline: '3 months',
    client: 'TechStart Solutions',
    role: 'Brand Designer',
    gallery: [
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800',
      'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800'
    ]
  },
  {
    id: '5',
    title: 'Banking App User Research',
    category: 'research',
    description: 'Comprehensive UX research study for mobile banking application',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1080',
    tags: ['User Research', 'Data Analysis', 'Interviews', 'Journey Mapping', 'Personas'],
    fullDescription: 'Led a comprehensive user research initiative to understand customer pain points and opportunities in mobile banking. The study combined qualitative and quantitative research methods to provide actionable insights for product development.',
    challenge: 'The bank was experiencing declining mobile app usage despite heavy investment in new features. They needed to understand why users were choosing competitors and what would bring them back. Research needed to be conducted quickly without disrupting current operations.',
    solution: 'Designed and executed a multi-method research approach: conducted 40 in-depth user interviews, analyzed 6 months of app analytics data, facilitated 4 focus groups, and deployed a survey to 2,000+ customers. Created detailed user personas, journey maps, and a prioritized list of 25 recommendations.',
    results: [
      'Identified 8 critical usability issues causing 60% of app abandonment',
      'Discovered 3 unmet user needs that became new feature opportunities',
      'Research findings led to 12-month product roadmap',
      'Recommendations implemented in Q1 resulted in 28% increase in active users'
    ],
    timeline: '2 months',
    client: 'SecureBank Digital',
    role: 'UX Researcher',
    gallery: [
      'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800'
    ]
  },
  {
    id: '6',
    title: 'Restaurant Booking Platform',
    category: 'websites',
    description: 'Intuitive reservation system for fine dining establishments',
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1080',
    tags: ['Web Design', 'UI/UX', 'Responsive Design', 'Booking System'],
    fullDescription: 'Designed an elegant web platform that allows customers to discover and book reservations at premium restaurants. The system needed to balance beautiful visual presentation with functional booking capabilities.',
    challenge: 'Fine dining customers expect a premium experience from their first interaction. The platform needed to convey luxury and exclusivity while remaining accessible and easy to use. Integration with multiple restaurant management systems added technical complexity.',
    solution: 'Created a visually stunning interface with high-quality imagery and elegant typography. Designed a streamlined 3-click booking flow. Implemented smart filtering options and personalized recommendations. Added features like dietary preference saving and special occasion notes.',
    results: [
      '10,000+ reservations booked in first month',
      'Average booking time: 45 seconds',
      '92% customer satisfaction rating',
      'Partnered with 150+ restaurants within 6 months'
    ],
    timeline: '5 months',
    client: 'DineElite Platform',
    role: 'Lead UI/UX Designer',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
    ]
  },
  {
    id: '7',
    title: 'Fitness Tracking Dashboard',
    category: 'apps',
    description: 'Data visualization dashboard for personal fitness metrics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080',
    tags: ['Dashboard Design', 'Data Viz', 'Mobile First', 'Gamification'],
    fullDescription: 'Designed an engaging fitness tracking dashboard that transforms complex health data into motivating, easy-to-understand visualizations. The application helps users track workouts, nutrition, sleep, and overall wellness.',
    challenge: 'Users were overwhelmed by data and losing motivation to track consistently. The interface needed to present complex metrics in a way that felt encouraging rather than intimidating, especially for fitness beginners.',
    solution: 'Implemented gamification elements with achievement badges and streaks. Designed progressive disclosure patterns to show summary data upfront with drill-down options. Used color psychology and positive language throughout. Created customizable goal-setting with realistic milestones.',
    results: [
      '78% of users log activity daily (industry avg: 23%)',
      'Increased average session time by 156%',
      'Featured as App of the Day on App Store',
      '50,000+ downloads in first 3 months'
    ],
    timeline: '4 months',
    client: 'FitLife Technologies',
    role: 'Product Designer',
    gallery: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800'
    ]
  },
  {
    id: '8',
    title: 'Instagram Content Series - Fashion Brand',
    category: 'social',
    description: 'Cohesive visual content strategy for sustainable fashion brand',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1080',
    tags: ['Instagram', 'Fashion', 'Content Design', 'Photography Direction'],
    fullDescription: 'Developed a comprehensive Instagram content strategy and design system for a sustainable fashion brand targeting Gen Z consumers. Created templates, coordinated photoshoots, and established visual guidelines.',
    challenge: 'The sustainable fashion market is highly competitive on Instagram. The brand needed to stand out while communicating their eco-friendly values without appearing preachy. Content needed to be aspirational yet authentic.',
    solution: 'Created a earthy-meets-modern aesthetic with a focus on natural textures and candid photography. Designed carousel templates for educational content about sustainability. Established a consistent grid layout pattern. Created Reels templates with trending audio integration.',
    results: [
      'Grew from 5K to 45K followers in 4 months',
      'Average engagement rate: 12.4%',
      'Collaboration requests from 20+ influencers',
      '35% increase in website traffic from Instagram'
    ],
    timeline: '3 months',
    client: 'EarthWear Apparel',
    role: 'Social Media Designer',
    gallery: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800'
    ]
  },
  {
    id: '9',
    title: 'FinTech Startup Branding',
    category: 'branding',
    description: 'Modern brand identity for cryptocurrency investment platform',
    image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1080',
    tags: ['Branding', 'Crypto', 'Modern Design', 'Brand Guidelines'],
    fullDescription: 'Created a trustworthy yet innovative brand identity for a cryptocurrency investment platform aimed at first-time crypto investors. The brand needed to demystify crypto while building confidence.',
    challenge: 'Cryptocurrency brands often look too technical and intimidating for mainstream users. The challenge was creating a brand that felt approachable and secure while maintaining credibility in the crypto space.',
    solution: 'Developed a clean, minimalist visual identity using gradients and smooth shapes to represent digital transformation. Created friendly yet professional brand voice guidelines. Designed an icon system that explains complex concepts visually. Built a modular design system for consistency.',
    results: [
      'Brand launch campaign reached 2M impressions',
      'Recognized in "Top 10 FinTech Brands to Watch"',
      '100,000+ app downloads in first 2 months',
      'Brand assets used across 15+ marketing channels seamlessly'
    ],
    timeline: '3 months',
    client: 'CryptoEase',
    role: 'Brand Designer',
    gallery: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
      'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800'
    ]
  },
  {
    id: '10',
    title: 'Education Platform UX Research',
    category: 'research',
    description: 'Student engagement study for online learning platform',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1080',
    tags: ['UX Research', 'EdTech', 'User Testing', 'Heuristic Analysis'],
    fullDescription: 'Conducted extensive UX research to understand why students were disengaging from an online learning platform. Research included competitive analysis, heuristic evaluation, user testing, and stakeholder interviews.',
    challenge: 'Student dropout rates were 45% after the first month. The platform had all the features competitors offered, but something was preventing engagement. Research needed to identify not just what was wrong, but why and how to fix it.',
    solution: 'Conducted mixed-methods research: 30 user interviews, 50 moderated usability tests, survey of 500+ students, and competitive analysis of 8 platforms. Analyzed learning patterns and created student personas. Delivered a comprehensive report with video evidence and prioritized recommendations.',
    results: [
      'Identified 15 critical usability issues',
      'Discovered key motivation factors for different student types',
      'Created 4 detailed student personas used across product team',
      'Recommendations increased course completion rate from 55% to 78%'
    ],
    timeline: '6 weeks',
    client: 'LearnFlow Academy',
    role: 'Lead UX Researcher',
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800'
    ]
  }
];

// ============================================
// TESTIMONIALS - Complete Sample Data
// ============================================

export const sampleTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechFlow Inc.',
    content: 'Tehreem transformed our product with her exceptional design skills. Her attention to detail and user-centered approach resulted in a 40% increase in user engagement. She has an incredible ability to translate complex requirements into intuitive interfaces.',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'StartupHub',
    content: 'Working with Tehreem was a game-changer for our brand. She delivered a complete brand identity that perfectly captured our vision. Her professionalism and creativity exceeded all expectations. The brand guidelines she created are still our north star.',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'EcoLife Foundation',
    content: 'Tehreem created stunning social media content that tripled our engagement rates. Her designs are not only beautiful but strategically crafted to drive results. She truly understands how to connect with audiences.',
    rating: 5
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Head of Design',
    company: 'MediConnect Health',
    content: 'Tehreem brought fresh perspectives to our healthcare app. Her research-driven approach and accessibility focus made our product usable for all age groups. She is thorough, creative, and a joy to collaborate with.',
    rating: 5
  },
  {
    id: '5',
    name: 'Amanda Foster',
    role: 'Founder',
    company: 'DineElite Platform',
    content: 'The website Tehreem designed for us is absolutely stunning. She managed to create a luxurious feel while keeping it user-friendly. Our booking rates increased by 85% after the redesign. Highly recommend!',
    rating: 5
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'VP of Product',
    company: 'SecureBank Digital',
    content: 'Tehreem\'s UX research insights were invaluable. She identified critical issues we had overlooked and provided clear, actionable recommendations. Her work directly influenced our product roadmap and led to significant improvements.',
    rating: 5
  }
];

// ============================================
// EXPERIENCE - Complete Sample Data
// ============================================

export const sampleExperience: Experience[] = [
  {
    id: '1',
    company: 'anemoia.dev',
    role: 'UI/UX & Graphics Designer',
    period: '2023 - Present',
    description: 'Leading design initiatives for innovative digital products, working closely with cross-functional teams to create user-centered solutions.',
    current: true,
    achievements: [
      'Redesigned core product interface, improving user satisfaction by 45%',
      'Established comprehensive design system used across 5+ products',
      'Led UX research initiatives that informed strategic product decisions',
      'Mentored 2 junior designers in UX best practices'
    ]
  },
  {
    id: '2',
    company: 'DesignStudio Pro',
    role: 'Senior UX Designer',
    period: '2021 - 2023',
    description: 'Specialized in creating delightful user experiences for SaaS products, conducting user research, and collaborating with development teams.',
    current: false,
    achievements: [
      'Led design for 3 major product launches',
      'Conducted 50+ user research sessions',
      'Increased client retention by 35% through improved UX',
      'Received "Designer of the Year" award (2022)'
    ]
  },
  {
    id: '3',
    company: 'Creative Agency Co.',
    role: 'Junior UI Designer',
    period: '2019 - 2021',
    description: 'Worked on diverse client projects ranging from websites to mobile apps, developing skills in visual design and user interface creation.',
    current: false,
    achievements: [
      'Designed interfaces for 20+ client projects',
      'Collaborated with marketing teams on brand campaigns',
      'Contributed to agency design system',
      'Rapidly promoted from intern to junior designer'
    ]
  }
];

/**
 * FIELD DESCRIPTIONS FOR SUPABASE
 * 
 * PROJECTS TABLE:
 * - id: string (UUID) - Unique identifier
 * - title: string - Project name
 * - category: enum ('websites', 'apps', 'social', 'branding', 'research')
 * - description: string - Short description (1-2 sentences)
 * - image: string (URL) - Main project image
 * - tags: array of strings - Skills/technologies used
 * - fullDescription: string (optional) - Detailed project description
 * - challenge: string (optional) - Problem statement
 * - solution: string (optional) - How you solved it
 * - results: array of strings (optional) - Key achievements/metrics
 * - timeline: string (optional) - Project duration
 * - client: string (optional) - Client name
 * - role: string (optional) - Your role in the project
 * - gallery: array of strings (optional) - Additional project images
 * 
 * TESTIMONIALS TABLE:
 * - id: string (UUID) - Unique identifier
 * - name: string - Client name
 * - role: string - Client job title
 * - company: string - Client company
 * - content: string - Testimonial text
 * - rating: integer (1-5) - Star rating
 * 
 * EXPERIENCE TABLE:
 * - id: string (UUID) - Unique identifier
 * - company: string - Company name
 * - role: string - Job title
 * - period: string - Time period (e.g., "2023 - Present")
 * - description: string - Job description
 * - achievements: array of strings - Key accomplishments
 * - current: boolean (optional) - Is this the current position?
 */
