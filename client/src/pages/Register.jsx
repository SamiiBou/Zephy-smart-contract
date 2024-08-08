import Button from "../components/ui/Button"
import TextInput from "../components/ui/TextInput"
import { useState } from 'react';
import router from "../router";

export default function Register() {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    { title: "Easy Payments", description: "Send and receive money with just a few taps." },
    { title: "Quick Loans", description: "Access funds when you need them most." },
    { title: "Financial Insights", description: "Gain valuable insights into your spending habits." }
  ];
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value.trim()
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid. Submitting...', formData);
      // Here you would typically send the data to your server
      router.navigate("/select-avatar")
    } else {
      console.log('Form is invalid');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-6xl h-[600px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-[#47227f] font-orbitron">Register</h2>
          <div className="h-16"></div>
          <form className="space-y-4 flex flex-col">
            <TextInput label="Full Name" onChange={handleChange} name="fullName" value={formData.fullName} error={errors.fullName}/>
            <TextInput label="Email" type="email" onChange={handleChange} name="email" value={formData.email} error={errors.email} />
            <div className="h-28"></div>
            <Button className="w-full bg-[#47227f] text-white hover:bg-purple-700 font-inter" onClick={handleSubmit}>
              Continue with passkeys
            </Button>
          </form>
        </div>
        <div className="w-full md:w-1/2 bg-purple-50 flex flex-col justify-center p-8 ">
          <h1 className="text-3xl font-bold font-orbitron text-[#47227f] text-center pt-12 mb-6">Simplify Your Finances</h1>
          <p className="font-inter text-center text-gray-600 text-sm sm:text-base md:text-lg max-w-md mx-auto mb-12">
            Get more from your money. Create an account to effortlessly send and receive payments and access convenient loans.
          </p>

          {/* Carousel */}
          <div className="relative w-full max-w-md mx-auto pt-8">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${activeCard * 100}%)` }}>
                {cards.map((card, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold mb-2 text-[#47227f]">{card.title}</h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-4">
              {cards.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${index === activeCard ? 'bg-[#47227f]' : 'bg-purple-300'}`}
                  onClick={() => setActiveCard(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
