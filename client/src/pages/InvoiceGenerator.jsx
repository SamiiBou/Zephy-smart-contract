import { useState } from "react";
import TextInput from "../components/ui/TextInput";
import logo from "../assets/logo.short.png";
import Button from "../components/ui/Button";

const InvoiceGenerator = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    date: "",
    dueDate: "",
    from: "",
    to: "",
    items: [{ description: "", quantity: 1, price: 0 }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];
    updatedItems[index][field] = value;
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-6 font-orbitron">
          Invoice Generator
        </h2>
        <form className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="rounded-full bg-[#47227f] p-3 flex items-center justify-center">
              <img src={logo} className="w-12 h-12 object-contain" alt="Logo" />
            </div>
            <div className="flex flex-col items-end">
              <label className="block mb-1 font-orbitron">Invoice Number</label>
              <TextInput
                type="text"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <div className="space-y-2">
            {" "}
            {/* Reduced space between label-input pairs */}
            <div className="flex justify-between">
              <label className="block mb-0.5 font-orbitron">Your details</label>{" "}
              {/* Reduced bottom margin */}
              <label className="block mb-0.5 font-orbitron">Bill to</label>{" "}
              {/* Reduced bottom margin */}
            </div>
            <div className="flex justify-between items-center space-x-4">
              {" "}
              {/* Added space between inputs */}
              <div className="flex-1">
                <TextInput
                  name="from"
                  value={invoiceData.from}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                />
              </div>
              <div className="flex-1">
                <TextInput
                  name="to"
                  value={invoiceData.to}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-4">
            <div className="flex-1">
              <label className="block mb-1 text-left font-orbitron">
                Date issued
              </label>
              <input
                type="date"
                name="date"
                value={invoiceData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-right">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={invoiceData.dueDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="pt-8">
            <div className="space-y-2 bg-white rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2 font-orbitron">
                Items
              </h3>
              {invoiceData.items.map((item, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="flex-grow p-2 border rounded"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                    placeholder="Qty"
                    className="w-20 p-2 border rounded"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                    placeholder="Price"
                    className="w-24 p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className=" text-[#47227f] w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={addItem}
                  className="bg-[#47227f] text-white w-12 h-12 rounded-full flex items-center justify-center"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
          {/* Items section */}
        </form>
      </div>
      {/* Preview Section */}
      <div className=" w-full md:w-1/2 p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6 font-orbitron">
          Invoice Preview
        </h2>
        <div className="w-full max-w-xl pt-16">
          {/* Logo and Invoice Number */}
          <div className="flex justify-between items-center mb-8">
            <div className="rounded-full bg-[#47227f] p-2 flex items-center justify-center">
              <img src={logo} className="w-12 h-12 object-contain" alt="Logo" />
            </div>
            <div className="text-xl font-orbitron">
              Invoice #{invoiceData.invoiceNumber}
            </div>
          </div>

          {/* Sender, Receiver, and Date */}
          <div className="flex flex-col sm:flex-row justify-between mb-8 font-inter px-2">
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold font-inter">From:</p>
              <p className="font-inter whitespace-pre-line">
                {invoiceData.from}
              </p>
            </div>
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold font-inter">To:</p>
              <p className="font-inter whitespace-pre-line">{invoiceData.to}</p>
            </div>
            <div>
              <p className="font-semibold font-inter">Date:</p>
              <p className="font-inter">{invoiceData.date}</p>
              <p className="font-semibold font-inter">Due Date:</p>
              <p className="font-inter">{invoiceData.dueDate}</p>
            </div>
          </div>

          {/* Main container for invoice details */}
          <div className="bg-white rounded-lg ">
            {/* Invoice Details */}
            <div className="border rounded-lg p-4 mb-8">
              <div className="grid grid-cols-4 gap-4 border-b pb-2 mb-2">
                <span className="font-semibold">Description</span>
                <span className="font-semibold text-right">Quantity</span>
                <span className="font-semibold text-right">Price</span>
                <span className="font-semibold text-right">Total</span>
              </div>
              {invoiceData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                  <span className="font-inter">{item.description}</span>
                  <span className="font-orbitron text-right">
                    {item.quantity}
                  </span>
                  <span className="font-orbitron text-right">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="font-orbitron text-right">
                    ${(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2">
                <span>Total</span>
                <span className="font-orbitron">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Button */}
            <div className="text-center">
              <button className="bg-[#47227f]/80 hover:bg-[#47227f] text-white font-bold py-2 px-4 rounded">
                Generate Payment link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full md:w-1/2 p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6">Invoice Preview</h2>
        <div className="border p-6 rounded shadow-lg">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Invoice</h3>
              <p>Invoice Number: {invoiceData.invoiceNumber}</p>
              <p>Date: {invoiceData.date}</p>
              <p>Due Date: {invoiceData.dueDate}</p>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">From:</h4>
            <p className="whitespace-pre-line">{invoiceData.from}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">To:</h4>
            <p className="whitespace-pre-line">{invoiceData.to}</p>
          </div>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left">Description</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">${item.price.toFixed(2)}</td>
                  <td className="text-right">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right">
            <p className="font-semibold">
              Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default InvoiceGenerator;
