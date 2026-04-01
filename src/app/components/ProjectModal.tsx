import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, Users, Target, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    fullDescription?: string;
    challenge?: string;
    solution?: string;
    results?: string[];
    timeline?: string;
    client?: string;
    role?: string;
    gallery?: string[];
  } | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 left-full ml-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Hero Image */}
          <div className="relative h-[300px] md:h-[400px] -mt-14">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-t-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-3xl md:text-4xl text-white mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Project Meta */}
            <div className="grid sm:grid-cols-3 gap-6">
              {project.client && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Client</p>
                    <p className="text-gray-900">{project.client}</p>
                  </div>
                </div>
              )}
              {project.timeline && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Timeline</p>
                    <p className="text-gray-900">{project.timeline}</p>
                  </div>
                </div>
              )}
              {project.role && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Role</p>
                    <p className="text-gray-900">{project.role}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {project.fullDescription && (
              <div>
                <h3 className="text-2xl text-gray-900 mb-4">Project Overview</h3>
                <p className="text-gray-600 leading-relaxed">{project.fullDescription}</p>
              </div>
            )}

            {/* Challenge */}
            {project.challenge && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-xl text-gray-900 mb-3">The Challenge</h3>
                <p className="text-gray-700 leading-relaxed">{project.challenge}</p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div>
                <h3 className="text-2xl text-gray-900 mb-4">The Solution</h3>
                <p className="text-gray-600 leading-relaxed">{project.solution}</p>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h3 className="text-2xl text-gray-900 mb-6">Project Gallery</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.gallery.map((img, index) => (
                    <div key={index} className="rounded-2xl overflow-hidden">
                      <ImageWithFallback
                        src={img}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl text-gray-900 mb-4">Key Results</h3>
                <ul className="space-y-3">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-purple-600 mt-1">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
              <h3 className="text-2xl text-white mb-3">Like what you see?</h3>
              <p className="text-white/90 mb-6">Let's create something amazing together</p>
              <button
                onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
