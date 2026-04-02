# 🚀 Supabase Integration Guide

This guide will help you integrate Supabase with your portfolio admin panel.

## 📋 Table of Contents
1. [Sample Data Overview](#sample-data-overview)
2. [Supabase Setup](#supabase-setup)
3. [Database Schema](#database-schema)
4. [Code Integration](#code-integration)
5. [Testing](#testing)

---

## 📦 Sample Data Overview

### Files Created for You:

1. **`/src/app/admin/sampleData.ts`**
   - Contains 10 complete project examples
   - 6 testimonials with full details
   - 3 experience entries
   - Every field is filled with realistic data
   - Ready to copy-paste into Supabase

2. **`/supabase-schema.sql`**
   - Complete SQL schema for all tables
   - Includes indexes for performance
   - Row Level Security (RLS) policies
   - Auto-updating timestamps
   - Ready to run in Supabase SQL Editor

### Sample Projects Included:

1. **E-Commerce Platform Redesign** (Website)
2. **HealthTech Mobile Application** (App)
3. **Social Media Campaign - EcoLife** (Social)
4. **TechStart Brand Identity** (Branding)
5. **Banking App User Research** (Research)
6. **Restaurant Booking Platform** (Website)
7. **Fitness Tracking Dashboard** (App)
8. **Instagram Content Series** (Social)
9. **FinTech Startup Branding** (Branding)
10. **Education Platform UX Research** (Research)

Each project includes:
- ✅ Title, category, description
- ✅ Main image + gallery images
- ✅ Tags (3-5 per project)
- ✅ Full description
- ✅ Challenge & solution
- ✅ Results with metrics
- ✅ Timeline, client, role

---

## 🎯 Supabase Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Choose a name: `tehreem-portfolio`
5. Set a strong database password (save it!)
6. Select a region close to your users

### Step 2: Get Your Credentials

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### Step 3: Add Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 🗄️ Database Schema

### Option A: Use SQL File (Recommended)

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Click "New Query"
4. Copy entire content from `/supabase-schema.sql`
5. Paste and click "Run"
6. ✅ All tables created!

### Option B: Manual Table Creation

If you prefer creating tables manually in the Table Editor:

#### Projects Table
```
Column Name        | Type      | Options
-------------------|-----------|---------------------------
id                 | uuid      | Primary key, auto-generate
title              | text      | Required
category           | text      | Required, check constraint
description        | text      | Required
image              | text      | Required
tags               | text[]    | Array, default empty
full_description   | text      | Optional
challenge          | text      | Optional
solution           | text      | Optional
results            | text[]    | Array, default empty
timeline           | text      | Optional
client             | text      | Optional
role               | text      | Optional
gallery            | text[]    | Array, default empty
created_at         | timestamptz| Auto, default now()
updated_at         | timestamptz| Auto, default now()
```

#### Testimonials Table
```
Column Name    | Type        | Options
---------------|-------------|---------------------------
id             | uuid        | Primary key, auto-generate
name           | text        | Required
role           | text        | Required
company        | text        | Required
content        | text        | Required
rating         | int4        | Required, 1-5
created_at     | timestamptz | Auto, default now()
updated_at     | timestamptz | Auto, default now()
```

#### Experience Table
```
Column Name    | Type        | Options
---------------|-------------|---------------------------
id             | uuid        | Primary key, auto-generate
company        | text        | Required
role           | text        | Required
period         | text        | Required
description    | text        | Required
achievements   | text[]      | Array, default empty
current        | boolean     | Default false
created_at     | timestamptz | Auto, default now()
updated_at     | timestamptz | Auto, default now()
```

### Step 4: Insert Sample Data

**Easy Method**: Use the Table Editor in Supabase Dashboard

1. Go to Table Editor → `projects`
2. Click "Insert" → "Insert row"
3. Copy data from `/src/app/admin/sampleData.ts`
4. Paste field by field
5. For arrays (tags, results, gallery), use format: `["item1", "item2"]`

**Advanced Method**: Use SQL

Open SQL Editor and insert data:

```sql
INSERT INTO projects (
  title, category, description, image, tags,
  full_description, challenge, solution, results,
  timeline, client, role, gallery
) VALUES (
  'E-Commerce Platform Redesign',
  'websites',
  'Complete UX overhaul of an online shopping experience',
  'https://images.unsplash.com/photo-1758598303946-385680e4eabd?w=1080',
  ARRAY['UI Design', 'UX Research', 'Prototyping'],
  'A comprehensive redesign of a major e-commerce platform...',
  'The existing platform had a 68% cart abandonment rate...',
  'I conducted extensive user research...',
  ARRAY['Reduced cart abandonment by 32%', 'Increased conversion rate by 45%'],
  '4 months',
  'ShopHub Inc.',
  'Lead UI/UX Designer',
  ARRAY['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800']
);
```

Repeat for all projects from `sampleData.ts`.

---

## 💻 Code Integration

### Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Client

Create `/src/app/lib/supabaseClient.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Step 3: Update Data Store

Replace functions in `/src/app/admin/dataStore.ts`:

#### Before (localStorage):
```typescript
export const getProjects = (): Project[] => {
  initializeData();
  return JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
};
```

#### After (Supabase):
```typescript
import { supabase } from '../lib/supabaseClient';

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};
```

### Step 4: Update Components to Handle Async

Update `/src/app/admin/ManageProjects.tsx`:

```typescript
// Change from:
const loadProjects = () => {
  setProjects(getProjects());
};

// To:
const loadProjects = async () => {
  try {
    const data = await getProjects();
    setProjects(data);
  } catch (error) {
    console.error('Error loading projects:', error);
    toast.error('Failed to load projects');
  }
};

// Similar changes for add/update/delete functions
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    if (editingProject) {
      await updateProject(editingProject.id, formData);
      toast.success('Project updated successfully!');
    } else {
      await addProject(formData as Omit<Project, 'id'>);
      toast.success('Project added successfully!');
    }
    
    await loadProjects();
    closeModal();
  } catch (error) {
    console.error('Error saving project:', error);
    toast.error('Failed to save project');
  }
};
```

Repeat similar changes for testimonials and experience components.

---

## 🔐 Authentication (Optional but Recommended)

### Set up Supabase Auth

1. In Supabase Dashboard → Authentication → Providers
2. Enable Email provider
3. Configure redirect URLs

### Update Login Component

Replace mock auth in `/src/app/admin/AdminLogin.tsx`:

```typescript
import { supabase } from '../lib/supabaseClient';

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.session) {
      navigate('/admin');
    }
  } catch (error: any) {
    setError(error.message || 'Invalid email or password');
  }
};
```

### Update Protected Route

Replace localStorage check in `/src/app/admin/ProtectedRoute.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { supabase } from '../lib/supabaseClient';

export function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
```

---

## ✅ Testing

### Test Checklist:

1. **Database Connection**
   - [ ] Tables created successfully
   - [ ] Sample data visible in Supabase dashboard
   - [ ] RLS policies enabled

2. **Admin Panel**
   - [ ] Can view all projects
   - [ ] Can create new project
   - [ ] Can edit existing project
   - [ ] Can delete project
   - [ ] Same for testimonials
   - [ ] Same for experience

3. **Public Site**
   - [ ] Projects display correctly
   - [ ] Project modal shows all details
   - [ ] Testimonials show correctly
   - [ ] Experience timeline displays properly

4. **Authentication** (if implemented)
   - [ ] Can log in with email/password
   - [ ] Protected routes redirect when not logged in
   - [ ] Can log out successfully

---

## 🐛 Troubleshooting

### "Failed to fetch"
- Check if Supabase URL and Key are correct in `.env.local`
- Verify RLS policies allow public read access

### "Array values must be formatted as..."
- In Supabase Table Editor, use format: `["item1", "item2", "item3"]`
- Or use SQL: `ARRAY['item1', 'item2', 'item3']`

### Authentication errors
- Make sure Email provider is enabled in Supabase
- Check redirect URLs are configured
- Clear localStorage and try again

### Images not loading
- Verify image URLs are accessible
- Consider using Supabase Storage for images

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

## 🎉 Next Steps

After successful integration:

1. **Image Upload**: Consider implementing Supabase Storage for project images
2. **Real-time Updates**: Use Supabase real-time subscriptions
3. **Analytics**: Track page views and project interactions
4. **SEO**: Add metadata for each project
5. **Performance**: Implement pagination for large datasets

---

**Need Help?** 
Check the sample data in `/src/app/admin/sampleData.ts` for complete examples of every field!
