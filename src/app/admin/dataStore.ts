// Mock data store - will be replaced with Supabase
export interface Project {
  id: string;
  title: string;
  category: 'websites' | 'apps' | 'social' | 'branding' | 'research';
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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

// Initialize localStorage with default data if not exists
const initializeData = () => {
  if (!localStorage.getItem('portfolio_projects')) {
    const defaultProjects: Project[] = [
      {
        id: '1',
        title: 'E-Commerce Platform Redesign',
        category: 'websites',
        description: 'Complete UX overhaul of an online shopping experience',
        image: 'https://images.unsplash.com/photo-1758598303946-385680e4eabd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3NTAzNjYxMXww&ixlib=rb-4.1.0&q=80&w=1080',
        tags: ['UI Design', 'UX Research', 'Prototyping'],
        fullDescription: 'A comprehensive redesign of a major e-commerce platform serving over 50,000 daily users.',
        challenge: 'The existing platform had a 68% cart abandonment rate and users were struggling to find products efficiently.',
        solution: 'I conducted extensive user research, including interviews with 50+ users and heat map analysis.',
        results: ['Reduced cart abandonment by 32%', 'Increased conversion rate by 45%'],
        timeline: '4 months',
        client: 'ShopHub Inc.',
        role: 'Lead UI/UX Designer',
      },
    ];
    localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
  }

  if (!localStorage.getItem('portfolio_testimonials')) {
    const defaultTestimonials: Testimonial[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'TechFlow Inc.',
        content: 'Tehreem transformed our product with her exceptional design skills. Her attention to detail and user-centered approach resulted in a 40% increase in user engagement.',
        rating: 5,
      },
    ];
    localStorage.setItem('portfolio_testimonials', JSON.stringify(defaultTestimonials));
  }

  if (!localStorage.getItem('portfolio_experience')) {
    const defaultExperience: Experience[] = [
      {
        id: '1',
        company: 'anemoia.dev',
        role: 'UI/UX & Graphics Designer',
        period: '2023 - Present',
        description: 'Leading design initiatives for innovative digital products',
        current: true,
        achievements: [
          'Redesigned core product interface, improving user satisfaction by 45%',
          'Established comprehensive design system used across 5+ products',
        ],
      },
    ];
    localStorage.setItem('portfolio_experience', JSON.stringify(defaultExperience));
  }
};

// Projects
export const getProjects = (): Project[] => {
  initializeData();
  return JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem('portfolio_projects', JSON.stringify(projects));
};

export const addProject = (project: Omit<Project, 'id'>): Project => {
  const projects = getProjects();
  const newProject = { ...project, id: Date.now().toString() };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
};

export const updateProject = (id: string, updates: Partial<Project>) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    saveProjects(projects);
  }
};

export const deleteProject = (id: string) => {
  const projects = getProjects().filter(p => p.id !== id);
  saveProjects(projects);
};

// Testimonials
export const getTestimonials = (): Testimonial[] => {
  initializeData();
  return JSON.parse(localStorage.getItem('portfolio_testimonials') || '[]');
};

export const saveTestimonials = (testimonials: Testimonial[]) => {
  localStorage.setItem('portfolio_testimonials', JSON.stringify(testimonials));
};

export const addTestimonial = (testimonial: Omit<Testimonial, 'id'>): Testimonial => {
  const testimonials = getTestimonials();
  const newTestimonial = { ...testimonial, id: Date.now().toString() };
  testimonials.push(newTestimonial);
  saveTestimonials(testimonials);
  return newTestimonial;
};

export const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index !== -1) {
    testimonials[index] = { ...testimonials[index], ...updates };
    saveTestimonials(testimonials);
  }
};

export const deleteTestimonial = (id: string) => {
  const testimonials = getTestimonials().filter(t => t.id !== id);
  saveTestimonials(testimonials);
};

// Experience
export const getExperience = (): Experience[] => {
  initializeData();
  return JSON.parse(localStorage.getItem('portfolio_experience') || '[]');
};

export const saveExperience = (experience: Experience[]) => {
  localStorage.setItem('portfolio_experience', JSON.stringify(experience));
};

export const addExperience = (exp: Omit<Experience, 'id'>): Experience => {
  const experience = getExperience();
  const newExp = { ...exp, id: Date.now().toString() };
  experience.push(newExp);
  saveExperience(experience);
  return newExp;
};

export const updateExperience = (id: string, updates: Partial<Experience>) => {
  const experience = getExperience();
  const index = experience.findIndex(e => e.id === id);
  if (index !== -1) {
    experience[index] = { ...experience[index], ...updates };
    saveExperience(experience);
  }
};

export const deleteExperience = (id: string) => {
  const experience = getExperience().filter(e => e.id !== id);
  saveExperience(experience);
};
