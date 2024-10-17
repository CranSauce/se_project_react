import "./ItemModal.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext); 

  const isOwn = card.owner === currentUser?._id; 

  const itemDeleteButtonClassName = `modal__delete-btn ${isOwn ? 'modal__delete-btn_visible' : 'modal__delete-btn_hidden'}`

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content_type_preview">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn_type_preview"
        ></button>
        <img src={card.imageUrl} alt="Clothing card" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          {isOwn && (
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={() => onDeleteClick(card._id)}
          >
            Delete Item
          </button>
          )}
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
