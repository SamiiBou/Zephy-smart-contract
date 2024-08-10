import { useLoaderData } from "react-router-dom";
import logo  from "../assets/logo.svg"

export async function Loader({ params }) {
  return params.ref + 677;
}

export default function Invoice() {
  const ref = useLoaderData();
  const invoiceData = {
    invoiceNumber: 'INV-2023-001',
    senderEmail: 'sender@example.com',
    receiverEmail: 'receiver@example.com',
    date: '2023-08-10',
    description: 'Web Development Services',
    amount: 1000,
    tax: 100,
  };

  const subtotal = invoiceData.amount;
  const total = subtotal + invoiceData.tax;

  return (
   
    <div className="flex justify-center  min-h-screen">
    <div className="w-full max-w-xl pt-16">
      {/* Logo and Invoice Number */}
      <div className="flex justify-between items-center mb-8">
        <img src={logo} className="w-12"/>
        <div className="text-xl font-orbitron">Invoice #{invoiceData.invoiceNumber}</div>
      </div>
  
      {/* Sender, Receiver, and Date */}
      <div className="flex flex-col sm:flex-row justify-between mb-8 font-inter">
        <div className="mb-4 sm:mb-0">
          <p className="font-semibold font-inter">From:</p>
          <p className="font-inter">{invoiceData.senderEmail}</p>
          <div className="mb-4 sm:mb-0">
          <p className="font-semibold font-inter">To:</p>
          <p className="font-inter">{invoiceData.receiverEmail}</p>
        </div>
        </div>
       
        <div>
          <p className="font-semibold font-inter">Date:</p>
          <p className="font-inter">{invoiceData.date}</p>
        </div>
      </div>
  
      {/* Main container for invoice details */}
      <div className="bg-white rounded-lg p-8">
        {/* Invoice Details */}
        <div className="border rounded-lg p-4 mb-8">
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="font-semibold">Description</span>
            <span className="font-semibold">Amount</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-inter">{invoiceData.description}</span>
            <span className="font-orbitron">${invoiceData.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-b pt-2 pb-2 mb-2">
            <span className="font-semibold font-inter">Subtotal</span>
            <span className="font-orbitron">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pt-2 pb-2 mb-2">
            <span className="font-semibold">Tax</span>
            <span className="font-orbitron">${invoiceData.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2 ">
            <span>Total</span>
            <span className="font-orbitron">${total.toFixed(2)}</span>
          </div>
        </div>
  
        {/* Payment Button */}
        <div className="text-center">
          <button className="bg-[#47227f]/80 hover:bg-[#47227f] text-white font-bold py-2 px-4 rounded">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  </div>
    );
}
