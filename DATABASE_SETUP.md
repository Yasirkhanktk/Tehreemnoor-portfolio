# Database Setup Instructions

## Fix the "Table Not Found" Errors

Your app is trying to access database tables that don't exist yet. Follow these steps to create them:

### Step 1: Open Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Navigate to your project: **tttmimgutbnkmhusaizt**

### Step 2: Run the Migration SQL

1. Click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open the file `/tmp/sandbox/supabase/migrations/create_tables.sql`
4. Copy ALL the SQL content from that file
5. Paste it into the SQL Editor
6. Click **Run** or press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)

### Step 3: Verify Tables Were Created

1. Click **Table Editor** in the left sidebar
2. You should see three new tables:
   - `projects`
   - `testimonials`
   - `experience`

### What This Does

The SQL script will:
- ✅ Create three database tables for your portfolio
- ✅ Set up Row Level Security (RLS) policies
- ✅ Add automatic timestamp tracking
- ✅ Insert sample data for testimonials and experience

### After Running the SQL

Refresh your portfolio app and:
- The errors will be gone
- Testimonials and experience sections will show sample data
- You'll be able to add, edit, and delete projects from the admin panel

---

## Admin Login Credentials

- Email: `admin@tehreemnoor.com`
- Password: `admin123`

Access the admin panel at: `/admin/login`
