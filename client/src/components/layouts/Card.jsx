import PropTypes from "prop-types";
import { clsx } from "../../utils";

export default function Card({ children, title, variant }) {
  return (
    <div
      className={clsx([
        "p-4 rounded",
        variant === "primary" && "bg-purple-900 text-white",
        variant === "seconday" && "bg-black text-white",
        variant === "outline-primary" && "border-purple-900 border text-white",
      ])}
    >
      {title && <h2 className="text-sm font-semibold mb-4">{title}</h2>}
      <h1 className="font-extrabold text-2xl md:text-4xl">{children}</h1>
    </div>
  );
}

Card.defaultProps = {
  variant: "primary",
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(["primary"]),
};
