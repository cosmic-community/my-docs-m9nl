// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Section object
export interface Section extends CosmicObject {
  type: 'sections';
  metadata: {
    name?: string;
    description?: string;
    order?: number;
  };
}

// Code Sample object
export interface CodeSample extends CosmicObject {
  type: 'code-samples';
  metadata: {
    name?: string;
    language?: string;
    code?: string;
  };
}

// Article object
export interface Article extends CosmicObject {
  type: 'articles';
  metadata: {
    title?: string;
    summary?: string;
    content?: string;
    section?: Section;
    code_sample?: CodeSample;
    version?: string;
    order?: number;
  };
}

// Changelog type literal
export type ChangelogType = 'Added' | 'Changed' | 'Fixed' | 'Removed' | 'Deprecated' | 'Security';

// Changelog Entry object
export interface ChangelogEntry extends CosmicObject {
  type: 'changelog-entries';
  metadata: {
    version?: string;
    release_date?: string;
    type?: string;
    details?: string;
  };
}

// API response shape
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isSection(obj: CosmicObject): obj is Section {
  return obj.type === 'sections';
}

export function isArticle(obj: CosmicObject): obj is Article {
  return obj.type === 'articles';
}

export function isCodeSample(obj: CosmicObject): obj is CodeSample {
  return obj.type === 'code-samples';
}

export function isChangelogEntry(obj: CosmicObject): obj is ChangelogEntry {
  return obj.type === 'changelog-entries';
}