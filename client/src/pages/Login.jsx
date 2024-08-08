import zephyIcon from "../assets/fleet_logo.png"
export default function Login(){
    return (
        <div className="login-container" >
            <img src={zephyIcon} alt="zephyIcon" className="w-[500px]"></img>
            <div className="">
                <div className="text-3xl font-bold flex">Welcome to Zephy Finance</div>
            </div>
        </div>
    )
}