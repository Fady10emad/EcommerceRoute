import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-surface-200 dark:border-surface-700 bg-white/80 dark:bg-surface-800/80 backdrop-blur">
      <div className="container py-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-surface-600 dark:text-surface-300">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </span>
          <p className="text-xs text-surface-500">
            Built with React & Tailwind CSS.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-surface-600 dark:text-surface-300">
          <a href="#" className="hover:text-brand-600 transition">
            About
          </a>
          <a href="#" className="hover:text-brand-600 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-brand-600 transition">
            Licensing
          </a>
          <a href="#" className="hover:text-brand-600 transition">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
