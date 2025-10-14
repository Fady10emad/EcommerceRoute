import React from "react";
import PropTypes from "prop-types";

export default function Badge({ children, color = "brand", className = "" }) {
  const colors = {
    brand: "bg-brand-100 text-brand-700 border border-brand-200",
    accent: "bg-accent-100 text-accent-700 border border-accent-200",
    gray: "bg-surface-200 text-surface-700 border border-surface-300",
    danger: "bg-red-100 text-red-700 border border-red-200",
  };
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(["brand", "accent", "gray", "danger"]),
  className: PropTypes.string,
};
