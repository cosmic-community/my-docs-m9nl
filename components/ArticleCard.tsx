import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  if (!article) return null

  const title = getMetafieldValue(article.metadata?.title) || article.title
  const summary = getMetafieldValue(article.metadata?.summary)
  const version = getMetafieldValue(article.metadata?.version)
  const sectionName = article.metadata?.section
    ? getMetafieldValue(article.metadata.section.metadata?.name) || article.metadata.section.title
    : ''

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        {sectionName && (
          <span className="text-xs font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
            {sectionName}
          </span>
        )}
        {version && (
          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            v{version}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
        {title}
      </h3>
      {summary && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{summary}</p>}
    </Link>
  )
}