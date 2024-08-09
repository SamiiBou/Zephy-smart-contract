import { clsx } from "../../utils";
import PropTypes from "prop-types";
import { forwardRef, useState, useEffect } from "react";

const Button = forwardRef(({ variant, className, ...htmlButtonProps }, ref) => {
  const [isRippling, setIsRippling] = useState(false);
  const [coords, setCoords] = useState({ x: -1, y: -1 });

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      x: (e.clientX - rect.left) / 2,
      y: (e.clientY - rect.top) / 2,
    });
    htmlButtonProps.onClick && htmlButtonProps.onClick(e);
  };

  const styles = {
    primary:
      "bg-niche-purple-500 active:ring-4 transition-all active:ring-gray-400 hover:bg-niche-purple-400 text-white",
    default:
      "bg-niche-purple-500 active:ring-4 text-white transition-all active:ring-pink-200 hover:bg-niche-purple-400",
    secondary: "bg-niche-purple-300",
  };

  return (
    <button
      {...htmlButtonProps}
      ref={ref}
      style={{
        "--coord-x": `${coords.x}px`,
        "--coord-y": `${coords.y}px`,
        ...htmlButtonProps.style,
      }}
      className={clsx([
        "px-8 py-3 font-medium rounded shadow appearance-none overflow-hidden relative",
        styles[variant || "default"] || styles.default,
        isRippling && "ripple",
        className,
      ])}
      onClick={handleClick}
    >
      {htmlButtonProps.children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

Button.displayName = "Button";

export default Button;
