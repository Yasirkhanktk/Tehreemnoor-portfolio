import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

type ProjectCategory = 'all' | 'websites' | 'apps' | 'social' | 'branding' | 'research';

interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  tags: string[];
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  timeline?: string;
  client?: string;
  role?: string;
  gallery?: string[];
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all' as ProjectCategory, label: 'All Projects' },
    { id: 'websites' as ProjectCategory, label: 'Websites' },
    { id: 'apps' as ProjectCategory, label: 'Applications' },
    { id: 'social' as ProjectCategory, label: 'Social Media' },
    { id: 'branding' as ProjectCategory, label: 'Branding' },
    { id: 'research' as ProjectCategory, label: 'User Research' },
  ];

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform Redesign',
      category: 'websites',
      description: 'Complete UX overhaul of an online shopping experience',
      image: 'https://images.unsplash.com/photo-1758598303946-385680e4eabd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3NTAzNjYxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['UI Design', 'UX Research', 'Prototyping'],
      fullDescription: 'A comprehensive redesign of a major e-commerce platform serving over 50,000 daily users. The project focused on improving conversion rates, streamlining the checkout process, and creating a more intuitive product discovery experience.',
      challenge: 'The existing platform had a 68% cart abandonment rate and users were struggling to find products efficiently. The checkout process was convoluted with too many steps, leading to significant revenue loss.',
      solution: 'I conducted extensive user research, including interviews with 50+ users and heat map analysis. Based on insights, I simplified the navigation, reduced checkout to 3 steps, and implemented an intelligent product recommendation system.',
      results: [
        'Reduced cart abandonment by 32%',
        'Increased conversion rate by 45%',
        'Improved average session duration by 28%',
        'Boosted mobile sales by 52%',
      ],
      timeline: '4 months',
      client: 'ShopHub Inc.',
      role: 'Lead UI/UX Designer',
      gallery: [
        'https://images.unsplash.com/photo-1750056393300-102f7c4b8bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBtb2NrdXAlMjBzY3JlZW58ZW58MXx8fHwxNzc0OTEwNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3NDk5MTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1550376026-d14d25cf9ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbiUyMHByb3RvdHlwZXxlbnwxfHx8fDE3NzUwMzcxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ],
    },
    {
      id: '2',
      title: 'Fitness Tracking Mobile App',
      category: 'apps',
      description: 'Intuitive fitness app with personalized workout plans',
      image: 'https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBzY3JlZW58ZW58MXx8fHwxNzc0OTI3NTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Mobile Design', 'iOS', 'Android'],
      fullDescription: 'Designed a comprehensive fitness tracking application that makes staying healthy engaging and accessible. The app includes personalized workout plans, nutrition tracking, and social features to keep users motivated.',
      challenge: 'Users found existing fitness apps either too complicated or too simplistic. The challenge was to create an app that serves both beginners and advanced fitness enthusiasts while maintaining simplicity.',
      solution: 'Implemented a smart onboarding that adapts to user fitness levels, created customizable workout plans, and added gamification elements to boost engagement. The design prioritizes clarity and motivation.',
      results: [
        '4.8 star rating on App Store',
        '100,000+ downloads in first 3 months',
        '73% daily active user rate',
        'Featured in "Best Health Apps of 2025"',
      ],
      timeline: '5 months',
      client: 'FitLife Technologies',
      role: 'UI/UX Designer',
      gallery: [
        'https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHAlMjBpbnRlcmZhY2UlMjBkZXRhaWx8ZW58MXx8fHwxNzc1MDM3MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1742440711413-da7afb0f4930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzUwMDkwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ],
    },
    {
      id: '3',
      title: 'Organic Skincare Brand Identity',
      category: 'branding',
      description: 'Full brand identity for eco-friendly beauty products',
      image: 'https://images.unsplash.com/photo-1636247499180-13285c86be9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NzQ5MjcyODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Branding', 'Logo Design', 'Packaging'],
      fullDescription: 'Created a complete brand identity for an organic skincare startup, from logo to packaging design. The brand needed to communicate natural ingredients, sustainability, and luxury simultaneously.',
      challenge: 'Stand out in the saturated skincare market while conveying authenticity and eco-consciousness without appearing low-quality or generic.',
      solution: 'Developed a minimalist yet sophisticated visual language using earthy tones, clean typography, and nature-inspired illustrations. Created sustainable packaging that doubles as display pieces.',
      results: [
        'Brand recognized in 3 major beauty publications',
        'Packaging won sustainability award',
        'Instagram following grew to 50K in 6 months',
        'Sold out initial product line in 2 weeks',
      ],
      timeline: '3 months',
      client: 'Pure Earth Beauty',
      role: 'Brand Designer',
      gallery: [
        'https://images.unsplash.com/photo-1741153794379-e58d307a44fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NzUwMzcxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1629030386603-84ce2892830e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbG9nb3xlbnwxfHx8fDE3NzQ5MTQxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ],
    },
    {
      id: '4',
      title: 'Instagram Campaign Series',
      category: 'social',
      description: 'Cohesive social media designs for product launch',
      image: 'https://images.unsplash.com/photo-1661246627088-d6a600aa9261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNyZWF0aXZlJTIwZGVzaWdufGVufDF8fHx8MTc3NDk3NzkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Social Media', 'Visual Design', 'Marketing'],
      fullDescription: 'Designed a comprehensive social media campaign for a major product launch, including 50+ unique posts, stories, and reels across Instagram and Facebook.',
      challenge: 'Create scroll-stopping content that maintains brand consistency while adapting to different formats and platform requirements.',
      solution: 'Developed a flexible design system with bold colors, dynamic layouts, and user-generated content integration that worked across all formats.',
      results: [
        '2.5M total impressions',
        '185% increase in engagement rate',
        'Reached 500K unique accounts',
        'Generated 15K website clicks',
      ],
      timeline: '2 months',
      client: 'TrendSet Fashion',
      role: 'Social Media Designer',
      gallery: [
        'https://images.unsplash.com/photo-1614516727093-b02bfba325fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBwb3N0JTIwZGVzaWdufGVufDF8fHx8MTc3NTAzNjYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ],
    },
    {
      id: '5',
      title: 'Banking App User Research',
      category: 'research',
      description: 'Comprehensive user research and persona development',
      image: 'https://images.unsplash.com/photo-1576153192286-defd01e1e4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjB3aXJlZnJhbWV8ZW58MXx8fHwxNzc1MDM2NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['User Research', 'Personas', 'User Testing'],
      fullDescription: 'Conducted extensive user research for a banking app redesign, including interviews, surveys, usability testing, and persona development to inform design decisions.',
      challenge: 'Understand diverse user needs across different age groups and tech-savviness levels while addressing security concerns and feature complexity.',
      solution: 'Led 60+ user interviews, analyzed behavioral data from 10,000+ users, and created 5 detailed personas that guided the entire redesign process.',
      results: [
        'Identified 3 critical pain points affecting 80% of users',
        'Created 5 actionable personas adopted company-wide',
        'Research findings led to 40% reduction in support tickets',
        'Informed $2M product development roadmap',
      ],
      timeline: '3 months',
      client: 'SecureBank Digital',
      role: 'UX Researcher',
      gallery: [
        'https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMHJlc2VhcmNoJTIwcGVyc29uYXN8ZW58MXx8fHwxNzc1MDM2NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1761746395515-5ad7e0bac0d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBwcm9jZXNzJTIwc2tldGNofGVufDF8fHx8MTc3NTAzNzExMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ],
    },
    {
      id: '6',
      title: 'SaaS Dashboard Interface',
      category: 'websites',
      description: 'Data-rich analytics dashboard with clean UX',
      image: 'https://images.unsplash.com/photo-1771922748624-b205cf5d002d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc0OTI2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Dashboard', 'Data Viz', 'Web Design'],
      fullDescription: 'Designed an enterprise-level analytics dashboard that transforms complex data into actionable insights through intuitive visualization and clean interface design.',
      challenge: 'Present overwhelming amounts of data in a way that\'s both comprehensive and easy to understand for users with varying levels of data literacy.',
      solution: 'Created a customizable dashboard with progressive disclosure, intelligent data grouping, and contextual help. Designed custom charts optimized for quick comprehension.',
      results: [
        'Reduced time to insights by 65%',
        'User satisfaction score increased to 4.7/5',
        'Decreased training time by 50%',
        'Adopted by 500+ enterprise clients',
      ],
      timeline: '6 months',
      client: 'DataPro Analytics',
      role: 'Lead Designer',
    },
    {
      id: '7',
      title: 'Tech Startup Brand Guide',
      category: 'branding',
      description: 'Modern brand identity and style guide',
      image: 'https://images.unsplash.com/photo-1629030386603-84ce2892830e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbG9nb3xlbnwxfHx8fDE3NzQ5MTQxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Brand Strategy', 'Logo', 'Guidelines'],
      fullDescription: 'Developed a complete brand identity system for a B2B SaaS startup, including logo, color system, typography, and comprehensive brand guidelines.',
      challenge: 'Create a tech-forward brand that feels approachable and trustworthy while standing out in a crowded market.',
      solution: 'Designed a dynamic logo system that adapts to contexts, paired with a bold yet professional color palette and comprehensive guidelines ensuring consistency.',
      results: [
        'Brand recognition increased by 78%',
        'Successfully raised Series A funding',
        'Guidelines adopted across 3 international offices',
        'Positive press coverage in major tech publications',
      ],
      timeline: '4 months',
      client: 'CloudScale Systems',
      role: 'Brand Designer',
    },
    {
      id: '8',
      title: 'UX Research Case Study',
      category: 'research',
      description: 'In-depth analysis of user behavior and patterns',
      image: 'https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMHJlc2VhcmNoJTIwcGVyc29uYXN8ZW58MXx8fHwxNzc1MDM2NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Research', 'Analysis', 'Insights'],
      fullDescription: 'Conducted an in-depth UX research study analyzing user behavior patterns across multiple platforms to identify opportunities for improvement.',
      challenge: 'Uncover hidden user pain points and opportunities in a mature product with established workflows and user base.',
      solution: 'Employed mixed methods including analytics review, heatmaps, session recordings, and qualitative interviews to build comprehensive understanding.',
      results: [
        'Discovered 5 major usability issues',
        'Validated 3 new feature opportunities',
        'Increased user task completion by 35%',
        'Research presented at UX conference',
      ],
      timeline: '2 months',
      client: 'ProductHub',
      role: 'UX Researcher',
    },
    {
      id: '9',
      title: 'E-Commerce Store Design',
      category: 'websites',
      description: 'Modern shopping experience with seamless checkout',
      image: 'https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3NDk5MTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['E-Commerce', 'UI/UX', 'Conversion'],
      fullDescription: 'Designed a modern e-commerce platform focused on creating a frictionless shopping experience with emphasis on product discovery and conversion optimization.',
      challenge: 'Balance rich product information with clean design while optimizing for mobile shopping and fast checkout.',
      solution: 'Implemented smart filtering, one-click checkout, AR try-on features, and personalized recommendations based on browsing behavior.',
      results: [
        'Mobile conversion rate increased by 58%',
        'Average order value up 22%',
        'Checkout completion rate improved to 87%',
        'Customer retention increased by 41%',
      ],
      timeline: '5 months',
      client: 'StyleVault',
      role: 'UI/UX Designer',
    },
    {
      id: '10',
      title: 'Social Media Template Pack',
      category: 'social',
      description: 'Versatile templates for Instagram and Facebook',
      image: 'https://images.unsplash.com/photo-1614516727093-b02bfba325fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBwb3N0JTIwZGVzaWdufGVufDF8fHx8MTc3NTAzNjYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Templates', 'Graphics', 'Social'],
      fullDescription: 'Created a comprehensive template pack with 100+ designs for various industries, allowing businesses to maintain consistent, professional social media presence.',
      challenge: 'Design templates flexible enough for different brands while maintaining visual appeal and on-trend aesthetics.',
      solution: 'Developed a modular system with customizable elements, multiple color schemes, and industry-specific variations.',
      results: [
        '10,000+ downloads in first month',
        '4.9 star average rating',
        'Featured by Canva as "Top Template"',
        'Used by 500+ businesses',
      ],
      timeline: '2 months',
      client: 'Template Market',
      role: 'Graphic Designer',
    },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-wider text-purple-600 mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            Selected <span className="text-purple-600">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A curated collection of projects showcasing my design expertise across various disciplines
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-100">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-purple-50 text-purple-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl text-white mb-4">Ready to Start Your Project?</h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate and bring your vision to life with stunning design that drives results
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Let's Work Together
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}