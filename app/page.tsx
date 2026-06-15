import Link from 'next/link'
import { getSections, getArticles, getChangelogEntries } from '@/lib/cosmic'
import SectionCard from '@/components/SectionCard'
import ArticleCard from '@/components/ArticleCard'
import { getMetafieldValue } from '@/lib/cosmic'

export default async function HomePage() {
  const [sections, articles, changelog] = await Promise.all([
    getSections(),
    getArticles(),
    getChangelogEntries(),
  ])

  const recentArticles = articles.slice(0, 4)
  const latestVersion = changelog[0]
    ? getMetafieldValue(changelog[0].metadata?.version)
    : ''

  const countForSection = (sectionId: string) =>
    articles.filter((a) => a.metadata?.section?.id === sectionId).length

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <span className="inline-block text-5xl mb-4">📚</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            My Docs
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Everything you need to build, organized into clear sections, version-aware
            articles, and ready-to-copy code samples.
          </p>
          {latestVersion && (
            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-brand-700 bg-white border border-brand-200 px-4 py-2 rounded-full hover:bg-brand-50 transition-colors"
            >
              🚀 Latest release: v{latestVersion}
            </Link>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Sections */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse Sections</h2>
          </div>
          {sections.length === 0 ? (
            <p className="text-gray-500">No sections available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  articleCount={countForSection(section.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recent Articles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
            <Link
              href="/articles"
              className="text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              View all →
            </Link>
          </div>
          {recentArticles.length === 0 ? (
            <p className="text-gray-500">No articles available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}