import React from "react";

export default function Card({
  children,
  className = "",
  interactive = false,
  padding = "md",
}) {
  const paddings = { none: "", sm: "p-3", md: "p-5", lg: "p-7" };
  return (
    <div
      className={`rounded-xl bg-white shadow-soft border border-surface-200 ${
        interactive
          ? "hover:shadow-elevated transition-shadow duration-300"
          : ""
      } ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
