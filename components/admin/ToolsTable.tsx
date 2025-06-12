import { useState } from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

// Mock data for tools
const allTools = [
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    category: 'writing',
    status: 'active',
    views: 12453,
    lastUpdated: '2023-10-10',
  },
  {
    id: 'image-enhancer',
    name: 'Image Enhancer',
    category: 'design',
    status: 'active',
    views: 9876,
    lastUpdated: '2023-10-08',
  },
  {
    id: 'code-generator',
    name: 'Code Generator',
    category: 'productivity',
    status: 'active',
    views: 6543,
    lastUpdated: '2023-10-05',
  },
  {
    id: 'pdf-converter',
    name: 'PDF Converter',
    category: 'file-conversion',
    status: 'active',
    views: 8765,
    lastUpdated: '2023-10-12',
  },
  {
    id: 'voice-transcriber',
    name: 'Voice Transcriber',
    category: 'voice-tools',
    status: 'active',
    views: 7654,
    lastUpdated: '2023-10-07',
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    category: 'resume-building',
    status: 'active',
    views: 5432,
    lastUpdated: '2023-10-03',
  },
  {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    category: 'writing',
    status: 'active',
    views: 4321,
    lastUpdated: '2023-10-01',
  },
  {
    id: 'logo-maker',
    name: 'Logo Maker',
    category: 'design',
    status: 'inactive',
    views: 3210,
    lastUpdated: '2023-09-28',
  },
  {
    id: 'task-manager',
    name: 'Task Manager',
    category: 'productivity',
    status: 'active',
    views: 2109,
    lastUpdated: '2023-09-25',
  },
  {
    id: 'flashcard-maker',
    name: 'Flashcard Maker',
    category: 'education',
    status: 'active',
    views: 1987,
    lastUpdated: '2023-09-22',
  },
];

interface ToolsTableProps {
  limit?: number;
}

const ToolsTable: React.FC<ToolsTableProps> = ({ limit }) => {
  const [tools, setTools] = useState(limit ? allTools.slice(0, limit) : allTools);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTools(tools.map(tool => tool.id));
    } else {
      setSelectedTools([]);
    }
  };

  const handleSelectTool = (id: string) => {
    if (selectedTools.includes(id)) {
      setSelectedTools(selectedTools.filter(toolId => toolId !== id));
    } else {
      setSelectedTools([...selectedTools, id]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      setTools(tools.filter(tool => tool.id !== id));
      setSelectedTools(selectedTools.filter(toolId => toolId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedTools.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedTools.length} selected tools?`)) {
      setTools(tools.filter(tool => !selectedTools.includes(tool.id)));
      setSelectedTools([]);
    }
  };

  const handleToggleStatus = (id: string) => {
    setTools(tools.map(tool => {
      if (tool.id === id) {
        return {
          ...tool,
          status: tool.status === 'active' ? 'inactive' : 'active',
        };
      }
      return tool;
    }));
  };

  return (
    <div>
      {/* Bulk actions */}
      {selectedTools.length > 0 && (
        <div className="mb-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {selectedTools.length} {selectedTools.length === 1 ? 'tool' : 'tools'} selected
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleBulkDelete}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                  checked={selectedTools.length === tools.length && tools.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Views
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {tools.map((tool) => (
              <tr key={tool.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    checked={selectedTools.includes(tool.id)}
                    onChange={() => handleSelectTool(tool.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{tool.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{tool.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white capitalize">
                    {tool.category.replace('-', ' ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStatus(tool.id)}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${tool.status === 'active'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                      }`}
                  >
                    {tool.status === 'active' ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {tool.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {tool.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/tools/${tool.id}`}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      target="_blank"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`/admin/tools/edit/${tool.id}`}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(tool.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (simplified) */}
      {!limit && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{tools.length}</span> of{' '}
            <span className="font-medium">{allTools.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-outline py-1 px-3 rounded-md text-sm" disabled>
              Previous
            </button>
            <button className="btn btn-outline py-1 px-3 rounded-md text-sm" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsTable;