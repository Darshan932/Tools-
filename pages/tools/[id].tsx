import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Import AdSense component
import AdSense from '@/components/ads/AdSense';

// Mock data for tools
const toolsData = {
  'text-summarizer': {
    name: 'Text Summarizer',
    description: 'Automatically summarize long articles and documents into concise summaries.',
    category: 'writing',
    icon: '📝',
    instructions: 'Paste your text below and click "Summarize" to generate a concise summary.',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    inputType: 'textarea',
    outputType: 'text',
  },
  'image-enhancer': {
    name: 'Image Enhancer',
    description: 'Improve image quality and resolution with AI technology.',
    category: 'design',
    icon: '🖼️',
    instructions: 'Upload an image to enhance its quality and resolution.',
    inputType: 'file',
    outputType: 'image',
  },
  'code-generator': {
    name: 'Code Generator',
    description: 'Generate code snippets from natural language descriptions.',
    category: 'productivity',
    icon: '💻',
    instructions: 'Describe what you want your code to do, and we\'ll generate it for you.',
    example: 'Create a function that calculates the Fibonacci sequence',
    inputType: 'textarea',
    outputType: 'code',
  },
  'pdf-converter': {
    name: 'PDF Converter',
    description: 'Convert PDFs to various formats and vice versa.',
    category: 'file-conversion',
    icon: '📄',
    instructions: 'Upload a PDF file to convert it to another format, or upload a file to convert it to PDF.',
    inputType: 'file',
    outputType: 'file',
  },
  'voice-transcriber': {
    name: 'Voice Transcriber',
    description: 'Convert speech to text with high accuracy.',
    category: 'voice-tools',
    icon: '🎤',
    instructions: 'Upload an audio file or record your voice to transcribe it to text.',
    inputType: 'audio',
    outputType: 'text',
  },
  'resume-builder': {
    name: 'Resume Builder',
    description: 'Create professional resumes with AI assistance.',
    category: 'resume-building',
    icon: '📋',
    instructions: 'Fill in your details and let our AI help you create a professional resume.',
    inputType: 'form',
    outputType: 'document',
  },
};

export default function ToolPage() {
  const router = useRouter();
  const { id } = router.query;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Get tool data based on ID
  const tool = id && typeof id === 'string' ? toolsData[id as keyof typeof toolsData] : null;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tool) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock output based on tool type
      switch (tool.outputType) {
        case 'text':
          setOutput(`Here is a summary of your text:\n\nThis is a concise summary of the input text that highlights the key points while maintaining the core message. The summary is about 25% of the original length.`);
          break;
        case 'code':
          setOutput(`function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\n// Example usage\nconst result = fibonacci(10);\nconsole.log(result); // 55`);
          break;
        default:
          setOutput('Processing complete! You can download the result below.');
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // If tool not found or still loading
  if (!tool) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading tool...</h1>
          <p>If this takes too long, the tool might not exist.</p>
          <Link href="/" className="text-primary-600 dark:text-primary-400 mt-4 inline-block">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{tool.name} | AI Tools</title>
        <meta name="description" content={tool.description} />
        <meta property="og:title" content={`${tool.name} | AI Tools`} />
        <meta property="og:description" content={tool.description} />
      </Head>

      {/* Top AdSense */}
      <AdSense slot="top-ad" />

      {/* Back button */}
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to All Tools
        </Link>
      </div>

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{tool.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300">{tool.description}</p>
        <div className="mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {tool.category.charAt(0).toUpperCase() + tool.category.slice(1).replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{tool.instructions}</p>
        {tool.example && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example:</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.example}</p>
          </div>
        )}
      </div>

      {/* Middle AdSense */}
      <AdSense slot="middle-ad" />

      {/* Tool Interface */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Try It Out</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Input Section */}
          <div className="mb-6">
            <label htmlFor="tool-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input
            </label>
            
            {/* Different input types based on tool */}
            {tool.inputType === 'textarea' && (
              <textarea
                id="tool-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tool.example || 'Enter your input here...'}
                className="input min-h-[200px] w-full"
                required
              />
            )}
            
            {(tool.inputType === 'file' || tool.inputType === 'audio') && (
              <div className="flex flex-col items-center justify-center w-full">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tool.inputType === 'audio' ? 'MP3, WAV, or M4A (MAX. 10MB)' : 'PDF, PNG, JPG, or GIF (MAX. 10MB)'}
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={tool.inputType === 'audio' ? 'audio/*' : 'image/*,application/pdf'}
                  />
                </label>
                {file && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary py-2 px-6 rounded-md"
              disabled={isProcessing || (!input && !file)}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Process ${tool.inputType === 'file' || tool.inputType === 'audio' ? 'File' : 'Input'}`
              )}
            </button>
          </div>
        </form>
        
        {/* Output Section */}
        {output && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Result:</h3>
            
            {tool.outputType === 'text' && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{output}</p>
              </div>
            )}
            
            {tool.outputType === 'code' && (
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                <pre className="font-mono text-sm">{output}</pre>
              </div>
            )}
            
            {(tool.outputType === 'file' || tool.outputType === 'document' || tool.outputType === 'image') && (
              <div className="flex flex-col items-center">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{output}</p>
                <button className="btn btn-outline py-2 px-4 rounded-md">
                  Download Result
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Tools */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(toolsData)
            .filter(([key, value]) => key !== id && value.category === tool.category)
            .slice(0, 3)
            .map(([key, value]) => (
              <Link
                key={key}
                href={`/tools/${key}`}
                className="card hover:shadow-md transition-shadow p-4 flex items-center"
              >
                <span className="text-2xl mr-3">{value.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{value.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{value.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Bottom AdSense */}
      <AdSense slot="bottom-ad" />
    </>
  );
}