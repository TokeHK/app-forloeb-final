import React from "react";
import { createPortal } from "react-dom";
import Forms from "./Forms";
import styles from "./Modal.module.css"

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; topic: string; message: string }) => void;
  initialData?: { name: string; email: string; topic: string; message: string }; // Optional initial data to pre-fill the form
  selectedItem?:{email: string; img:string; bgColor:string}
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onSubmit, initialData, selectedItem }) => {
  if (!show) return null;

  return createPortal(
    <>
      <div
        className={styles.bg}
        onClick={onClose}
      />
      <div className={styles.close}
      style={{background: selectedItem?.bgColor}}
      >
        <button
          className={styles.close_btn}
          onClick={onClose}
        >
          &times;
        </button>
        {selectedItem && (
          <div>
            <h2>{selectedItem.email}</h2>
          </div>
        )}
        <Forms onSubmit={onSubmit} initialData={initialData} />
      </div>
    </>,
    document.body
  );
};

export default Modal;
