import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Import AdSense component
import AdSense from '@/components/ads/AdSense';

// Mock data for tools (same as in categories page)
const allTools = [
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: 'Automatically summarize long articles and documents',
    category: 'writing',
    icon: '📝',
  },
  {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    description: 'Check and correct grammar, spelling, and punctuation',
    category: 'writing',
    icon: '✏️',
  },
  {
    id: 'content-generator',
    name: 'Content Generator',
    description: 'Generate blog posts, articles, and social media content',
    category: 'writing',
    icon: '📰',
  },
  {
    id: 'image-enhancer',
    name: 'Image Enhancer',
    description: 'Improve image quality and resolution with AI',
    category: 'design',
    icon: '🖼️',
  },
  {
    id: 'logo-maker',
    name: 'Logo Maker',
    description: 'Create professional logos for your brand',
    category: 'design',
    icon: '🎨',
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove backgrounds from images with one click',
    category: 'design',
    icon: '✂️',
  },
  {
    id: 'code-generator',
    name: 'Code Generator',
    description: 'Generate code snippets from natural language',
    category: 'productivity',
    icon: '💻',
  },
  {
    id: 'task-manager',
    name: 'Task Manager',
    description: 'Organize and prioritize your tasks with AI assistance',
    category: 'productivity',
    icon: '📋',
  },
  {
    id: 'email-writer',
    name: 'Email Writer',
    description: 'Generate professional emails for various purposes',
    category: 'productivity',
    icon: '📧',
  },
  // More tools...
];

// Categories mapping
const categories = {
  writing: 'Writing',
  design: 'Design',
  productivity: 'Productivity',
  'file-conversion': 'File Conversion',
  education: 'Education',
  finance: 'Finance',
  'resume-building': 'Resume Building',
  'image-editing': 'Image Editing',
  'voice-tools': 'Voice Tools',
  'pdf-tools': 'PDF Tools',
};

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allTools>([]);

  // Update search query when URL parameter changes
  useEffect(() => {
    if (q && typeof q === 'string') {
      setSearchQuery(q);
      performSearch(q);
    }
  }, [q]);

  // Perform search
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = allTools.filter(tool =>
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Group results by category
  const groupedResults = searchResults.reduce<Record<string, typeof allTools>>((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <>
      <Head>
        <title>Search Results for "{q}" | AI Tools</title>
        <meta name="description" content={`Search results for "${q}" on AI Tools. Find the best AI tools for your needs.`} />
        <meta name="robots" content="noindex" />
      </Head>

      {/* Top AdSense */}
      <AdSense slot="top-ad" />

      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Search Results {q ? `for "${q}"` : ''}
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {searchResults.length > 0
            ? `Found ${searchResults.length} tools matching your search.`
            : 'No tools found matching your search.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search for tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 py-2 h-12 w-full"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-2.5 btn btn-primary py-1.5 px-4 rounded-md"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Middle AdSense */}
      <AdSense slot="middle-ad" />

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <div className="mb-12 space-y-12">
          {/* Results grouped by category */}
          {Object.entries(groupedResults).map(([category, tools]) => (
            <div key={category} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <span>{categories[category as keyof typeof categories]} Tools</span>
                <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-2.5 py-0.5">
                  {tools.length}
                </span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="card hover:shadow-md transition-shadow p-6 flex flex-col h-full"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{tool.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 flex-grow">{tool.description}</p>
                    <div className="mt-4">
                      <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">Try it &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : q ? (
        <div className="text-center py-12 mb-12">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No tools found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find any tools matching your search. Try different keywords or browse our categories.
          </p>
          <Link href="/categories/all" className="btn btn-primary py-2 px-4 rounded-md">
            Browse All Tools
          </Link>
        </div>
      ) : null}

      {/* Popular Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.entries(categories).slice(0, 8).map(([key, name]) => (
            <Link
              key={key}
              href={`/categories/${key}`}
              className="card hover:shadow-md transition-shadow p-4 text-center"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">{name} Tools</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom AdSense */}
      <AdSense slot="bottom-ad" />
    </>
  );
}