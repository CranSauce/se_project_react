import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ onClose, buttonText, title, isOpen, children }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close-btn" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
