import { getCodeSamples } from '@/lib/cosmic'
import CodeBlock from '@/components/CodeBlock'

export default async function CodeSamplesPage() {
  const samples = await getCodeSamples()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">💻 Code Samples</h1>
        <p className="mt-2 text-gray-600">Ready-to-use snippets across the documentation.</p>
      </div>

      {samples.length === 0 ? (
        <p className="text-gray-500">No code samples available yet.</p>
      ) : (
        <div className="space-y-8">
          {samples.map((sample) => (
            <CodeBlock key={sample.id} sample={sample} />
          ))}
        </div>
      )}
    </div>
  )
}