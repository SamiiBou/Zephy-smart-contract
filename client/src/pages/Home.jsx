import Button from "../components/ui/Button";
// import TextInput from "../components/ui/TextInput";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="bg-one pt-60 min-h-[550px] flex items-center text-white py-40"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div>
            <span className="bg-purple-700 tracking-widest font-bold px-3 py-1 rounded-full">
              🏆 #1
            </span>
            <h1 className="text-5xl font-orbitron md:text-8xl font-bold mb-4">
              Revolutionize Your Finances with Zephy
            </h1>
            <p className="text-xl mb-6">
              Generate payment links instantly <br />
              and access crypto-backed loans with ease.
            </p>
            <div className="inline-flex space-x-4">
              <Button>Get Started</Button>
              <Button className="bg-white text-black hover:bg-slate-300 !outline-white">
                Learn More
              </Button>
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
