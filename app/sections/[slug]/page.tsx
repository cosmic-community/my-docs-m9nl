// app/sections/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSectionBySlug, getArticlesBySection, getMetafieldValue } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const section = await getSectionBySlug(slug)

  if (!section) {
    notFound()
  }

  const articles = await getArticlesBySection(section.id)
  const name = getMetafieldValue(section.metadata?.name) || section.title
  const description = getMetafieldValue(section.metadata?.description)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-brand-700 mb-6"
      >
        ← Back to home
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📁</span>
          <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
        </div>
        {description && <p className="text-gray-600">{description}</p>}
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles in this section yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}