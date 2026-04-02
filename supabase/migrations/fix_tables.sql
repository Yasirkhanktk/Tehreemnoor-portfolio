-- DROP existing tables if they have issues
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.experience CASCADE;

-- Create projects table with all required columns
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('websites', 'apps', 'social', 'branding', 'research')),
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    full_description TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT[],
    timeline TEXT,
    client TEXT,
    role TEXT,
    gallery TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create experience table
CREATE TABLE public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    achievements TEXT[] DEFAULT '{}',
    current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow all access to projects" ON public.projects;
DROP POLICY IF EXISTS "Allow all access to testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow all access to experience" ON public.experience;

-- Create policies to allow all operations for anon and authenticated users
CREATE POLICY "Allow all access to projects"
    ON public.projects
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow all access to testimonials"
    ON public.testimonials
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow all access to experience"
    ON public.experience
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at
    BEFORE UPDATE ON public.experience
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testimonials
INSERT INTO public.testimonials (name, role, company, content, rating) VALUES
    ('Sarah Johnson', 'Marketing Director', 'TechCorp', 'Working with this designer was an absolute pleasure. They brought our vision to life with stunning visuals and seamless user experience.', 5),
    ('Michael Chen', 'CEO', 'StartupHub', 'Incredible attention to detail and creativity. The final product exceeded all our expectations and helped us stand out in the market.', 5),
    ('Emily Rodriguez', 'Product Manager', 'InnovateLab', 'Professional, creative, and reliable. They delivered exceptional designs that perfectly aligned with our brand identity.', 5);

-- Insert sample data for experience
INSERT INTO public.experience (company, role, period, description, achievements, current) VALUES
    ('Design Studio Pro', 'Senior Product Designer', '2022 - Present', 'Leading design initiatives for major enterprise clients, focusing on creating intuitive and beautiful digital experiences.',
     ARRAY['Led design for 3 award-winning products', 'Mentored 5 junior designers', 'Established design system used across 20+ projects'],
     true),
    ('Creative Agency Inc', 'UX/UI Designer', '2020 - 2022', 'Collaborated with cross-functional teams to deliver user-centered design solutions for diverse clients across various industries.',
     ARRAY['Designed and launched 15+ successful client projects', 'Increased user engagement by 40% through redesign initiatives', 'Conducted user research with 200+ participants'],
     false),
    ('Freelance Designer', 'Independent Designer', '2018 - 2020', 'Built a diverse portfolio working with startups and small businesses, specializing in branding and web design.',
     ARRAY['Served 30+ satisfied clients', 'Achieved 100% client satisfaction rate', 'Developed 20+ brand identities'],
     false);

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
