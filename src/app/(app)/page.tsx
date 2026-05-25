import React from 'react'
import { getPayload } from 'payload'
import config from '../../payload.config'
import AppClient from './AppClient'

export const revalidate = 0 // always fetch fresh data from database

export default async function Page() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 100,
  })

  // Normalize project database structure to match ProjectData type expected by frontend components
  const normalizedProjects = result.docs.map((p: any) => {
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      tags: p.tags || [],
      year: p.year,
      bg: p.bg,
      category: p.category,
      cats: p.cats || [],
      image: p.image && typeof p.image === 'object' ? p.image.url : '',
      caseStudy: {
        tagline: p.caseStudy?.tagline || '',
        duration: p.caseStudy?.duration || '',
        role: p.caseStudy?.role || '',
        team: p.caseStudy?.team || '',
        contextImage: p.caseStudy?.contextImage && typeof p.caseStudy.contextImage === 'object' ? p.caseStudy.contextImage.url : '',
        designImage: p.caseStudy?.designImage && typeof p.caseStudy.designImage === 'object' ? p.caseStudy.designImage.url : '',
        context: {
          headline: p.caseStudy?.context?.headline || '',
          body: p.caseStudy?.context?.body?.map((b: any) => b.paragraph) || [],
          image: p.caseStudy?.context?.image && typeof p.caseStudy.context.image === 'object' ? p.caseStudy.context.image.url : '',
        },
        designApproach: {
          headline: p.caseStudy?.designApproach?.headline || '',
          body: p.caseStudy?.designApproach?.body?.map((b: any) => b.paragraph) || [],
          images: p.caseStudy?.designApproach?.images?.map((img: any) => typeof img === 'object' ? img.url : '') || [],
        },
        myRole: {
          headline: p.caseStudy?.myRole?.headline || '',
          bullets: p.caseStudy?.myRole?.bullets?.map((b: any) => b.bullet) || [],
        },
        impact: {
          headline: p.caseStudy?.impact?.headline || '',
          body: p.caseStudy?.impact?.body || '',
          metrics: p.caseStudy?.impact?.metrics?.map((m: any) => ({ value: m.value, label: m.label })) || [],
          images: p.caseStudy?.impact?.images?.map((img: any) => typeof img === 'object' ? img.url : '') || [],
        },
        outcome: {
          headline: p.caseStudy?.outcome?.headline || '',
          body: p.caseStudy?.outcome?.body || '',
          images: p.caseStudy?.outcome?.images?.map((img: any) => typeof img === 'object' ? img.url : '') || [],
        }
      }
    }
  })

  return <AppClient initialProjects={normalizedProjects} />
}
