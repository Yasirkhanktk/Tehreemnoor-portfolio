import { motion } from 'motion/react';
import { Star, Quote, ArrowRight } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechFlow Inc.',
      content: 'Tehreem transformed our product with her exceptional design skills. Her attention to detail and user-centered approach resulted in a 40% increase in user engagement. She\'s not just a designer, she\'s a strategic partner.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'StartupHub',
      content: 'Working with Tehreem was a game-changer for our brand. She delivered a complete brand identity that perfectly captured our vision. Her professionalism and creativity are unmatched.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'BrightPath Media',
      content: 'Tehreem\'s social media designs elevated our campaigns to new heights. Her creative vision and ability to understand our target audience resulted in a 3x increase in social engagement.',
      rating: 5,
    },
    {
      name: 'David Park',
      role: 'CTO',
      company: 'InnovateLabs',
      content: 'The UX research and design work Tehreem provided was instrumental in our app\'s success. Her insights into user behavior helped us create an intuitive experience our users love.',
      rating: 5,
    },
    {
      name: 'Lisa Thompson',
      role: 'Founder',
      company: 'EcoGoods',
      content: 'Tehreem designed our entire brand identity from scratch. The result was beyond our expectations - modern, elegant, and perfectly aligned with our values. Highly recommend!',
      rating: 5,
    },
    {
      name: 'James Wilson',
      role: 'VP of Design',
      company: 'DigitalCraft',
      content: 'Tehreem is a rare talent. Her ability to balance aesthetics with functionality is remarkable. Every project she touches turns into something special.',
      rating: 5,
    },
  ];

  return (
    <div className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-purple-600 mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            What Clients <span className="text-purple-600">Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take my word for it - here's what amazing people I've worked with have to say
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-purple-600 mb-4 opacity-50" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-purple-600 text-purple-600" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

              <div className="pt-4 border-t border-purple-200">
                <h4 className="text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="text-sm text-purple-600">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl text-gray-900 mb-4">Want to Be My Next Success Story?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join these amazing clients and let's create something extraordinary together
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Start Your Project Today
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}