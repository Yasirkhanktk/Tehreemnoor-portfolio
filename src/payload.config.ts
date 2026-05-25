import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { gcsStorage } from '@payloadcms/storage-gcs'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { PROJECTS } from './app/data/projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ─── Plugins Config ───────────────────────────────────────────────────────────
const plugins = []

if (process.env.GCS_BUCKET) {
  plugins.push(
    gcsStorage({
      collections: {
        media: true,
      },
      bucket: process.env.GCS_BUCKET,
      options: {
        projectId: process.env.GCS_PROJECT_ID,
        credentials: {
          client_email: process.env.GCS_CLIENT_EMAIL,
          private_key: (process.env.GCS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        },
      },
    })
  )
} else if (process.env.S3_BUCKET) {
  plugins.push(
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
        forcePathStyle: true,
      },
    })
  )
}

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/portfolio',
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-local-dev',
  sharp,
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'media',
      access: {
        read: () => true,
      },
      hooks: {
        beforeOperation: [
          async ({ args, operation, req }) => {
            if ((operation === 'create' || operation === 'update') && req.file) {
              if (typeof req.file.name === 'string') {
                const parts = req.file.name.split('.');
                const extension = parts.pop() || '';
                const baseName = parts.join('.');
                
                // Sanitize baseName: keep only alphanumeric characters, dashes, and underscores
                const sanitizedBase = baseName
                  .replace(/[^a-zA-Z0-9_-]/g, '-')
                  .replace(/-+/g, '-')
                  .toLowerCase();
                  
                req.file.name = `${sanitizedBase}.${extension}`;
              }
            }
            return args;
          }
        ]
      },
      upload: {
        staticDir: path.resolve(dirname, '../public/media'),
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
          },
          {
            name: 'tablet',
            width: 1024,
            height: null,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'projects',
      access: {
        read: () => true,
      },
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'tags',
          type: 'select',
          hasMany: true,
          options: [
            'MOBILE', 'UX', 'WEB', 'SAAS', 'DEFI', 'WEB3', 'FINTECH', 'BRANDING'
          ],
          required: true,
        },
        {
          name: 'year',
          type: 'text',
          required: true,
        },
        {
          name: 'bg',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          options: [
            'Mobile', 'Dashboard', 'Website', 'App', 'Branding'
          ],
          required: true,
        },
        {
          name: 'cats',
          type: 'select',
          hasMany: true,
          options: [
            'Website', 'Application', 'Mobile', 'Web3', 'Branding', 'Dashboard'
          ],
          required: true,
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caseStudy',
          type: 'group',
          fields: [
            {
              name: 'tagline',
              type: 'text',
              required: true,
            },
            {
              name: 'duration',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              required: true,
            },
            {
              name: 'team',
              type: 'text',
              required: true,
            },
            {
              name: 'contextImage',
              type: 'relationship',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'designImage',
              type: 'relationship',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'context',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'body',
                  type: 'array',
                  fields: [
                    {
                      name: 'paragraph',
                      type: 'textarea',
                      required: true,
                    }
                  ]
                },
                {
                  name: 'image',
                  type: 'relationship',
                  relationTo: 'media',
                  required: false,
                }
              ]
            },
            {
              name: 'designApproach',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'body',
                  type: 'array',
                  fields: [
                    {
                      name: 'paragraph',
                      type: 'textarea',
                      required: true,
                    }
                  ]
                },
                {
                  name: 'images',
                  type: 'relationship',
                  relationTo: 'media',
                  hasMany: true,
                  required: false,
                }
              ]
            },
            {
              name: 'myRole',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'bullets',
                  type: 'array',
                  fields: [
                    {
                      name: 'bullet',
                      type: 'text',
                      required: true,
                    }
                  ]
                }
              ]
            },
            {
              name: 'impact',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'body',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'metrics',
                  type: 'array',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    }
                  ]
                },
                {
                  name: 'images',
                  type: 'relationship',
                  relationTo: 'media',
                  hasMany: true,
                  required: false,
                  admin: {
                    description: 'Add one or more impact images to display below the metrics.',
                  }
                }
              ]
            },
            {
              name: 'outcome',
              type: 'group',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'body',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'images',
                  type: 'relationship',
                  relationTo: 'media',
                  hasMany: true,
                  admin: {
                    description: 'Select up to 3 outcome images.',
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  plugins,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    try {
      const existing = await payload.find({
        collection: 'projects',
        limit: 1,
      })

      if (existing.totalDocs === 0) {
        payload.logger.info('No projects found. Seeding default projects from projects.ts...')

        const uploadImage = async (url: string, name: string) => {
          try {
            payload.logger.info(`Fetching image: ${url}`)
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP status ${res.status}`)
            const arrayBuffer = await res.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            const mediaDoc = await payload.create({
              collection: 'media',
              data: {
                alt: name,
              },
              file: {
                data: buffer,
                name: `${name.replace(/\s+/g, '-').toLowerCase()}.jpg`,
                mimetype: 'image/jpeg',
                size: buffer.byteLength,
              },
            })
            return mediaDoc.id
          } catch (err: any) {
            payload.logger.error(`Failed to download image ${url}: ${err.message}`)
            return null;
          }
        }

        for (const proj of PROJECTS) {
          payload.logger.info(`Seeding project: ${proj.name}`)

          const mainImageId = await uploadImage(proj.image, `${proj.name} Main`)
          const contextImageId = await uploadImage(proj.caseStudy.contextImage, `${proj.name} Context`)
          const designImageId = await uploadImage(proj.caseStudy.designImage, `${proj.name} Design`)

          if (!mainImageId || !contextImageId || !designImageId) {
            payload.logger.warn(`Could not seed project ${proj.name} completely due to missing media files. Skipping...`)
            continue
          }

          const contextSecImageId = proj.caseStudy.context.image ? await uploadImage(proj.caseStudy.context.image, `${proj.name} Context Section`) : null
          const designSecImageIds = [];
          if (proj.caseStudy.designApproach.images && Array.isArray(proj.caseStudy.designApproach.images)) {
            for (let i = 0; i < proj.caseStudy.designApproach.images.length; i++) {
              const url = proj.caseStudy.designApproach.images[i];
              const imgId = await uploadImage(url, `${proj.name} Design Approach ${i + 1}`);
              if (imgId) designSecImageIds.push(imgId);
            }
          }
          const impactSecImageId = proj.caseStudy.impact.image ? await uploadImage(proj.caseStudy.impact.image, `${proj.name} Impact Section`) : null

          await payload.create({
            collection: 'projects',
            data: {
              name: proj.name,
              description: proj.description,
              tags: proj.tags as any,
              year: proj.year,
              bg: proj.bg,
              category: proj.category as any,
              cats: proj.cats as any,
              image: mainImageId as any,
              caseStudy: {
                tagline: proj.caseStudy.tagline,
                duration: proj.caseStudy.duration,
                role: proj.caseStudy.role,
                team: proj.caseStudy.team,
                contextImage: contextImageId as any,
                designImage: designImageId as any,
                context: {
                  headline: proj.caseStudy.context.headline,
                  body: proj.caseStudy.context.body.map(text => ({ paragraph: text })),
                  image: contextSecImageId || undefined,
                },
                designApproach: {
                  headline: proj.caseStudy.designApproach.headline,
                  body: proj.caseStudy.designApproach.body.map(text => ({ paragraph: text })),
                  images: designSecImageIds as any,
                },
                myRole: {
                  headline: proj.caseStudy.myRole.headline,
                  bullets: proj.caseStudy.myRole.bullets.map(text => ({ bullet: text })),
                },
                impact: {
                  headline: proj.caseStudy.impact.headline,
                  body: proj.caseStudy.impact.body,
                  metrics: proj.caseStudy.impact.metrics.map(m => ({ value: m.value, label: m.label })),
                  image: impactSecImageId || undefined,
                },
                outcome: {
                  headline: proj.caseStudy.outcome.headline,
                  body: proj.caseStudy.outcome.body,
                  images: await (async () => {
                    const imgIds = [];
                    if (proj.caseStudy.outcome.images && Array.isArray(proj.caseStudy.outcome.images)) {
                      for (let i = 0; i < proj.caseStudy.outcome.images.length; i++) {
                        const url = proj.caseStudy.outcome.images[i];
                        const imgId = await uploadImage(url, `${proj.name} Outcome ${i + 1}`);
                        if (imgId) imgIds.push(imgId);
                      }
                    }
                    return imgIds as any;
                  })(),
                },
              },
            },
          })
        }
        payload.logger.info('Database seeding completed successfully!')
      }
    } catch (error: any) {
      payload.logger.error(`Error during seeding: ${error.message}`)
    }
  }
})
