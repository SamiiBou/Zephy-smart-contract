import Button from "../components/ui/Button";
// import TextInput from "../components/ui/TextInput";
import TopNav from "../components/navigation/TopNav";

export default function Home() {
  return (
    <>
      <nav>
        <TopNav />
      </nav>
      <main>
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Revolutionize Your Finances with CryptoFin
                </h1>
                <p className="text-xl mb-6">
                  Generate payment links instantly and access crypto-backed
                  loans with ease.
                </p>
                <div className="flex space-x-4">
                  <Button>Get Started</Button>
                  <Button variant="secondary">Learn More</Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/crypto-finance.svg"
                  alt="Crypto Finance Illustration"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
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
