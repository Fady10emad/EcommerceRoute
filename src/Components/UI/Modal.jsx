import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-surface-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <dialog
        open
        className="relative w-full max-w-lg rounded-xl bg-white shadow-elevated animate-fadeIn"
      >
        <div className="flex items-start justify-between px-6 pt-5">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-surface-800"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="ml-4 text-surface-500 hover:text-surface-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-4 text-sm text-surface-700">{children}</div>
        <div className="px-6 pb-5 flex gap-3 justify-end">
          {actions || (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </dialog>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.node,
};
