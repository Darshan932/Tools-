import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '../../layouts/AdminLayout';
import AnalyticsChart from '../../components/admin/AnalyticsChart';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

// Mock data for analytics
const mockUsageData = [
  { date: '2023-05-01', usage: 3245 },
  { date: '2023-05-02', usage: 3532 },
  { date: '2023-05-03', usage: 4352 },
  { date: '2023-05-04', usage: 4123 },
  { date: '2023-05-05', usage: 5214 },
  { date: '2023-05-06', usage: 4532 },
  { date: '2023-05-07', usage: 4678 },
  { date: '2023-05-08', usage: 5432 },
  { date: '2023-05-09', usage: 6543 },
  { date: '2023-05-10', usage: 7654 },
  { date: '2023-05-11', usage: 8765 },
  { date: '2023-05-12', usage: 7654 },
  { date: '2023-05-13', usage: 8765 },
  { date: '2023-05-14', usage: 9876 },
  { date: '2023-05-15', usage: 10987 },
];

const mockCategoryData = [
  { category: 'Writing', usage: 32456, change: 12.5 },
  { category: 'Design', usage: 28765, change: 8.3 },
  { category: 'Productivity', usage: 24321, change: 15.7 },
  { category: 'Education', usage: 18765, change: -3.2 },
  { category: 'Finance', usage: 12345, change: 5.6 },
  { category: 'Resume Building', usage: 9876, change: 22.4 },
  { category: 'Image Editing', usage: 8765, change: 18.9 },
  { category: 'Voice Tools', usage: 7654, change: 7.8 },
  { category: 'PDF Tools', usage: 6543, change: -1.5 },
  { category: 'File Conversion', usage: 5432, change: 9.2 },
];

const mockTopTools = [
  { name: 'AI Text Summarizer', category: 'Writing', usage: 12345 },
  { name: 'Image Enhancer', category: 'Image Editing', usage: 10987 },
  { name: 'PDF to Word Converter', category: 'PDF Tools', usage: 9876 },
  { name: 'Resume Builder', category: 'Resume Building', usage: 8765 },
  { name: 'Voice Transcriber', category: 'Voice Tools', usage: 7654 },
  { name: 'Grammar Checker', category: 'Writing', usage: 6543 },
  { name: 'Code Generator', category: 'Productivity', usage: 5432 },
  { name: 'Budget Planner', category: 'Finance', usage: 4321 },
  { name: 'Study Notes Generator', category: 'Education', usage: 3210 },
  { name: 'Logo Creator', category: 'Design', usage: 2109 },
];

const timeRanges = [
  { id: 'today', name: 'Today' },
  { id: '7days', name: 'Last 7 Days' },
  { id: '30days', name: 'Last 30 Days' },
  { id: '90days', name: 'Last 90 Days' },
  { id: 'year', name: 'Last Year' },
  { id: 'all', name: 'All Time' },
];

export default function Analytics() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  
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

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication check completes
  }

  // Calculate total usage
  const totalUsage = mockUsageData.reduce((sum, day) => sum + day.usage, 0);
  
  // Calculate percentage change (comparing last day to first day)
  const firstDayUsage = mockUsageData[0].usage;
  const lastDayUsage = mockUsageData[mockUsageData.length - 1].usage;
  const percentageChange = ((lastDayUsage - firstDayUsage) / firstDayUsage) * 100;

  return (
    <AdminLayout>
      <Head>
        <title>Analytics | Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Track usage statistics and performance metrics for your AI tools.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <select
              id="timeRange"
              name="timeRange"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-700 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Usage */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                  <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Usage</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{totalUsage.toLocaleString()}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <div className="font-medium text-primary-600 dark:text-primary-400 flex items-center">
                  {percentageChange >= 0 ? (
                    <>
                      <ArrowUpIcon className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-green-500">{percentageChange.toFixed(1)}% increase</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownIcon className="h-4 w-4 mr-1 text-red-500" />
                      <span className="text-red-500">{Math.abs(percentageChange).toFixed(1)}% decrease</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Average Daily Usage */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary-100 dark:bg-secondary-900 rounded-md p-3">
                  <svg className="h-6 w-6 text-secondary-600 dark:text-secondary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Average Daily Usage</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {Math.round(totalUsage / mockUsageData.length).toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <div className="font-medium text-secondary-600 dark:text-secondary-400">
                  Based on {mockUsageData.length} days
                </div>
              </div>
            </div>
          </div>

          {/* Active Tools */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Tools</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">412</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <Link href="/admin/tools" className="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
                  View all tools
                </Link>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-md p-3">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Users</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">15,783</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <div className="font-medium text-blue-600 dark:text-blue-400 flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500">8.2% increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Chart */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Usage Over Time</h3>
            <div className="mt-2 h-80">
              <AnalyticsChart data={mockUsageData} />
            </div>
          </div>
        </div>

        {/* Category Usage and Top Tools */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Category Usage */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Usage by Category</h3>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockCategoryData.map((category) => (
                    <li key={category.category} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{category.category}</p>
                        </div>
                        <div className="ml-3 flex items-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mr-4">{category.usage.toLocaleString()} uses</p>
                          <div className={`flex items-center text-sm ${category.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {category.change >= 0 ? (
                              <ArrowUpIcon className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownIcon className="h-4 w-4 mr-1" />
                            )}
                            {Math.abs(category.change)}%
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(category.usage / mockCategoryData[0].usage) * 100}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Top Tools */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Top Tools</h3>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockTopTools.map((tool, index) => (
                    <li key={tool.name} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                            {index + 1}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{tool.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{tool.usage.toLocaleString()}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link href="/admin/tools" className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  View all tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

import Link from 'next/link';