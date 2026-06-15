import { createBucketClient } from '@cosmicjs/sdk'
import type { Section, Article, CodeSample, ChangelogEntry } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metafield values that may be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Numeric sort helper for "order" fields
function byOrder<T extends { metadata: { order?: number } }>(a: T, b: T): number {
  const orderA = typeof a.metadata?.order === 'number' ? a.metadata.order : 9999
  const orderB = typeof b.metadata?.order === 'number' ? b.metadata.order : 9999
  return orderA - orderB
}

export async function getSections(): Promise<Section[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'sections' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return (response.objects as Section[]).sort(byOrder)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch sections')
  }
}

export async function getSectionBySlug(slug: string): Promise<Section | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'sections', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Section
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch section')
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return (response.objects as Article[]).sort(byOrder)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch articles')
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'articles', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Article
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch article')
  }
}

export async function getArticlesBySection(sectionId: string): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles', 'metadata.section': sectionId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return (response.objects as Article[]).sort(byOrder)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch articles by section')
  }
}

export async function getCodeSamples(): Promise<CodeSample[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'code-samples' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as CodeSample[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch code samples')
  }
}

export async function getChangelogEntries(): Promise<ChangelogEntry[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'changelog-entries' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const entries = response.objects as ChangelogEntry[]
    return entries.sort((a, b) => {
      const dateA = new Date(a.metadata?.release_date || '').getTime()
      const dateB = new Date(b.metadata?.release_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch changelog entries')
  }
}