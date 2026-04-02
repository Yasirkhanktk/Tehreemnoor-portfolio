# ⚡ SUPABASE SQL - COPY & PASTE READY

## 📋 Quick Reference

**Your Supabase Project:** https://tttmimgutbnkmhusaizt.supabase.co
**Status:** ✅ Credentials already configured in `.env.local`

---

## 🚀 STEP 1: Create Tables (Required - Do This First!)

### Go to Supabase Dashboard:
1. Visit: https://supabase.com/dashboard
2. Open your project
3. Click "SQL Editor" (left sidebar)
4. Click "New Query"

### Copy this ENTIRE SQL schema:

**(Or copy from `/supabase-schema.sql` file - it's the same)**

```sql
-- ============================================
-- TEHREEM NOOR PORTFOLIO - SUPABASE SCHEMA
-- ============================================

-- Enable UUID extension
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

CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
CREATE INDEX IF NOT EXISTS projects_title_idx ON projects(title);

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

CREATE INDEX IF NOT EXISTS testimonials_rating_idx ON testimonials(rating);

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

CREATE INDEX IF NOT EXISTS experience_current_idx ON experience(current);

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Public read access for experience" ON experience
  FOR SELECT USING (true);

-- Allow all operations (you can restrict this later with proper auth)
CREATE POLICY "Allow all operations for projects" ON projects
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for testimonials" ON testimonials
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for experience" ON experience
  FOR ALL USING (true);
```

### Run It:
1. Paste the SQL above
2. Click "RUN" (bottom right corner)
3. Wait 2-3 seconds
4. You should see: **"Success. No rows returned"** ✅

### Verify:
1. Click "Table Editor" in left sidebar
2. You should see 3 tables:
   - ✅ projects
   - ✅ testimonials  
   - ✅ experience

---

## 🎯 STEP 2: Add Sample Projects (Optional)

### Option A: Use Admin Panel (Easiest)
1. Run: `npm run dev`
2. Visit: `http://localhost:5173/admin/login`
3. Login: `admin@tehreemnoor.com` / `admin123`
4. Add projects manually through the UI

### Option B: Bulk Insert via SQL (Fastest)

**In Supabase SQL Editor, run these one by one:**

#### Sample Project 1 (E-Commerce)
```sql
INSERT INTO projects (
  title, category, description, image, tags,
  full_description, challenge, solution, results,
  timeline, client, role, gallery
) VALUES (
  'E-Commerce Platform Redesign',
  'websites',
  'Complete UX overhaul of an online shopping experience for 50K+ daily users',
  'https://images.unsplash.com/photo-1758598303946-385680e4eabd?w=1080',
  ARRAY['UI Design', 'UX Research', 'Prototyping', 'User Testing', 'Figma'],
  'A comprehensive redesign of a major e-commerce platform serving over 50,000 daily users.',
  'The existing platform had a 68% cart abandonment rate and users were struggling to find products efficiently.',
  'I conducted extensive user research, including interviews with 50+ users and heat map analysis to identify pain points.',
  ARRAY['Reduced cart abandonment by 32%', 'Increased conversion rate by 45%', 'Improved mobile user satisfaction from 2.3 to 4.6 stars', 'Decreased average checkout time from 8 minutes to 3 minutes'],
  '4 months',
  'ShopHub Inc.',
  'Lead UI/UX Designer',
  ARRAY['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800']
);
```

#### Sample Project 2 (Mobile App)
```sql
INSERT INTO projects (
  title, category, description, image, tags,
  full_description, timeline, client, role
) VALUES (
  'HealthTech Mobile Application',
  'apps',
  'Patient management app connecting healthcare providers with patients',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1080',
  ARRAY['Mobile App', 'Healthcare', 'UI/UX', 'Accessibility', 'React Native'],
  'Designed a comprehensive mobile application that bridges the gap between healthcare providers and patients.',
  '6 months',
  'MediConnect Health',
  'Senior Product Designer'
);
```

#### Sample Testimonial
```sql
INSERT INTO testimonials (name, role, company, content, rating) VALUES
(
  'Sarah Johnson',
  'Product Manager',
  'TechFlow Inc.',
  'Tehreem transformed our product with her exceptional design skills. Her attention to detail and user-centered approach resulted in a 40% increase in user engagement.',
  5
);
```

#### Sample Experience
```sql
INSERT INTO experience (company, role, period, description, achievements, current) VALUES
(
  'anemoia.dev',
  'UI/UX & Graphics Designer',
  '2023 - Present',
  'Leading design initiatives for innovative digital products, working closely with cross-functional teams.',
  ARRAY['Redesigned core product interface, improving user satisfaction by 45%', 'Established comprehensive design system used across 5+ products', 'Led UX research initiatives that informed strategic product decisions', 'Mentored 2 junior designers in UX best practices'],
  true
);
```

---

## 🔍 Useful SQL Queries

### View all projects
```sql
SELECT * FROM projects ORDER BY created_at DESC;
```

### View projects by category
```sql
SELECT * FROM projects WHERE category = 'websites';
```

### Count projects
```sql
SELECT COUNT(*) FROM projects;
```

### Delete a specific project
```sql
DELETE FROM projects WHERE id = 'your-project-id-here';
```

### Delete all projects (be careful!)
```sql
DELETE FROM projects;
```

### View all testimonials
```sql
SELECT * FROM testimonials ORDER BY created_at DESC;
```

### View current experience
```sql
SELECT * FROM experience WHERE current = true;
```

---

## ⚠️ Important Notes

### Array Format in SQL
When using arrays in SQL, use this format:
```sql
ARRAY['item1', 'item2', 'item3']
```

### Array Format in Table Editor
When entering arrays directly in Supabase Table Editor:
```
["item1", "item2", "item3"]
```
Note: Use double quotes in Table Editor, not single quotes!

### Category Values (Only These 5)
- `websites`
- `apps`
- `social`
- `branding`
- `research`

Any other value will be rejected!

---

## 🎉 That's It!

After running the schema SQL, you have:
- ✅ 3 tables created
- ✅ Row Level Security enabled
- ✅ Public read access
- ✅ Full CRUD access
- ✅ Auto-generated UUIDs
- ✅ Timestamp tracking
- ✅ Array support

Now you can:
1. Add data via admin panel at `/admin/login`
2. Or add data via SQL INSERT statements above
3. View data on your public site
4. Edit/delete via admin panel

**Your portfolio is connected to a real database!** 🚀
