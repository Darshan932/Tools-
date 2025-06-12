import { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '../../../layouts/AdminLayout';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Mock categories
const categories = [
  { id: 'writing', name: 'Writing' },
  { id: 'design', name: 'Design' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'education', name: 'Education' },
  { id: 'finance', name: 'Finance' },
  { id: 'resume', name: 'Resume Building' },
  { id: 'image', name: 'Image Editing' },
  { id: 'voice', name: 'Voice Tools' },
  { id: 'pdf', name: 'PDF Tools' },
  { id: 'file', name: 'File Conversion' },
];

// Mock input types
const inputTypes = [
  { id: 'text', name: 'Text Input' },
  { id: 'file', name: 'File Upload' },
  { id: 'image', name: 'Image Upload' },
  { id: 'audio', name: 'Audio Upload' },
  { id: 'video', name: 'Video Upload' },
  { id: 'none', name: 'No Input Required' },
];

// Mock output types
const outputTypes = [
  { id: 'text', name: 'Text Output' },
  { id: 'file', name: 'File Download' },
  { id: 'image', name: 'Image Output' },
  { id: 'audio', name: 'Audio Output' },
  { id: 'video', name: 'Video Output' },
];

// Mock tool data
const mockTools = {
  'new': {
    id: '',
    name: '',
    slug: '',
    description: '',
    category: 'writing',
    icon: 'DocumentTextIcon',
    inputType: 'text',
    outputType: 'text',
    inputPlaceholder: 'Enter your text here...',
    outputPlaceholder: 'Results will appear here...',
    instructions: '',
    examples: '',
    isActive: true,
    adPositions: ['top', 'middle', 'bottom'],
  },
  'text-summarizer': {
    id: 'text-summarizer',
    name: 'AI Text Summarizer',
    slug: 'text-summarizer',
    description: 'Quickly summarize long articles and documents into concise summaries',
    category: 'writing',
    icon: 'DocumentTextIcon',
    inputType: 'text',
    outputType: 'text',
    inputPlaceholder: 'Paste your long text here to summarize...',
    outputPlaceholder: 'Your summary will appear here...',
    instructions: 'Paste any long text, article, or document into the input field. The AI will generate a concise summary highlighting the key points.',
    examples: 'Example 1: News article\nExample 2: Research paper\nExample 3: Meeting notes',
    isActive: true,
    adPositions: ['top', 'bottom'],
  },
  'image-enhancer': {
    id: 'image-enhancer',
    name: 'AI Image Enhancer',
    slug: 'image-enhancer',
    description: 'Enhance and upscale your images with AI technology',
    category: 'image',
    icon: 'PhotoIcon',
    inputType: 'image',
    outputType: 'image',
    inputPlaceholder: 'Upload your image to enhance',
    outputPlaceholder: 'Your enhanced image will appear here',
    instructions: 'Upload any image you want to enhance. The AI will improve quality, remove noise, and increase resolution.',
    examples: 'Example 1: Low resolution photo\nExample 2: Blurry image\nExample 3: Old photograph',
    isActive: true,
    adPositions: ['top', 'middle', 'bottom'],
  },
};

export default function EditTool() {
  const router = useRouter();
  const { id } = router.query;
  const isNew = id === 'add';
  const editId = isNew ? 'new' : (id as string);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    category: 'writing',
    icon: 'DocumentTextIcon',
    inputType: 'text',
    outputType: 'text',
    inputPlaceholder: '',
    outputPlaceholder: '',
    instructions: '',
    examples: '',
    isActive: true,
    adPositions: ['top', 'middle', 'bottom'],
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
      if (!isAdmin) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, [router]);

  // Load tool data when ID is available
  useEffect(() => {
    if (editId && mockTools[editId as keyof typeof mockTools]) {
      setFormData(mockTools[editId as keyof typeof mockTools]);
    }
  }, [editId]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove consecutive hyphens
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug when name changes
    if (name === 'name' && (isNew || formData.slug === '')) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle ad position changes
  const handleAdPositionChange = (position: string) => {
    setFormData(prev => {
      const currentPositions = [...prev.adPositions];
      if (currentPositions.includes(position)) {
        return {
          ...prev,
          adPositions: currentPositions.filter(pos => pos !== position)
        };
      } else {
        return {
          ...prev,
          adPositions: [...currentPositions, position]
        };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // In a real application, you would send this data to your backend
    // For this demo, we'll simulate a successful save
    setTimeout(() => {
      setIsSaving(false);
      router.push('/admin/tools');
    }, 1000);
  };

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication check completes
  }

  return (
    <AdminLayout>
      <Head>
        <title>{isNew ? 'Add New Tool' : 'Edit Tool'} | Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <ArrowLeftIcon className="mr-1 h-5 w-5" aria-hidden="true" />
            Back to Tools
          </button>
        </div>

        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              {isNew ? 'Add New Tool' : `Edit Tool: ${formData.name}`}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
            {/* Basic Information */}
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Basic Information</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  General information about the tool.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tool Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    URL Slug *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      required
                      value={formData.slug}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">URL: /tools/{formData.slug || '[slug]'}</p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Brief description of what the tool does.</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category *
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Icon *
                  </label>
                  <div className="mt-1">
                    <select
                      id="icon"
                      name="icon"
                      required
                      value={formData.icon}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="DocumentTextIcon">Document Text</option>
                      <option value="PhotoIcon">Photo</option>
                      <option value="CodeBracketIcon">Code</option>
                      <option value="DocumentIcon">Document</option>
                      <option value="MicrophoneIcon">Microphone</option>
                      <option value="DocumentDuplicateIcon">Document Duplicate</option>
                      <option value="CurrencyDollarIcon">Currency Dollar</option>
                      <option value="AcademicCapIcon">Academic Cap</option>
                      <option value="ClockIcon">Clock</option>
                      <option value="ChatBubbleLeftRightIcon">Chat</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="flex items-center">
                    <input
                      id="isActive"
                      name="isActive"
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Active (visible on website)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Configuration */}
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Tool Configuration</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Configure how the tool works and what inputs/outputs it uses.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="inputType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Input Type *
                  </label>
                  <div className="mt-1">
                    <select
                      id="inputType"
                      name="inputType"
                      required
                      value={formData.inputType}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {inputTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="outputType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Output Type *
                  </label>
                  <div className="mt-1">
                    <select
                      id="outputType"
                      name="outputType"
                      required
                      value={formData.outputType}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {outputTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="inputPlaceholder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Input Placeholder
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="inputPlaceholder"
                      id="inputPlaceholder"
                      value={formData.inputPlaceholder}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="outputPlaceholder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Output Placeholder
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="outputPlaceholder"
                      id="outputPlaceholder"
                      value={formData.outputPlaceholder}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Instructions
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="instructions"
                      name="instructions"
                      rows={4}
                      value={formData.instructions}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Instructions for how to use the tool.</p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="examples" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Examples
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="examples"
                      name="examples"
                      rows={4}
                      value={formData.examples}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Example use cases for the tool (one per line).</p>
                </div>
              </div>
            </div>

            {/* AdSense Configuration */}
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">AdSense Configuration</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Configure where ads should appear on this tool's page.
                </p>
              </div>

              <div className="mt-6">
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">Ad Positions</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="ad-top"
                        name="ad-top"
                        type="checkbox"
                        checked={formData.adPositions.includes('top')}
                        onChange={() => handleAdPositionChange('top')}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="ad-top" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        Top of page (above tool)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="ad-middle"
                        name="ad-middle"
                        type="checkbox"
                        checked={formData.adPositions.includes('middle')}
                        onChange={() => handleAdPositionChange('middle')}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="ad-middle" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        Middle of page (between input and output)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="ad-bottom"
                        name="ad-bottom"
                        type="checkbox"
                        checked={formData.adPositions.includes('bottom')}
                        onChange={() => handleAdPositionChange('bottom')}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="ad-bottom" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        Bottom of page (below tool)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="ad-sidebar"
                        name="ad-sidebar"
                        type="checkbox"
                        checked={formData.adPositions.includes('sidebar')}
                        onChange={() => handleAdPositionChange('sidebar')}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="ad-sidebar" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        Sidebar (on desktop)
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : (isNew ? 'Create Tool' : 'Save Changes')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}