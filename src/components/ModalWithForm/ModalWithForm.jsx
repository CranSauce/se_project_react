import './ModalWithForm.css';


function ModalWithForm({ 
    children, 
    buttonText, 
    title, 
    activeModal, 
    onClose
     }) {
    return(
        <div className={`modal ${activeModal === "add-garment" && "modal_opened"} `}>
            <div className="modal__content">
            <form className="modal__form">
                <h2 className="modal__title">{title}</h2>
                
                <button onClick={onClose} type="button" className="modal__close-btn">
                
                </button>
                {children}
                <button type="submit" className="modal__submit">
                    {buttonText}
                </button>
            </form>
            </div>
        </div>
    )
}

export default ModalWithForm;