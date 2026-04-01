# Tehreem Noor Portfolio - Admin Panel

## 🎨 Portfolio Features
- Creative, unique design with light aesthetic
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Project modal with detailed views
- Strategic CTAs for client conversion
- Floating chat CTA button

## 🔐 Admin Panel

### Access
- **URL**: `/admin/login`
- **Demo Credentials**:
  - Email: `admin@tehreemnoor.com`
  - Password: `admin123`

### Features

#### 1. Dashboard (`/admin`)
- Quick stats overview
- Quick action cards to manage content
- Recent activity feed
- View live site link
- Logout functionality

#### 2. Manage Projects (`/admin/projects`)
**Full CRUD Operations**:
- ✅ Create new projects
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ View all projects in grid layout

**Project Fields**:
- Title *
- Category (Websites, Apps, Social Media, Branding, User Research) *
- Short Description *
- Main Image URL *
- Tags (multiple)
- Full Description
- Client Name
- Timeline
- Your Role
- Challenge
- Solution
- Results (multiple bullet points)
- Gallery Images (multiple)

#### 3. Manage Testimonials (`/admin/testimonials`)
**Full CRUD Operations**:
- ✅ Create new testimonials
- ✅ Edit existing testimonials
- ✅ Delete testimonials
- ✅ View all testimonials

**Testimonial Fields**:
- Client Name *
- Role *
- Company *
- Testimonial Content *
- Rating (1-5 stars) *

#### 4. Manage Experience (`/admin/experience`)
**Full CRUD Operations**:
- ✅ Create new experience entries
- ✅ Edit existing experience
- ✅ Delete experience
- ✅ View all experience in timeline

**Experience Fields**:
- Company *
- Role *
- Period *
- Description *
- Current Position (checkbox)
- Achievements (multiple bullet points)

## 💾 Data Storage

Currently using **localStorage** for data persistence. All data is stored in the browser's localStorage:
- `portfolio_projects`
- `portfolio_testimonials`
- `portfolio_experience`
- `isAdminAuthenticated`

### Ready for Supabase Integration

The admin panel is architected to easily integrate with Supabase:

1. **Data Store Layer** (`/src/app/admin/dataStore.ts`):
   - All CRUD operations are centralized
   - Simply replace localStorage functions with Supabase queries
   - Interfaces are already defined for TypeScript support

2. **Authentication**:
   - Replace mock authentication in `AdminLogin.tsx` with Supabase Auth
   - Update `ProtectedRoute.tsx` to use Supabase session

3. **Example Supabase Integration**:

```typescript
// Replace in dataStore.ts
import { supabase } from './supabaseClient';

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

// Similar for update, delete operations
```

## 🚀 Getting Started

### Public Site
```
URL: /
```
Navigate through sections using the floating navigation or scroll naturally.

### Admin Panel
```
URL: /admin/login
```
1. Login with demo credentials
2. Access dashboard
3. Manage your content
4. Changes are saved to localStorage
5. View updated content on public site

## 📱 Routes

- `/` - Public portfolio site
- `/admin/login` - Admin login page
- `/admin` - Admin dashboard (protected)
- `/admin/projects` - Manage projects (protected)
- `/admin/testimonials` - Manage testimonials (protected)
- `/admin/experience` - Manage experience (protected)

## 🎯 Features

### Authentication
- Login/logout functionality
- Protected routes
- Session persistence

### UI/UX
- Smooth animations with Framer Motion
- Toast notifications for actions
- Modal forms for editing
- Responsive design
- Intuitive interfaces

### Data Management
- Real-time updates
- Form validation
- Confirm dialogs for deletions
- Dynamic arrays (tags, results, achievements, gallery)
- Image preview for gallery

## 🔄 Next Steps for Supabase Integration

1. **Install Supabase**:
```bash
npm install @supabase/supabase-js
```

2. **Create Supabase Client** (`/src/app/admin/supabaseClient.ts`):
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

3. **Database Schema**:

```sql
-- Projects Table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null,
  description text not null,
  image text not null,
  tags text[],
  full_description text,
  challenge text,
  solution text,
  results text[],
  timeline text,
  client text,
  role text,
  gallery text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Testimonials Table
create table testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  company text not null,
  content text not null,
  rating integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Experience Table
create table experience (
  id uuid default uuid_generate_v4() primary key,
  company text not null,
  role text not null,
  period text not null,
  description text not null,
  achievements text[],
  current boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

4. **Update Authentication**:
Replace mock auth in `AdminLogin.tsx` with Supabase Auth.

5. **Replace dataStore.ts functions** with Supabase queries.

## 📝 Notes

- All forms include validation
- Required fields are marked with *
- Toast notifications confirm all actions
- Modal forms can be closed by clicking outside or X button
- Data persists in localStorage until Supabase is integrated
- Admin session persists until logout

---

**Built with ❤️ for Tehreem Noor**
