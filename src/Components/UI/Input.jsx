import React from "react";
import PropTypes from "prop-types";

export default function Input({ label, error, className = "", ...rest }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          className="text-sm font-medium text-surface-700"
          htmlFor={rest.id || rest.name}
        >
          {label}
        </label>
      )}
      <input
        className="w-full rounded-md border border-surface-300 bg-white/90 px-3 py-2 text-sm shadow-soft focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
        {...rest}
      />
      {error && (
        <p className="text-xs text-red-600 mt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};
