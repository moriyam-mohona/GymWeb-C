import React from "react";

const Modal = ({ isOpen, onClose, title, content, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box bg-black/95 p-8 rounded-lg shadow-lg relative font-out text-white">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-white hover:text-orange  font-bold "
        >
          ✕
        </button>
        {title && <h3 className="font-light text-xl ">{title}</h3>}
        {content && <div className="py-4">{content}</div>}
        {actions && (
          <div className="flex justify-end gap-3 mt-4">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
