import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
            <span className="text-2xl">📚</span>
            <span>My Docs</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/articles"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/code-samples"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
            >
              Code Samples
            </Link>
            <Link
              href="/changelog"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
            >
              Changelog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}