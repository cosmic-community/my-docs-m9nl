# My Docs

![App Preview](https://imgix.cosmicjs.com/40d32530-685e-11f1-a3fb-c522ad0b5889-autopilot-photo-1555066931-4365d14bab8c-1781488944706.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern documentation site built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). My Docs organizes documentation into sections and articles, displays version-aware code samples, and provides a clean, searchable changelog — all powered by your existing Cosmic content.

## Features

- 📚 **Organized Sections** — Documentation grouped into ordered sections for intuitive navigation
- 📄 **Rich Articles** — Markdown content with summaries, version tags, and linked code samples
- 💻 **Syntax-Highlighted Code Samples** — Language-aware code blocks rendered beautifully
- 📋 **Changelog** — Version history with release dates, change types, and details
- 🔍 **Sidebar Navigation** — Section-based sidebar with live article listings
- 🎨 **Modern, Responsive Design** — Looks great on desktop, tablet, and mobile
- ⚡ **Server-Side Rendering** — Fast initial loads powered by Next.js App Router

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6a2f5ce8e9c9a40ac3577250&clone_repository=6a2f5dd9a9e7c57c894df13c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a documentation site with documentation pages organized by section, version info, and a changelog.
>
> User instructions: A documentation site with sections, articles, a changelog, and code samples"

### Code Generation Prompt

> Build a Next.js application for a content management system called "My Docs". The content is managed in Cosmic CMS with the following object types: sections, code-samples, articles, changelog-entries. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A documentation site with sections, articles, a changelog, and code samples

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **[Cosmic](https://www.cosmicjs.com/docs)** — Headless CMS

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh)
- A Cosmic account with the `My Docs` content model

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set the following environment variables (provided automatically when cloning in Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all sections, ordered
const { objects: sections } = await cosmic.objects
  .find({ type: 'sections' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single article with its linked section and code sample
const { object: article } = await cosmic.objects
  .findOne({ type: 'articles', slug: 'getting-started' })
  .depth(1)

// Fetch changelog entries
const { objects: entries } = await cosmic.objects
  .find({ type: 'changelog-entries' })
  .props(['id', 'slug', 'title', 'metadata'])
```

## Cosmic CMS Integration

This app integrates with four Cosmic object types:

- **Sections** (`sections`) — `name`, `description`, `order`
- **Articles** (`articles`) — `title`, `summary`, `content`, `section`, `code_sample`, `version`, `order`
- **Code Samples** (`code-samples`) — `name`, `language`, `code`
- **Changelog Entries** (`changelog-entries`) — `version`, `release_date`, `type`, `details`

All data is fetched server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with `depth(1)` to resolve connected objects like an article's section and code sample.

## Deployment Options

### Vercel

1. Push to GitHub
2. Import into [Vercel](https://vercel.com)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify

1. Push to GitHub
2. Import into [Netlify](https://netlify.com)
3. Add the environment variables
4. Deploy

<!-- README_END -->