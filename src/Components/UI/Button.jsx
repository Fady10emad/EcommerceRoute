import React from "react";

// Usage: <Button variant="primary" size="md" iconLeft={<Icon/>} loading disabled>Label</Button>
// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  loading = false,
  disabled,
  iconLeft,
  iconRight,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = {
    sm: "text-xs px-2.5 h-8",
    md: "text-sm px-4 h-10",
    lg: "text-base px-5 h-12",
  };
  const variants = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-soft",
    secondary: "bg-surface-200 hover:bg-surface-300 text-surface-800",
    outline: "border border-surface-300 text-surface-800 hover:bg-surface-100",
    ghost: "text-surface-700 hover:bg-surface-100",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {loading && (
        <span
          className="mr-2 inline-block w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
      {iconLeft && (
        <span className="mr-2" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <span>{children}</span>
      {iconRight && (
        <span className="ml-2" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}
