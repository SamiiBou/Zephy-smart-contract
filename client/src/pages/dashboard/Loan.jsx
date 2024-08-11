import Card from "../../components/layouts/Card";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import { FaPlus } from "react-icons/fa";

export default function Loan() {
  return (
    <main className="container mx-auto p-4">
      <div className="mb-3">
        <Card title={"Total Loan Balance"}>20,000</Card>
      </div>
      <section>
        <DataTable
          label={"Loan Transactions"}
          left={
            <div>
              <Button className="!py-2 flex flex-row gap-1 items-center">
                <FaPlus className="mr-2" />
                Take a loan
              </Button>{" "}
            </div>
          }
          data={[
            {
              sn: 1,
              date: new Date().toLocaleDateString(),
              amount: 10000,
              status: "Paid",
            },
          ]}
          headers={["SN", "Date", "Amount", "Status"]}
        />
      </section>
    </main>
  );
}
