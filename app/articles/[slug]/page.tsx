// app/articles/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getMetafieldValue } from '@/lib/cosmic'
import CodeBlock from '@/components/CodeBlock'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const title = getMetafieldValue(article.metadata?.title) || article.title
  const summary = getMetafieldValue(article.metadata?.summary)
  const content = getMetafieldValue(article.metadata?.content)
  const version = getMetafieldValue(article.metadata?.version)
  const section = article.metadata?.section
  const sectionName = section
    ? getMetafieldValue(section.metadata?.name) || section.title
    : ''
  const codeSample = article.metadata?.code_sample

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
        <Link href="/articles" className="text-gray-500 hover:text-brand-700">
          ← Articles
        </Link>
        {section && (
          <>
            <span className="text-gray-300">/</span>
            <Link
              href={`/sections/${section.slug}`}
              className="text-brand-700 hover:text-brand-800 font-medium"
            >
              {sectionName}
            </Link>
          </>
        )}
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
        <div className="flex items-center gap-3 mt-3">
          {version && (
            <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              v{version}
            </span>
          )}
        </div>
        {summary && <p className="mt-4 text-lg text-gray-600">{summary}</p>}
      </header>

      {content && (
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-brand-700 mb-10 whitespace-pre-line">
          {content}
        </div>
      )}

      {codeSample && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Example</h2>
          <CodeBlock sample={codeSample} />
        </div>
      )}
    </div>
  )
}