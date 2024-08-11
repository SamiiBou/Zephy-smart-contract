import zephyIcon from "../assets/fleet_logo.png"
import Button from "../components/ui/Button"
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
    const handleLogin = () => {
      console.log("login")
    }
  
    const handleCreateAccount = () => {
      navigate("/register")
    }
  
    return (
      <div className="login-container flex flex-col items-center px-4 py-8 min-h-screen">
        <img 
          src={zephyIcon} 
          alt="zephyIcon" 
          className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
        />
        <div className="h-12 sm:h-16 md:h-20"></div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-center text-[#47227f]">
          Welcome to Zephy Finance
        </h1>
        <div className="h-8 sm:h-10 md:h-12"></div>
        <p className="font-inter text-center text-sm sm:text-base md:text-lg max-w-md">
          Finances made accessible. Save time and focus on what matters most
        </p>
        <div className="h-16 sm:h-24 md:h-32"></div>
        <Button 
          className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 text-white bg-[#47227f]" 
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
        <div className="h-4"></div>
        <Button 
          className="bg-[#F2F2F2] w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 text-[#47227f]" 
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    )
  }