import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Import AdSense component
import AdSense from '@/components/ads/AdSense';

// Mock data for popular tools
const popularTools = [
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: 'Automatically summarize long articles and documents',
    category: 'writing',
    icon: '📝',
  },
  {
    id: 'image-enhancer',
    name: 'Image Enhancer',
    description: 'Improve image quality and resolution with AI',
    category: 'design',
    icon: '🖼️',
  },
  {
    id: 'code-generator',
    name: 'Code Generator',
    description: 'Generate code snippets from natural language',
    category: 'productivity',
    icon: '💻',
  },
  {
    id: 'pdf-converter',
    name: 'PDF Converter',
    description: 'Convert PDFs to various formats and vice versa',
    category: 'file-conversion',
    icon: '📄',
  },
  {
    id: 'voice-transcriber',
    name: 'Voice Transcriber',
    description: 'Convert speech to text with high accuracy',
    category: 'voice-tools',
    icon: '🎤',
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    description: 'Create professional resumes with AI assistance',
    category: 'resume-building',
    icon: '📋',
  },
];

// Categories for filtering
const categories = [
  { name: 'All', value: 'all' },
  { name: 'Writing', value: 'writing' },
  { name: 'Design', value: 'design' },
  { name: 'Productivity', value: 'productivity' },
  { name: 'File Conversion', value: 'file-conversion' },
  { name: 'Education', value: 'education' },
  { name: 'Finance', value: 'finance' },
  { name: 'Resume Building', value: 'resume-building' },
  { name: 'Image Editing', value: 'image-editing' },
  { name: 'Voice Tools', value: 'voice-tools' },
  { name: 'PDF Tools', value: 'pdf-tools' },
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter tools based on category
  const filteredTools = selectedCategory === 'all'
    ? popularTools
    : popularTools.filter(tool => tool.category === selectedCategory);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Head>
        <title>AI Tools - 400+ Useful AI Tools for Daily Users</title>
        <meta name="description" content="Discover 400+ useful AI tools for writing, design, productivity, file conversion, and more. All tools are optimized for speed and ease of use." />
        <meta property="og:title" content="AI Tools - 400+ Useful AI Tools for Daily Users" />
        <meta property="og:description" content="Discover 400+ useful AI tools for writing, design, productivity, file conversion, and more. All tools are optimized for speed and ease of use." />
        <meta property="og:url" content="https://aitools-website.com" />
        <meta property="og:image" content="https://aitools-website.com/og-image.jpg" />
      </Head>

      {/* Top AdSense */}
      <AdSense slot="top-ad" />

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 rounded-lg mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            400+ AI Tools for Daily Use
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover powerful AI tools for writing, design, productivity, and more. All optimized for speed and ease of use.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search for tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 py-3 h-14 w-full text-lg"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-2.5 btn btn-primary py-2 px-4 rounded-md"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Category Filters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Middle AdSense */}
      <AdSense slot="middle-ad" />

      {/* Popular Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {selectedCategory === 'all' ? 'Popular Tools' : `${categories.find(c => c.value === selectedCategory)?.name} Tools`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
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
              <div className="mt-4 flex justify-between items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {categories.find(c => c.value === tool.category)?.name}
                </span>
                <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">Try it &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/categories/all"
            className="btn btn-outline py-2 px-4 rounded-md"
          >
            View All Tools
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Our AI Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Fast & Responsive</h3>
            <p className="text-gray-600 dark:text-gray-400">All tools are optimized for speed and work perfectly on both mobile and desktop devices.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Easy to Use</h3>
            <p className="text-gray-600 dark:text-gray-400">Clear input/output interfaces with examples make our tools intuitive for everyone.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Free to Use</h3>
            <p className="text-gray-600 dark:text-gray-400">Most of our tools are completely free to use with no registration required.</p>
          </div>
        </div>
      </section>

      {/* Bottom AdSense */}
      <AdSense slot="bottom-ad" />
    </>
  );
}