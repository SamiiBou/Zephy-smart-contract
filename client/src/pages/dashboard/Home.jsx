export default function Home() {
  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <section id="overview" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Users
                </h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  10,000
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  $50,000
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Active Projects
                </h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900">25</p>
              </div>
            </div>
          </div>
        </section>
        <section id="analytics" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
          <div className="bg-white shadow rounded-lg p-6">
            {/* Add your charts or graphs here */}
          </div>
        </section>
      </div>
    </main>
  );
}
