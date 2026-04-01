import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquareQuote, 
  Briefcase, 
  LogOut,
  BarChart3,
  Users,
  Eye
} from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const stats = [
    { label: 'Total Projects', value: '10', icon: FolderKanban, color: 'purple' },
    { label: 'Testimonials', value: '6', icon: MessageSquareQuote, color: 'pink' },
    { label: 'Experience', value: '3', icon: Briefcase, color: 'blue' },
    { label: 'Total Views', value: '2.5K', icon: Eye, color: 'green' },
  ];

  const quickActions = [
    {
      title: 'Manage Projects',
      description: 'Add, edit, or delete portfolio projects',
      icon: FolderKanban,
      link: '/admin/projects',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Manage Testimonials',
      description: 'Update client testimonials and reviews',
      icon: MessageSquareQuote,
      link: '/admin/testimonials',
      color: 'from-pink-500 to-pink-600',
    },
    {
      title: 'Manage Experience',
      description: 'Edit work experience and timeline',
      icon: Briefcase,
      link: '/admin/experience',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Tehreem Noor Portfolio</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl text-gray-900 mb-2">Welcome back, Tehreem! 👋</h2>
          <p className="text-gray-600">Here's what's happening with your portfolio</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                to={action.link}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="text-lg text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Portfolio is live and running</p>
                <p className="text-xs text-gray-500">All systems operational</p>
              </div>
              <span className="text-xs text-gray-400">Now</span>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Admin panel ready</p>
                <p className="text-xs text-gray-500">Ready for Supabase integration</p>
              </div>
              <span className="text-xs text-gray-400">Today</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
