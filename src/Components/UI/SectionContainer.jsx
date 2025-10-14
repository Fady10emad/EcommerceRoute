import React from "react";

export default function SectionContainer({
  title,
  subtitle,
  actions,
  children,
  className = "",
}) {
  return (
    <section className={`my-10 ${className}`}>
      {(title || subtitle || actions) && (
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight text-surface-800">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-surface-600 mt-1">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
