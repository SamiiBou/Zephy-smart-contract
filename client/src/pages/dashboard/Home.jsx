import Card from "../../components/layouts/Card";

export default function Home() {
  return (
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <section id="overview" className="mb-8">
          <div className="mb-4 bg-black p-4 rounded text-white">
            <h1 className="font-bold text-lg">Welcome User 👋</h1>
            <p className="text-gray-100">
              Here are the basic information about your account.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Wallet Balance">10,000</Card>
            <Card title="Total Invoices">10,000</Card>
            <Card title="Total Credit Score">10</Card>
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
