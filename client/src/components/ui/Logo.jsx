import logo from "../../assets/logo.short.png";
import { clsx } from "../../utils";
import { PropTypes } from "prop-types";

export default function Logo({ textWhite }) {
  return (
    <div className="inline-flex items-center">
      <img src={logo} width={50} alt="Logo" />{" "}
      <span
        className={clsx([
          "text-3xl hidden font-orbitron md:inline italic font-extrabold",
          textWhite && "text-white",
        ])}
      >
        Zephy
      </span>
    </div>
  );
}

Logo.propTypes = {
  textWhite: PropTypes.bool,
};
