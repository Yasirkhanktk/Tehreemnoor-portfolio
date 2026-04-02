# 🎨 Tehreem Noor - Portfolio Website

> A creative, unique, and aesthetically designed portfolio showcasing UI/UX and Graphics Design work.

[![Supabase](https://img.shields.io/badge/Supabase-Integrated-3ECF8E?logo=supabase)](https://supabase.com)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

---

## ✨ Features

### Public Portfolio Site
- 🎯 **Hero Section** - Engaging landing with animated elements
- 📱 **Projects Gallery** - Filterable by category (Websites, Apps, Social Media, Branding, Research)
- 💼 **Experience Timeline** - Professional work history
- ⭐ **Testimonials** - Client reviews with star ratings
- 📧 **Contact Form** - Get in touch section
- 🎨 **Project Modals** - Detailed project case studies with galleries
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- ⚡ **Smooth Animations** - Motion/Framer Motion throughout

### Admin Panel ✅
- 🔐 **Secure Login** - Protected admin routes
- 📊 **Dashboard** - Quick stats and navigation
- 📝 **Manage Projects** - Full CRUD operations
- 💬 **Manage Testimonials** - Add/edit client reviews
- 💼 **Manage Experience** - Update work history
- 🔔 **Toast Notifications** - User feedback for all actions
- ⚙️ **Settings Button** - Easy admin access (can be hidden)

### Database Integration ✅
- 🗄️ **Supabase PostgreSQL** - Production-ready database
- 🔄 **REST API** - POST/GET/PUT/DELETE operations
- 🆔 **Auto-generated UUIDs** - Unique identifiers
- ⏰ **Timestamp Tracking** - Created/updated times
- 🔒 **Row Level Security** - Secure data access
- 📊 **Sample Data** - 10 complete projects included

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd portfolio
npm install
```

### 2. Setup Supabase (5 minutes)
**Full guide:** [QUICK_START.md](./QUICK_START.md)

1. Create project at [supabase.com](https://supabase.com)
2. Run `/supabase-schema.sql` in SQL Editor
3. Copy `.env.local.example` to `.env.local`
4. Add your Supabase URL and Key
5. Done! 🎉

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access Admin Panel
- Visit: `http://localhost:5173/admin/login`
- Email: `admin@tehreemnoor.com`
- Password: `admin123`

---

## 📚 Documentation

### 🌟 Start Here
- **[INDEX.md](./INDEX.md)** - Complete documentation navigation
- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[SUMMARY.md](./SUMMARY.md)** - Complete overview

### 📖 Setup Guides
- **[CHECKLIST.md](./CHECKLIST.md)** - Step-by-step with verification
- **[SUPABASE_GUIDE.md](./SUPABASE_GUIDE.md)** - Detailed Supabase docs

### 🔧 Technical Reference
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Object schema reference
- **[VISUAL_FLOW.md](./VISUAL_FLOW.md)** - Architecture diagrams
- **[supabase-schema.sql](./supabase-schema.sql)** - Database schema

### 🔄 Git & Deployment
- **[HOW_TO_COMMIT.txt](./HOW_TO_COMMIT.txt)** - Git commands

---

## 🗂️ Project Structure

```
portfolio/
├── src/
│   ├── lib/
│   │   └── supabaseClient.ts        # Supabase configuration
│   ├── app/
│   │   ├── admin/                   # Admin panel
│   │   │   ├── dataStore.ts         # API operations (Supabase)
│   │   │   ├── sampleData.ts        # 10 sample projects
│   │   │   ├── AdminLogin.tsx       # Login page
│   │   │   ├── AdminDashboard.tsx   # Dashboard
│   │   │   ├── ManageProjects.tsx   # Projects CRUD
│   │   │   ├── ManageTestimonials.tsx  # Testimonials CRUD
│   │   │   └── ManageExperience.tsx    # Experience CRUD
│   │   ├── components/              # UI components
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectModal.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── FloatingCTA.tsx
│   │   ├── App.tsx                  # Main app + routing
│   │   └── PublicSite.tsx           # Public website
│   └── styles/
│       ├── theme.css                # Design tokens
│       └── fonts.css                # Font imports
├── supabase-schema.sql              # Database schema
├── .env.local.example               # Environment template
└── Documentation/                   # All guides (15 files)
```

---

## 🎯 Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **React Router 7** - Routing
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - RESTful API
  - Row Level Security
  - Real-time subscriptions (ready to use)

### Development
- **Vite** - Build tool
- **npm** - Package manager

---

## 🗄️ Database Schema

### Tables

#### `projects`
- Complete project information
- 15+ fields including arrays (tags, results, gallery)
- Categories: websites, apps, social, branding, research

#### `testimonials`
- Client reviews and ratings
- 1-5 star rating system

#### `experience`
- Work history and achievements
- Achievement arrays

**Full schema:** [supabase-schema.sql](./supabase-schema.sql)

---

## 📊 Sample Data

10 complete projects included in `/src/app/admin/sampleData.ts`:

1. E-Commerce Platform Redesign (Website)
2. HealthTech Mobile Application (App)
3. EcoLife Social Campaign (Social)
4. TechStart Brand Identity (Branding)
5. Banking App User Research (Research)
6. Restaurant Booking Platform (Website)
7. Fitness Tracking Dashboard (App)
8. Fashion Brand Instagram (Social)
9. FinTech Startup Branding (Branding)
10. Education Platform Research (Research)

Plus 6 testimonials and 3 experience entries!

---

## 🔧 Environment Variables

Create `.env.local` with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Never commit `.env.local` to Git!** (Already in .gitignore)

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push

# Connect repo to Vercel
# Add environment variables in Vercel dashboard
# Deploy automatically
```

### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
# Add environment variables in Netlify dashboard
```

**Don't forget to add your environment variables in the deployment dashboard!**

---

## 📱 Routes

### Public Routes
- `/` - Main portfolio site
- `/admin/login` - Admin login

### Protected Routes (Login Required)
- `/admin` - Dashboard
- `/admin/projects` - Manage projects
- `/admin/testimonials` - Manage testimonials
- `/admin/experience` - Manage experience

---

## 🎨 Features in Detail

### Project Management
- Add new projects with all details
- Upload/link images
- Add multiple tags
- Add challenge, solution, results
- Gallery with multiple images
- Edit existing projects
- Delete projects (with confirmation)

### Testimonials
- Add client reviews
- 5-star rating system
- Edit/delete testimonials

### Experience
- Add work positions
- Mark current position
- Multiple achievement bullets
- Edit/delete entries

### Public Site
- Filter projects by category
- Click project for detailed modal
- Smooth animations throughout
- Floating "Let's Work Together" CTA
- Contact form
- Responsive on all devices

---

## ⚙️ Admin Panel Access

### Show Admin Button (Current)
Admin settings button visible in top-right corner.

### Hide Admin Button (For Production)
Comment out these sections in `/src/app/components/Navigation.tsx`:

```tsx
// Lines 60-67 (Desktop)
{/* COMMENT OUT THIS SECTION TO HIDE ADMIN ACCESS */}
...settings button code...
{/* END ADMIN BUTTON */}

// Lines 77-84 (Mobile)  
{/* COMMENT OUT THIS SECTION TO HIDE ADMIN ACCESS */}
...settings button code...
{/* END ADMIN BUTTON */}
```

Then access admin via direct URL: `/admin/login`

---

## 🔐 Security

- Row Level Security (RLS) enabled
- Public read access (portfolio visible to all)
- Admin write access (only authenticated users)
- Environment variables for API keys
- Protected admin routes
- Confirmation dialogs for deletions

---

## 🐛 Troubleshooting

### "Failed to load projects"
- Check `.env.local` exists
- Verify Supabase URL and key are correct
- Check database tables exist (run SQL schema)

### "Permission denied"
- Re-run SQL schema to create RLS policies
- Check Supabase project is active

### "Module not found"
- Run `npm install`

**Full troubleshooting:** [CHECKLIST.md](./CHECKLIST.md)

---

## 📈 Next Steps

### Immediate
- [x] Supabase integrated
- [x] Admin panel working
- [ ] Add your projects
- [ ] Add testimonials
- [ ] Add experience
- [ ] Deploy to production

### Future Enhancements
- [ ] Supabase Auth (replace mock login)
- [ ] File upload (Supabase Storage)
- [ ] Real-time updates
- [ ] Analytics dashboard
- [ ] Contact form email integration
- [ ] Blog section
- [ ] Dark mode

---

## 🤝 About

**Designer:** Tehreem Noor  
**Role:** UI/UX & Graphics Designer  
**Current:** anemoia.dev  
**Age:** 24

Specializing in:
- UI/UX Design
- Graphics Design
- Website Design
- Mobile App Design
- Social Media Design
- Branding
- User Research

---

## 📄 License

Private portfolio project.

---

## 🙏 Acknowledgments

- Built with React + Vite
- Powered by Supabase
- Styled with Tailwind CSS
- Animated with Motion (Framer Motion)
- Icons from Lucide React
- Images from Unsplash

---

## 📞 Support

For setup help, see:
- [QUICK_START.md](./QUICK_START.md) - Fast setup
- [SUMMARY.md](./SUMMARY.md) - Complete guide
- [INDEX.md](./INDEX.md) - All documentation

---

**Built with ❤️ for showcasing amazing design work!** 🎨

---

*Last updated: April 2026*
