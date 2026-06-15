import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { Section } from '@/types'

interface SectionCardProps {
  section: Section
  articleCount?: number
}

export default function SectionCard({ section, articleCount }: SectionCardProps) {
  if (!section) return null

  const name = getMetafieldValue(section.metadata?.name) || section.title
  const description = getMetafieldValue(section.metadata?.description)

  return (
    <Link
      href={`/sections/${section.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 p-6 hover:border-brand-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">📁</span>
        {typeof articleCount === 'number' && (
          <span className="text-xs font-medium text-gray-500">
            {articleCount} {articleCount === 1 ? 'article' : 'articles'}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
        {name}
      </h3>
      {description && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>}
    </Link>
  )
}