import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '../../layouts/AdminLayout';

export default function Settings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'AI Tools',
    siteDescription: 'Discover 400+ useful AI tools for daily tasks across various categories',
    siteUrl: 'https://www.aitools-example.com',
    logoUrl: '/logo.svg',
    faviconUrl: '/favicon.ico',
    primaryColor: '#0ea5e9',
    secondaryColor: '#8b5cf6',
    googleAnalyticsId: 'UA-XXXXXXXXX-X',
    metaKeywords: 'ai tools, artificial intelligence, productivity tools, writing tools, design tools',
    enableDarkMode: true,
    defaultTheme: 'system',
    showCookieBanner: true,
    enableSearchSuggestions: true,
    toolsPerPage: 12,
    featuredToolsCount: 6,
    enableSocialSharing: true,
    enableNewsletter: false,
    footerText: '© 2023 AI Tools. All rights reserved.',
    customCss: '',
    customJs: '',
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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // In a real application, you would send this data to your backend
    // For this demo, we'll simulate a successful save
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication check completes
  }

  return (
    <AdminLayout>
      <Head>
        <title>Settings | Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Configure your website settings and preferences.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
          {/* General Settings */}
          <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">General Settings</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Basic information about your website.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Site Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="siteName"
                      id="siteName"
                      value={settings.siteName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Site Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="siteDescription"
                      name="siteDescription"
                      rows={3}
                      value={settings.siteDescription}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Site URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      name="siteUrl"
                      id="siteUrl"
                      value={settings.siteUrl}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Logo URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="logoUrl"
                      id="logoUrl"
                      value={settings.logoUrl}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Favicon URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="faviconUrl"
                      id="faviconUrl"
                      value={settings.faviconUrl}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Appearance</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Customize the look and feel of your website.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Primary Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      name="primaryColor"
                      id="primaryColor"
                      value={settings.primaryColor}
                      onChange={handleChange}
                      className="h-8 w-8 rounded-md border-gray-300 dark:border-gray-700 mr-2"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={handleChange}
                      name="primaryColor"
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Secondary Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      name="secondaryColor"
                      id="secondaryColor"
                      value={settings.secondaryColor}
                      onChange={handleChange}
                      className="h-8 w-8 rounded-md border-gray-300 dark:border-gray-700 mr-2"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={handleChange}
                      name="secondaryColor"
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="defaultTheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Default Theme
                  </label>
                  <div className="mt-1">
                    <select
                      id="defaultTheme"
                      name="defaultTheme"
                      value={settings.defaultTheme}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="flex items-center h-full">
                    <input
                      id="enableDarkMode"
                      name="enableDarkMode"
                      type="checkbox"
                      checked={settings.enableDarkMode}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="enableDarkMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Enable Dark Mode Toggle
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">SEO Settings</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Optimize your website for search engines.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Meta Keywords
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="metaKeywords"
                      id="metaKeywords"
                      value={settings.metaKeywords}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Comma-separated keywords for SEO.</p>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="googleAnalyticsId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Google Analytics ID
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="googleAnalyticsId"
                      id="googleAnalyticsId"
                      value={settings.googleAnalyticsId}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Website Features */}
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Website Features</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Enable or disable various features on your website.
                </p>
              </div>

              <div className="mt-6 space-y-6">
                <div className="flex items-center">
                  <input
                    id="showCookieBanner"
                    name="showCookieBanner"
                    type="checkbox"
                    checked={settings.showCookieBanner}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="showCookieBanner" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                    Show Cookie Consent Banner
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="enableSearchSuggestions"
                    name="enableSearchSuggestions"
                    type="checkbox"
                    checked={settings.enableSearchSuggestions}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="enableSearchSuggestions" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                    Enable Search Suggestions
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="enableSocialSharing"
                    name="enableSocialSharing"
                    type="checkbox"
                    checked={settings.enableSocialSharing}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="enableSocialSharing" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                    Enable Social Sharing Buttons
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="enableNewsletter"
                    name="enableNewsletter"
                    type="checkbox"
                    checked={settings.enableNewsletter}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="enableNewsletter" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                    Enable Newsletter Signup
                  </label>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="toolsPerPage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tools Per Page
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="toolsPerPage"
                      id="toolsPerPage"
                      min="4"
                      max="48"
                      value={settings.toolsPerPage}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="featuredToolsCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Featured Tools Count
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="featuredToolsCount"
                      id="featuredToolsCount"
                      min="0"
                      max="12"
                      value={settings.featuredToolsCount}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Settings */}
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Footer Settings</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Configure your website footer.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="footerText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Footer Text
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="footerText"
                      id="footerText"
                      value={settings.footerText}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Advanced Settings</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Advanced configuration options for developers.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="customCss" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom CSS
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="customCss"
                      name="customCss"
                      rows={4}
                      value={settings.customCss}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Custom CSS to be applied to the website.</p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="customJs" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom JavaScript
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="customJs"
                      name="customJs"
                      rows={4}
                      value={settings.customJs}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Custom JavaScript to be included in the website.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}