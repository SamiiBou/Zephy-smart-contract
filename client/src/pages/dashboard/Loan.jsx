const LoanApp = () => {
  // Sample data (replace with actual data from your backend)
  const loanData = {
    outstandingTotal: 50000,
    collectableTotal: 30000,
    creditScore: 720,
    transactions: [
      { id: 1, amount: 1000, date: "2024-08-01", status: "Paid" },
      { id: 2, amount: 1500, date: "2024-08-15", status: "Unpaid" },
      { id: 3, amount: 2000, date: "2024-09-01", status: "Paid" },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Balance</h2>
        <p className="mb-2">
          Outstanding Loan Total: ${loanData.outstandingTotal.toLocaleString()}
        </p>
        <p>Collectable Total: ${loanData.collectableTotal.toLocaleString()}</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Credit Score</h2>
        <div className="bg-gray-300 rounded-full h-4 w-full">
          <div
            className="bg-green-500 rounded-full h-4"
            style={{ width: `${(loanData.creditScore / 850) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2 text-center font-semibold">{loanData.creditScore}</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <ul>
          {loanData.transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
            >
              <span className="font-medium">
                ${transaction.amount.toLocaleString()}
              </span>
              <span className="text-gray-600">{transaction.date}</span>
              <span
                className={`font-semibold ${
                  transaction.status === "Paid"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoanApp;
