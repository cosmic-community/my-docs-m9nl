import { getMetafieldValue } from '@/lib/cosmic'
import type { CodeSample } from '@/types'

interface CodeBlockProps {
  sample: CodeSample
}

export default function CodeBlock({ sample }: CodeBlockProps) {
  if (!sample) return null

  const name = getMetafieldValue(sample.metadata?.name) || sample.title
  const language = getMetafieldValue(sample.metadata?.language)
  const code = getMetafieldValue(sample.metadata?.code)

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-sm font-medium text-gray-200">{name}</span>
        {language && (
          <span className="text-xs font-mono uppercase tracking-wide text-brand-300 bg-gray-900 px-2 py-1 rounded">
            {language}
          </span>
        )}
      </div>
      <pre className="code-block !rounded-none !border-0 m-0">
        <code>{code}</code>
      </pre>
    </div>
  )
}