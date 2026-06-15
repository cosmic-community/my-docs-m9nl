import { getChangelogEntries } from '@/lib/cosmic'
import ChangelogItem from '@/components/ChangelogItem'

export default async function ChangelogPage() {
  const entries = await getChangelogEntries()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">📋 Changelog</h1>
        <p className="mt-2 text-gray-600">
          Track every release, improvement, and fix.
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="text-gray-500">No changelog entries available yet.</p>
      ) : (
        <div>
          {entries.map((entry) => (
            <ChangelogItem key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}