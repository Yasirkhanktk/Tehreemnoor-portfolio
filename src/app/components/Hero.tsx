import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-50 rounded-full mb-8 border border-purple-100"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-700">Available for freelance projects</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl mb-6 text-gray-900"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Tehreem Noor
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto"
        >
          UI/UX & Graphics Designer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto"
        >
          Creating beautiful, user-centered digital experiences at{' '}
          <span className="text-purple-600">anemoia.dev</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            View My Work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-gray-900 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors"
          >
            Get In Touch
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
