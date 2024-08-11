import PropTypes from "prop-types";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

export default function Alert({ type = "info", children }) {
  const alertStyles = {
    padding: "10px 20px",
    borderRadius: "4px",
    marginBottom: "15px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  };

  const alertTypes = {
    info: {
      backgroundColor: "#e6f7ff",
      color: "#1890ff",
      borderColor: "#91d5ff",
      icon: <FaInfoCircle />,
    },
    success: {
      backgroundColor: "#f6ffed",
      color: "#52c41a",
      borderColor: "#b7eb8f",
      icon: <FaCheckCircle />,
    },
    warning: {
      backgroundColor: "#fffbe6",
      color: "#faad14",
      borderColor: "#ffe58f",
      icon: <FaExclamationTriangle />,
    },
    error: {
      backgroundColor: "#fff2f0",
      color: "#ff4d4f",
      borderColor: "#ffccc7",
      icon: <FaTimesCircle />,
    },
  };

  const style = {
    ...alertStyles,
    ...alertTypes[type],
    border: `1px solid ${alertTypes[type].borderColor}`,
  };

  return (
    <div style={style} role="alert">
      <span style={{ marginRight: "10px" }}>{alertTypes[type].icon}</span>
      {children}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(["info", "success", "warning", "error"]),
  children: PropTypes.node.isRequired,
};
