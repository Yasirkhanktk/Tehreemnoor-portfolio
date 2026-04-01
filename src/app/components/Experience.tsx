import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

export function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: 'anemoia.dev',
      role: 'UI/UX & Graphics Designer',
      period: '2023 - Present',
      description: 'Leading design initiatives for innovative digital products',
      current: true,
      achievements: [
        'Redesigned core product interface, improving user satisfaction by 45%',
        'Established comprehensive design system used across 5+ products',
        'Led user research initiatives with 100+ participants',
        'Collaborated with cross-functional teams on 15+ successful launches',
      ],
    },
    {
      company: 'Creative Studio Inc.',
      role: 'Junior Designer',
      period: '2022 - 2023',
      description: 'Crafted visual designs for diverse client projects',
      achievements: [
        'Designed 30+ marketing campaigns for various industries',
        'Created brand identities for 10+ startups',
        'Collaborated with developers to ensure pixel-perfect implementations',
        'Managed multiple client relationships with 98% satisfaction rate',
      ],
    },
    {
      company: 'Freelance',
      role: 'Graphic Designer',
      period: '2021 - 2022',
      description: 'Built portfolio through diverse client work',
      achievements: [
        'Completed 50+ projects across branding, web, and social media',
        'Developed strong client communication and project management skills',
        'Built reputation for delivering high-quality work on time',
        'Established foundation for professional design career',
      ],
    },
  ];

  const skills = [
    'Figma',
    'Adobe Creative Suite',
    'Sketch',
    'Prototyping',
    'User Research',
    'Wireframing',
    'Visual Design',
    'Interaction Design',
    'Design Systems',
    'Branding',
    'Typography',
    'Color Theory',
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
          <span className="text-sm uppercase tracking-wider text-purple-600 mb-4 block">Experience</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
            My <span className="text-purple-600">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12 mb-20">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12 border-l-2 border-purple-200"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600 border-4 border-white shadow-lg" />
              
              {exp.current && (
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600 animate-ping" />
              )}

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl text-gray-900 mb-1">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                      {exp.current && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl text-gray-900 mb-8 text-center">Skills & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-6 py-3 bg-white rounded-full text-gray-700 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid sm:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-4xl text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-4xl text-purple-600 mb-2">30+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-4xl text-purple-600 mb-2">3+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}