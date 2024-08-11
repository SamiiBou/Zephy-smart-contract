import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import { useState, /* useMemo, */ useRef } from "react";
import useForm from "../hooks/useForm";
// import * as alc from "@alchemy/aa-alchemy";
// import { useMutation } from "@tanstack/react-query";
// import { registerValidator } from "../utils/validators";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const router = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    {
      title: "Easy Payments",
      description: "Send and receive money with just a few taps.",
    },
    {
      title: "Quick Loans",
      description: "Access funds when you need them most.",
    },
    {
      title: "Financial Insights",
      description: "Gain valuable insights into your spending habits.",
    },
  ];

  const iframeContainer = useRef();
  const {
    errors,
    submit,
    setFormValue,
    values: form,
  } = useForm({
    // validator: registerValidator,
    initialValues: {
      fullName: "",
      email: "",
    },
    action: async (values) => {
      console.log("Form submitted with values:", values);
      router("/select-avatar");
    },
  });

  // const signer = useMemo(
  //   () =>
  //     new alc.AlchemySignerWebClient({
  //       connection: {
  //         apiKey: "jmq-jMPqCVXlVcTjoiGrcw1hj7I9SiWU",
  //       },
  //       iframeConfig: {
  //         iframeElementId: "alchemy-aa-iframe",
  //         iframeContainerId: "alchemy-aa-iframe-container",
  //       },
  //     }),
  //   []
  // );

  // const {
  //   // mutate: signup,
  //   // isLoading,
  //   // data: user,
  // } = useMutation({
  //   mutationFn: () =>
  //     signer.authenticate({
  //       type: "passkey",
  //       createNew: true,
  //       username: "PASSKEY_NAME",
  //     }),
  // });

  return (
    <main
      id="alchemy-aa-iframe-container"
      ref={iframeContainer}
      className="min-h-screen relative flex flex-col justify-center md:flex-row"
    >
      <iframe
        id="alchemy-aa-iframe"
        className="absolute z-1 w-[100px] h-[150px] bg-white"
      />
      <div className="w-full md:w-1/2 p-8 hidden md:flex items-center justify-center order-2 bg-pink-200 bg-one md:order-1">
        <section className="max-w-lg">
          <h1 className="text-3xl font-bold font-orbitron text-white px-4 pt-12 mb-6">
            Simplify Your Finances
          </h1>
          <p className="font-inter text-gray-300 text-sm sm:text-base md:text-lg px-4 mb-12">
            Get more from your money. Create an account to effortlessly send and
            receive payments and access convenient loans.
          </p>
          <div className="relative w-full  pt-8">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeCard * 100}%)` }}
              >
                {cards.map((card, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-4">
                    <div className="bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg  rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold mb-2 text-[#47227f]">
                        {card.title}
                      </h3>
                      <p className="text-white">{card.description}</p>
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
                  className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
                    index === activeCard ? "bg-[#47227f]" : "bg-purple-300"
                  }`}
                  onClick={() => setActiveCard(index)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center order-1 md:order-2">
        <section className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-[#47227f] font-orbitron">
            Register
          </h2>
          <div>
            <TextInput
              label="Full Name"
              onChange={setFormValue}
              className="block"
              name="fullName"
              value={form.fullName}
              error={errors.fullName}
            />
            <TextInput
              label="Email"
              onChange={setFormValue}
              name="email"
              className="block"
              value={form.email}
              error={errors.email}
            />
            <label className="mb-3 block">
              <input type="checkbox" /> By checking this box, you agree to our
              Terms and Conditions and Privacy Policy.
            </label>
            <Button className="w-full mb-3" onClick={submit}>
              Continue with Passkeys
            </Button>
            <div>
              If you already have an account,{" "}
              <a className="text-purple-500" href="/login">
                click here
              </a>{" "}
              to login
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
