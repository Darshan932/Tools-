import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '../../layouts/AdminLayout';

// Mock AdSense data
const mockAdUnits = [
  {
    id: 'ca-pub-1234567890-1',
    name: 'Top Banner (728x90)',
    size: '728x90',
    slot: '1234567890',
    position: 'top',
    active: true,
    impressions: 124567,
    clicks: 3245,
    revenue: 1245.67,
    ctr: 2.6,
  },
  {
    id: 'ca-pub-1234567890-2',
    name: 'Middle Rectangle (300x250)',
    size: '300x250',
    slot: '2345678901',
    position: 'middle',
    active: true,
    impressions: 98765,
    clicks: 2134,
    revenue: 987.65,
    ctr: 2.2,
  },
  {
    id: 'ca-pub-1234567890-3',
    name: 'Bottom Banner (728x90)',
    size: '728x90',
    slot: '3456789012',
    position: 'bottom',
    active: true,
    impressions: 76543,
    clicks: 1543,
    revenue: 765.43,
    ctr: 2.0,
  },
  {
    id: 'ca-pub-1234567890-4',
    name: 'Sidebar Rectangle (300x600)',
    size: '300x600',
    slot: '4567890123',
    position: 'sidebar',
    active: false,
    impressions: 54321,
    clicks: 987,
    revenue: 543.21,
    ctr: 1.8,
  },
];

export default function AdSenseSettings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adUnits, setAdUnits] = useState(mockAdUnits);
  const [publisherId, setPublisherId] = useState('ca-pub-1234567890');
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdUnit, setCurrentAdUnit] = useState<any>(null);
  
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

  // Toggle ad unit active status
  const toggleAdUnitStatus = (id: string) => {
    setAdUnits(adUnits.map(unit => 
      unit.id === id ? { ...unit, active: !unit.active } : unit
    ));
  };

  // Open edit modal
  const openEditModal = (adUnit: any) => {
    setCurrentAdUnit(adUnit);
    setIsEditing(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setCurrentAdUnit(null);
    setIsEditing(false);
  };

  // Save ad unit changes
  const saveAdUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAdUnit) return;

    setAdUnits(adUnits.map(unit => 
      unit.id === currentAdUnit.id ? currentAdUnit : unit
    ));
    closeEditModal();
  };

  // Handle input change for current ad unit
  const handleAdUnitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentAdUnit({
      ...currentAdUnit,
      [name]: value
    });
  };

  // Calculate total revenue
  const totalRevenue = adUnits.reduce((sum, unit) => sum + unit.revenue, 0);

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication check completes
  }

  return (
    <AdminLayout>
      <Head>
        <title>AdSense Settings | Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">AdSense Settings</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Manage your Google AdSense settings and ad units for your AI tools website.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => openEditModal({
                id: `ca-pub-${publisherId}-${adUnits.length + 1}`,
                name: '',
                size: '728x90',
                slot: '',
                position: 'top',
                active: true,
                impressions: 0,
                clicks: 0,
                revenue: 0,
                ctr: 0,
              })}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Ad Unit
            </button>
          </div>
        </div>

        {/* Publisher ID */}
        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Publisher Settings</h2>
          <div className="mt-4 max-w-xl">
            <label htmlFor="publisherId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              AdSense Publisher ID
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="publisherId"
                id="publisherId"
                value={publisherId}
                onChange={(e) => setPublisherId(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your Google AdSense Publisher ID. This will be used for all ad units on your website.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Ad Display Settings</h3>
            <div className="mt-2 space-y-4">
              <div className="flex items-center">
                <input
                  id="showAdsOnMobile"
                  name="showAdsOnMobile"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="showAdsOnMobile" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                  Show ads on mobile devices
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="respectDNT"
                  name="respectDNT"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="respectDNT" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                  Respect Do Not Track (DNT) settings
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="lazyLoad"
                  name="lazyLoad"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="lazyLoad" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                  Enable lazy loading for ads
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Summary</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Revenue</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</dd>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Impressions</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                  {adUnits.reduce((sum, unit) => sum + unit.impressions, 0).toLocaleString()}
                </dd>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Average CTR</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                  {(adUnits.reduce((sum, unit) => sum + unit.ctr, 0) / adUnits.length).toFixed(2)}%
                </dd>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Units Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Size
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Position
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Impressions
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Revenue
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {adUnits.map((adUnit) => (
                      <tr key={adUnit.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                          {adUnit.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {adUnit.size}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="capitalize">{adUnit.position}</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {adUnit.impressions.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          ${adUnit.revenue.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="flex items-center">
                            <button
                              onClick={() => toggleAdUnitStatus(adUnit.id)}
                              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${adUnit.active ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                            >
                              <span className="sr-only">Toggle ad unit</span>
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${adUnit.active ? 'translate-x-5' : 'translate-x-0'}`}
                              />
                            </button>
                            <span className="ml-3 text-gray-500 dark:text-gray-400">
                              {adUnit.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => openEditModal(adUnit)}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                          >
                            Edit<span className="sr-only">, {adUnit.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Unit Preview */}
        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Ad Unit Preview</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Preview how your ad units will appear on your website.
          </p>

          <div className="mt-6 space-y-8">
            {/* Top Banner Preview */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Banner (728x90)</h3>
              <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 flex items-center justify-center">
                <div className="bg-gray-100 dark:bg-gray-700 w-full h-[90px] max-w-[728px] flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                  728x90 Ad Unit
                </div>
              </div>
            </div>

            {/* Middle Rectangle Preview */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Middle Rectangle (300x250)</h3>
              <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 flex items-center justify-center">
                <div className="bg-gray-100 dark:bg-gray-700 w-[300px] h-[250px] flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                  300x250 Ad Unit
                </div>
              </div>
            </div>

            {/* Sidebar Rectangle Preview */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sidebar Rectangle (300x600)</h3>
              <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 flex items-center justify-center">
                <div className="bg-gray-100 dark:bg-gray-700 w-[300px] h-[600px] flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                  300x600 Ad Unit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Ad Unit Modal */}
      {isEditing && currentAdUnit && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {currentAdUnit.id.includes(`-${adUnits.length + 1}`) ? 'Add New Ad Unit' : 'Edit Ad Unit'}
                </h3>
                <form onSubmit={saveAdUnit} className="mt-5 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ad Unit Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={currentAdUnit.name}
                      onChange={handleAdUnitChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ad Size
                    </label>
                    <select
                      id="size"
                      name="size"
                      required
                      value={currentAdUnit.size}
                      onChange={handleAdUnitChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="728x90">728x90 - Leaderboard</option>
                      <option value="300x250">300x250 - Medium Rectangle</option>
                      <option value="300x600">300x600 - Large Rectangle</option>
                      <option value="320x100">320x100 - Mobile Banner</option>
                      <option value="336x280">336x280 - Large Rectangle</option>
                      <option value="responsive">Responsive</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="slot" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ad Slot ID
                    </label>
                    <input
                      type="text"
                      name="slot"
                      id="slot"
                      required
                      value={currentAdUnit.slot}
                      onChange={handleAdUnitChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Position
                    </label>
                    <select
                      id="position"
                      name="position"
                      required
                      value={currentAdUnit.position}
                      onChange={handleAdUnitChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="top">Top</option>
                      <option value="middle">Middle</option>
                      <option value="bottom">Bottom</option>
                      <option value="sidebar">Sidebar</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="active"
                      name="active"
                      type="checkbox"
                      checked={currentAdUnit.active}
                      onChange={(e) => setCurrentAdUnit({ ...currentAdUnit, active: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="active" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                      Active
                    </label>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}