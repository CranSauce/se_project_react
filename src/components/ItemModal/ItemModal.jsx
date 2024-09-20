import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"} `}>
      <div className="modal__content_type_preview">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn_type_preview"
        ></button>
        <img src={card.imageUrl} alt="Clothing card" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <button
            className="modal__delete-btn"
            onClick={() => onDeleteClick(card._id)}
          >
            Delete item
          </button>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
