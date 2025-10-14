import React from "react";

export function Loader({ size = 32, className = "" }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-surface-300 border-t-brand-600`}
      style={{ width: size, height: size }}
      aria-label="loading"
    />
  );
}

export function FullscreenLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-surface-800/50 backdrop-blur-sm z-50">
      <Loader size={48} />
    </div>
  );
}
