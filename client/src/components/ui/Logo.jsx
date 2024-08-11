import logo from "../../assets/logo.short.png";

export default function Logo() {
  return (
    <div className="inline-flex items-center">
      <img src={logo} width={50} alt="Logo" />{" "}
      <span className="text-3xl hidden md:inline italic font-extrabold">
        Zephy
      </span>
    </div>
  );
}
