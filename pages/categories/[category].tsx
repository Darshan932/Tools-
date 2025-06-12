import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Import AdSense component
import AdSense from '@/components/ads/AdSense';

// Mock data for tools
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
  {
    id: 'pdf-converter',
    name: 'PDF Converter',
    description: 'Convert PDFs to various formats and vice versa',
    category: 'file-conversion',
    icon: '📄',
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert images between different formats',
    category: 'file-conversion',
    icon: '🖼️',
  },
  {
    id: 'video-converter',
    name: 'Video Converter',
    description: 'Convert videos to different formats and resolutions',
    category: 'file-conversion',
    icon: '🎬',
  },
  {
    id: 'flashcard-maker',
    name: 'Flashcard Maker',
    description: 'Create flashcards for effective studying',
    category: 'education',
    icon: '🗂️',
  },
  {
    id: 'quiz-generator',
    name: 'Quiz Generator',
    description: 'Generate quizzes from your study materials',
    category: 'education',
    icon: '❓',
  },
  {
    id: 'study-notes',
    name: 'Study Notes Generator',
    description: 'Generate concise study notes from textbooks and lectures',
    category: 'education',
    icon: '📚',
  },
  {
    id: 'budget-planner',
    name: 'Budget Planner',
    description: 'Plan and track your budget with AI assistance',
    category: 'finance',
    icon: '💰',
  },
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    description: 'Track your expenses and get insights on your spending',
    category: 'finance',
    icon: '💸',
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    description: 'Calculate returns on investments with different scenarios',
    category: 'finance',
    icon: '📈',
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    description: 'Create professional resumes with AI assistance',
    category: 'resume-building',
    icon: '📋',
  },
  {
    id: 'cover-letter-generator',
    name: 'Cover Letter Generator',
    description: 'Generate tailored cover letters for job applications',
    category: 'resume-building',
    icon: '✉️',
  },
  {
    id: 'linkedin-profile-optimizer',
    name: 'LinkedIn Profile Optimizer',
    description: 'Optimize your LinkedIn profile for better visibility',
    category: 'resume-building',
    icon: '👔',
  },
  {
    id: 'photo-editor',
    name: 'Photo Editor',
    description: 'Edit photos with AI-powered tools',
    category: 'image-editing',
    icon: '📷',
  },
  {
    id: 'image-colorizer',
    name: 'Image Colorizer',
    description: 'Add color to black and white images',
    category: 'image-editing',
    icon: '🎨',
  },
  {
    id: 'face-retoucher',
    name: 'Face Retoucher',
    description: 'Retouch facial features in photos',
    category: 'image-editing',
    icon: '👤',
  },
  {
    id: 'voice-transcriber',
    name: 'Voice Transcriber',
    description: 'Convert speech to text with high accuracy',
    category: 'voice-tools',
    icon: '🎤',
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to natural-sounding speech',
    category: 'voice-tools',
    icon: '🔊',
  },
  {
    id: 'voice-changer',
    name: 'Voice Changer',
    description: 'Change your voice with various effects',
    category: 'voice-tools',
    icon: '🎭',
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Merge multiple PDFs into one document',
    category: 'pdf-tools',
    icon: '📑',
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Split PDF documents into separate files',
    category: 'pdf-tools',
    icon: '✂️',
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Compress PDF files to reduce file size',
    category: 'pdf-tools',
    icon: '📦',
  },
];

// Categories mapping
const categories = {
  all: 'All Tools',
  writing: 'Writing Tools',
  design: 'Design Tools',
  productivity: 'Productivity Tools',
  'file-conversion': 'File Conversion Tools',
  education: 'Education Tools',
  finance: 'Finance Tools',
  'resume-building': 'Resume Building Tools',
  'image-editing': 'Image Editing Tools',
  'voice-tools': 'Voice Tools',
  'pdf-tools': 'PDF Tools',
};

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [searchQuery, setSearchQuery] = useState('');

  // Get category name
  const categoryName = category && typeof category === 'string' ? categories[category as keyof typeof categories] : 'All Tools';

  // Filter tools based on category
  const filteredTools = category === 'all' || !category
    ? allTools
    : allTools.filter(tool => tool.category === category);

  // Filter tools based on search query
  const searchedTools = searchQuery
    ? filteredTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredTools;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>{categoryName} | AI Tools</title>
        <meta name="description" content={`Discover our collection of ${categoryName.toLowerCase()} for various tasks and purposes.`} />
        <meta property="og:title" content={`${categoryName} | AI Tools`} />
        <meta property="og:description" content={`Discover our collection of ${categoryName.toLowerCase()} for various tasks and purposes.`} />
      </Head>

      {/* Top AdSense */}
      <AdSense slot="top-ad" />

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{categoryName}</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          {category === 'all' || !category
            ? 'Browse our complete collection of AI tools for various tasks and purposes.'
            : `Discover our collection of ${categoryName.toLowerCase()} designed to help you with various tasks.`}
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
              placeholder={`Search in ${categoryName.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 py-2 h-12 w-full"
            />
          </div>
        </form>
      </div>

      {/* Middle AdSense */}
      <AdSense slot="middle-ad" />

      {/* Tools Grid */}
      <div className="mb-12">
        {searchedTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchedTools.map((tool) => (
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No tools found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No tools match your search criteria. Try a different search term or browse all tools.
            </p>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse Other Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.entries(categories)
            .filter(([key]) => key !== category && key !== 'all')
            .map(([key, name]) => (
              <Link
                key={key}
                href={`/categories/${key}`}
                className="card hover:shadow-md transition-shadow p-4 text-center"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
              </Link>
            ))}
        </div>
      </div>

      {/* Bottom AdSense */}
      <AdSense slot="bottom-ad" />
    </>
  );
}