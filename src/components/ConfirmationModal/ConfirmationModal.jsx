import "./ConfirmationModal.css";

function ConfirmationModal({ closeActiveModal, activeModal, handleDelete }) {
  return (
    <div className={`modal ${activeModal === "confirm" ? "modal_opened" : ""}`}>
      <div className="modal__content_type_confirm">
        <button className="modal__close-btn_type_confirm" onClick={closeActiveModal}></button>
        <p className="modal__confirm-title">Are you sure you want to delete this item? This action is irreversable.</p>
        <div className="modal__buttons">
          <button className="modal__confirm" onClick={handleDelete}>
            Yes, delete item
          </button>
          <button className="modal__cancel" onClick={closeActiveModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
