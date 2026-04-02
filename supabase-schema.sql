-- ============================================
-- TEHREEM NOOR PORTFOLIO - SUPABASE SCHEMA
-- ============================================
-- Copy and paste this into your Supabase SQL Editor
-- This will create all necessary tables with proper types

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('websites', 'apps', 'social', 'branding', 'research')),
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  full_description TEXT,
  challenge TEXT,
  solution TEXT,
  results TEXT[] DEFAULT '{}',
  timeline TEXT,
  client TEXT,
  role TEXT,
  gallery TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster category queries
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);

-- Create index for faster search
CREATE INDEX IF NOT EXISTS projects_title_idx ON projects(title);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for rating queries
CREATE INDEX IF NOT EXISTS testimonials_rating_idx ON testimonials(rating);

-- Auto-update updated_at timestamp
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- EXPERIENCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  achievements TEXT[] DEFAULT '{}',
  current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for current position queries
CREATE INDEX IF NOT EXISTS experience_current_idx ON experience(current);

-- Auto-update updated_at timestamp
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view)
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Public read access for experience" ON experience
  FOR SELECT USING (true);

-- Authenticated users can perform all operations
-- (You'll replace this with proper auth after setting up Supabase Auth)
CREATE POLICY "Authenticated users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage experience" ON experience
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA INSERTION (OPTIONAL)
-- ============================================
-- Uncomment the sections below if you want to insert sample data

/*
-- Sample Projects
INSERT INTO projects (title, category, description, image, tags, full_description, challenge, solution, results, timeline, client, role, gallery) VALUES
(
  'E-Commerce Platform Redesign',
  'websites',
  'Complete UX overhaul of an online shopping experience for 50K+ daily users',
  'https://images.unsplash.com/photo-1758598303946-385680e4eabd?w=1080',
  ARRAY['UI Design', 'UX Research', 'Prototyping', 'User Testing', 'Figma'],
  'A comprehensive redesign of a major e-commerce platform serving over 50,000 daily users.',
  'The existing platform had a 68% cart abandonment rate and users were struggling to find products efficiently.',
  'I conducted extensive user research, including interviews with 50+ users and heat map analysis.',
  ARRAY['Reduced cart abandonment by 32%', 'Increased conversion rate by 45%'],
  '4 months',
  'ShopHub Inc.',
  'Lead UI/UX Designer',
  ARRAY['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800']
);

-- Sample Testimonials
INSERT INTO testimonials (name, role, company, content, rating) VALUES
(
  'Sarah Johnson',
  'Product Manager',
  'TechFlow Inc.',
  'Tehreem transformed our product with her exceptional design skills. Her attention to detail and user-centered approach resulted in a 40% increase in user engagement.',
  5
);

-- Sample Experience
INSERT INTO experience (company, role, period, description, achievements, current) VALUES
(
  'anemoia.dev',
  'UI/UX & Graphics Designer',
  '2023 - Present',
  'Leading design initiatives for innovative digital products.',
  ARRAY['Redesigned core product interface, improving user satisfaction by 45%', 'Established comprehensive design system'],
  true
);
*/

-- ============================================
-- HELPFUL QUERIES
-- ============================================

-- View all projects
-- SELECT * FROM projects ORDER BY created_at DESC;

-- View projects by category
-- SELECT * FROM projects WHERE category = 'websites';

-- View all testimonials with 5-star ratings
-- SELECT * FROM testimonials WHERE rating = 5;

-- View current experience
-- SELECT * FROM experience WHERE current = true;

-- Count projects by category
-- SELECT category, COUNT(*) as count FROM projects GROUP BY category;

-- Search projects by title or tags
-- SELECT * FROM projects WHERE title ILIKE '%design%' OR 'Design' = ANY(tags);
