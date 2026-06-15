import { getMetafieldValue } from '@/lib/cosmic'
import type { ChangelogEntry } from '@/types'

interface ChangelogItemProps {
  entry: ChangelogEntry
}

function typeColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'added':
      return 'bg-green-100 text-green-800'
    case 'changed':
      return 'bg-blue-100 text-blue-800'
    case 'fixed':
      return 'bg-yellow-100 text-yellow-800'
    case 'removed':
      return 'bg-red-100 text-red-800'
    case 'deprecated':
      return 'bg-orange-100 text-orange-800'
    case 'security':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ChangelogItem({ entry }: ChangelogItemProps) {
  if (!entry) return null

  const version = getMetafieldValue(entry.metadata?.version) || entry.title
  const releaseDate = getMetafieldValue(entry.metadata?.release_date)
  const type = getMetafieldValue(entry.metadata?.type)
  const details = getMetafieldValue(entry.metadata?.details)

  return (
    <div className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-l-transparent">
      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-white" />
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h3 className="text-lg font-bold text-gray-900">v{version}</h3>
        {type && (
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeColor(type)}`}>
            {type}
          </span>
        )}
        {releaseDate && (
          <span className="text-sm text-gray-500">{formatDate(releaseDate)}</span>
        )}
      </div>
      {details && (
        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
          {details}
        </div>
      )}
    </div>
  )
}