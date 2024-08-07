import { clsx } from "@/utils";
import PropTypes from 'prop-types'

function Button({ variant, className, ...htmlButtonProps}) {
  const styles = {
    primary: "bg-niche-purple-500 active:ring-4 transition-all active:ring-gray-400 hover:bg-niche-purple-400 text-white",
    secondary: "bg-niche-purple-300",
    default: "bg-pink-400",
  };

  return (
    <button
      {...htmlButtonProps}
      className={clsx([
        " px-8 py-3 font-medium rounded-3xl",
        styles[variant || "default"] || styles.default,
        className,
      ])}
    />
  );
}


Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
}

export default Button
