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
    // Import sample data
    const { sampleProjects } = require('./sampleData');
    localStorage.setItem('portfolio_projects', JSON.stringify(sampleProjects));
  }

  if (!localStorage.getItem('portfolio_testimonials')) {
    const { sampleTestimonials } = require('./sampleData');
    localStorage.setItem('portfolio_testimonials', JSON.stringify(sampleTestimonials));
  }

  if (!localStorage.getItem('portfolio_experience')) {
    const { sampleExperience } = require('./sampleData');
    localStorage.setItem('portfolio_experience', JSON.stringify(sampleExperience));
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