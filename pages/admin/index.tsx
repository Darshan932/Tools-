import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  PlusIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

// Import components
import AdminLayout from '@/components/admin/AdminLayout';
import ToolsTable from '@/components/admin/ToolsTable';
import AnalyticsChart from '@/components/admin/AnalyticsChart';

// Mock data for analytics
const analyticsData = {
  totalTools: 412,
  totalUsers: 15783,
  totalViews: 124567,
  totalUsage: 78932,
  recentActivity: [
    { id: 1, action: 'Tool Added', name: 'AI Image Generator', date: '2023-10-15' },
    { id: 2, action: 'Tool Updated', name: 'Text Summarizer', date: '2023-10-14' },
    { id: 3, action: 'Tool Added', name: 'Voice Transcriber Pro', date: '2023-10-12' },
    { id: 4, action: 'Tool Updated', name: 'PDF Converter', date: '2023-10-10' },
    { id: 5, action: 'Tool Added', name: 'Resume Builder Plus', date: '2023-10-08' },
  ],
  popularTools: [
    { id: 'text-summarizer', name: 'Text Summarizer', usage: 12453 },
    { id: 'image-enhancer', name: 'Image Enhancer', usage: 9876 },
    { id: 'pdf-converter', name: 'PDF Converter', usage: 8765 },
    { id: 'voice-transcriber', name: 'Voice Transcriber', usage: 7654 },
    { id: 'code-generator', name: 'Code Generator', usage: 6543 },
  ],
  dailyUsage: [
    { date: '2023-10-01', usage: 2345 },
    { date: '2023-10-02', usage: 2456 },
    { date: '2023-10-03', usage: 2567 },
    { date: '2023-10-04', usage: 2678 },
    { date: '2023-10-05', usage: 2789 },
    { date: '2023-10-06', usage: 2890 },
    { date: '2023-10-07', usage: 3001 },
    { date: '2023-10-08', usage: 3112 },
    { date: '2023-10-09', usage: 3223 },
    { date: '2023-10-10', usage: 3334 },
    { date: '2023-10-11', usage: 3445 },
    { date: '2023-10-12', usage: 3556 },
    { date: '2023-10-13', usage: 3667 },
    { date: '2023-10-14', usage: 3778 },
    { date: '2023-10-15', usage: 3889 },
  ],
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  // Check if user is authenticated (mock implementation)
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard | AI Tools</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex flex-col space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link
              href="/admin/tools/new"
              className="btn btn-primary py-2 px-4 rounded-md flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add New Tool
            </Link>
            <Link
              href="/admin/settings"
              className="btn btn-outline py-2 px-4 rounded-md flex items-center"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-1" />
              Settings
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                <DocumentTextIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Tools</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{analyticsData.totalTools}</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-300">
                <UserGroupIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Users</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{analyticsData.totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                <ChartBarIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Views</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{analyticsData.totalViews}</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                <ArrowTrendingUpIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Usage</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{analyticsData.totalUsage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Usage Chart */}
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Daily Usage</h2>
            <div className="h-80">
              <AnalyticsChart data={analyticsData.dailyUsage} />
            </div>
          </div>

          {/* Popular Tools */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Popular Tools</h2>
            <div className="space-y-4">
              {analyticsData.popularTools.map((tool, index) => (
                <div key={tool.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400 w-6">{index + 1}</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{tool.name}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{tool.usage} uses</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity and Tools Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-primary-500 mt-1"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}: {activity.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Table */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Tools</h2>
              <Link
                href="/admin/tools"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <ToolsTable limit={5} />
          </div>
        </div>

        {/* AdSense Settings Preview */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AdSense Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Top Ad</h3>
              <div className="bg-gray-100 dark:bg-gray-800 h-16 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                728x90 Ad Unit
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Enabled on all pages</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Middle Ad</h3>
              <div className="bg-gray-100 dark:bg-gray-800 h-16 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                300x250 Ad Unit
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Enabled on tool pages only</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Bottom Ad</h3>
              <div className="bg-gray-100 dark:bg-gray-800 h-16 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                728x90 Ad Unit
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Enabled on all pages</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Link
              href="/admin/adsense"
              className="btn btn-outline py-2 px-4 rounded-md"
            >
              Manage AdSense Settings
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}