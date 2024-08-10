import zephyIcon from "../assets/fleet_logo.png";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/ui/TextInput";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("login");
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="flex bg-one justify-center items-center px-4 py-8 min-h-screen">
      <div className="bg-white max-w-md w-full rounded-lg p-4">
        <h2 className="font-bold font-orbitron text-3xl">Get Access</h2>
        <p className="mb-3 italic">Get access to your dashboard</p>
        <form>
          <TextInput label="Enter Email" />

          <Button variant="primary" className="w-full">
            Authenticate
          </Button>
        </form>
      </div>
    </div>
  );
}
