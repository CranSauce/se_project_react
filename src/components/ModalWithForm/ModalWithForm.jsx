import "./ModalWithForm.css";

function ModalWithForm({
  openModal,
  onClose,
  buttonText,
  buttonClassName,
  isLogin,  
  title,
  isOpen,
  onSubmit,
  children,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close-btn" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`modal__submit ${buttonClassName}`}>
            {buttonText}
          </button>
          {typeof isLogin !== "undefined" && (
            isLogin ? (
              <button
                type="button"
                className="modal__register-btn"
                onClick={() => openModal("register")}  
              >
                or Register
              </button>
            ) : (
              <button
                type="button"
                className="modal__login-btn"
                onClick={() => openModal("login")}  
              >
                or Log In
              </button>
            )
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
