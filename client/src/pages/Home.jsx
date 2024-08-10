import Button from "../components/ui/Button";
// import TextInput from "../components/ui/TextInput";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="bg-one pt-40 min-h-[550px] flex items-center text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Revolutionize Your Finances with Zephy
            </h1>
            <p className="text-xl mb-6">
              Generate payment links instantly and access crypto-backed loans
              with ease.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex space-x-4">
                <Button>Get Started</Button>
                <Button variant="secondary">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    // <div className="px-3 py-3 flex ">
    //   <TextInput label="First Name"/>
    //   <TextInput />
    //   <div>

    //   <Button>Hello</Button>
    //   <Button variant="secondary">Hello</Button>
    //   </div>
    // </div>
  );
}
