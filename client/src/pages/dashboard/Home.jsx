import Card from "../../components/layouts/Card";
import Alert from "../../components/ui/Alert";
import DataTable from "../../components/ui/DataTable";

export default function Home() {
  return (
    <main className="flex-grow">
      <div className="container mx-auto py-6 sm:px-6 lg:px-8">
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
        <section>
          <Alert variant="warning">
            Your next due loan date is on 12/12/2023
          </Alert>
        </section>
        <section id="invoices" className="mb-8">
          <div className="">
            <DataTable
              label="Invoices"
              data={[]}
              headers={["SN", "Invoice ID", "Amount", "Status"]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
