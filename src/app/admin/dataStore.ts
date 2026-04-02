import { supabase } from '../../lib/supabaseClient';

// Data types
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

// Helper function to transform Supabase snake_case to camelCase
const transformProject = (dbProject: any): Project => ({
  id: dbProject.id,
  title: dbProject.title,
  category: dbProject.category,
  description: dbProject.description,
  image: dbProject.image,
  tags: dbProject.tags || [],
  fullDescription: dbProject.full_description || undefined,
  challenge: dbProject.challenge || undefined,
  solution: dbProject.solution || undefined,
  results: dbProject.results || undefined,
  timeline: dbProject.timeline || undefined,
  client: dbProject.client || undefined,
  role: dbProject.role || undefined,
  gallery: dbProject.gallery || undefined,
});

// Helper function to transform camelCase to Supabase snake_case
const transformProjectForDB = (project: Partial<Project>): any => ({
  title: project.title,
  category: project.category,
  description: project.description,
  image: project.image,
  tags: project.tags || [],
  full_description: project.fullDescription || null,
  challenge: project.challenge || null,
  solution: project.solution || null,
  results: project.results || null,
  timeline: project.timeline || null,
  client: project.client || null,
  role: project.role || null,
  gallery: project.gallery || null,
});

// ============================================
// PROJECTS - Supabase API
// ============================================

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
    
    return (data || []).map(transformProject);
  } catch (error) {
    console.error('Failed to get projects:', error);
    throw error;
  }
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  try {
    const dbProject = transformProjectForDB(project);
    
    const { data, error } = await supabase
      .from('projects')
      .insert([dbProject])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding project:', error);
      throw error;
    }
    
    return transformProject(data);
  } catch (error) {
    console.error('Failed to add project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<void> => {
  try {
    const dbUpdates = transformProjectForDB(updates);
    
    const { error } = await supabase
      .from('projects')
      .update(dbUpdates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to update project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw error;
  }
};

// ============================================
// TESTIMONIALS - Supabase API
// ============================================

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to get testimonials:', error);
    throw error;
  }
};

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding testimonial:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to add testimonial:', error);
    throw error;
  }
};

export const updateTestimonial = async (id: string, updates: Partial<Testimonial>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    throw error;
  }
};

// ============================================
// EXPERIENCE - Supabase API
// ============================================

export const getExperience = async (): Promise<Experience[]> => {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching experience:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to get experience:', error);
    throw error;
  }
};

export const addExperience = async (exp: Omit<Experience, 'id'>): Promise<Experience> => {
  try {
    const { data, error } = await supabase
      .from('experience')
      .insert([exp])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding experience:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to add experience:', error);
    throw error;
  }
};

export const updateExperience = async (id: string, updates: Partial<Experience>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('experience')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to update experience:', error);
    throw error;
  }
};

export const deleteExperience = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to delete experience:', error);
    throw error;
  }
};
