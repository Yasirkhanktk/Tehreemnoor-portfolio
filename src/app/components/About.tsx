import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Palette, Users, Lightbulb, Heart, ArrowRight } from 'lucide-react';

export function About() {
  const qualities = [
    {
      icon: Palette,
      title: 'Creative Vision',
      description: 'Transforming ideas into visually stunning designs',
    },
    {
      icon: Users,
      title: 'User-Centered',
      description: 'Putting users first in every design decision',
    },
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      description: 'Finding elegant solutions to complex challenges',
    },
    {
      icon: Heart,
      title: 'Passionate',
      description: 'Dedicated to crafting meaningful experiences',
    },
  ];

  return (
    <div className="py-20 md:py-32 px-6 md:px-12 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-purple-600 mb-4 block">About Me</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            Design is my <span className="text-purple-600">passion</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1753162658542-dd053c2b5196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRlc2lnbmVyfGVufDF8fHx8MTc3NDk0NzkxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Tehreem Noor"
                className="relative rounded-3xl w-full h-[500px] object-cover shadow-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              At 24, I've found my calling in creating digital experiences that not only look beautiful but
              truly resonate with users. Currently designing at <span className="text-purple-600">anemoia.dev</span>,
              I bring creativity and empathy to every project.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              My approach combines aesthetic sensibility with strategic thinking, ensuring that every design
              decision serves both business goals and user needs. I believe great design is invisible – it
              just works.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From websites to mobile apps, branding to user research, I love the entire spectrum of design.
              Each project is an opportunity to learn, grow, and create something meaningful.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualities.map((quality, index) => (
            <motion.div
              key={quality.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <quality.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">{quality.title}</h3>
              <p className="text-sm text-gray-600">{quality.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-purple-100 text-center"
        >
          <h3 className="text-2xl md:text-3xl text-gray-900 mb-3">Looking for a Designer Who Gets It?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            I combine creativity with strategy to deliver designs that don't just look good—they perform.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-shadow inline-flex items-center gap-2"
          >
            Let's Discuss Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}