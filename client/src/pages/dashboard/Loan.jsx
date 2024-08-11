import Card from "../../components/layouts/Card";
import DataTable from "../../components/ui/DataTable";

export default function Loan() {
  return (
    <main>
      <div>
        <Card title={"Total Loan Balance"}>20,000</Card>
      </div>
      <section>
        <DataTable
          data={[
            {
              date: new Date().toLocaleDateString(),
              amount: 10000,
              status: "Paid",
            },
          ]}
          headers={["Date", "Amount", "Status"]}
        />
      </section>
    </main>
  );
}
