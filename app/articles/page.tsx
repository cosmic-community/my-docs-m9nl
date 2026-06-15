import { getArticles, getSections, getMetafieldValue } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'
import type { Article } from '@/types'

export default async function ArticlesPage() {
  const [articles, sections] = await Promise.all([getArticles(), getSections()])

  // Group articles by section
  const grouped: Record<string, Article[]> = {}
  const ungrouped: Article[] = []

  for (const article of articles) {
    const sectionId = article.metadata?.section?.id
    if (sectionId) {
      const existing = grouped[sectionId]
      if (existing) {
        existing.push(article)
      } else {
        grouped[sectionId] = [article]
      }
    } else {
      ungrouped.push(article)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">📄 Articles</h1>
        <p className="mt-2 text-gray-600">All documentation articles, organized by section.</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles available yet.</p>
      ) : (
        <div className="space-y-12">
          {sections.map((section) => {
            const sectionArticles = grouped[section.id]
            if (!sectionArticles || sectionArticles.length === 0) {
              return null
            }
            const name = getMetafieldValue(section.metadata?.name) || section.title
            return (
              <section key={section.id}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {sectionArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )
          })}

          {ungrouped.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Other Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ungrouped.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}