import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";
import "./LoginModal.css";
import { signin } from "../../utils/auth";

function LoginModal({ closeActiveModal, activeModal, onLogin, openModal }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    signin(values.email, values.password)
      .then((data) => {
        console.log("Login Response:", data);
        localStorage.setItem("jwt", data.token); 
        onLogin(data);  
        closeActiveModal();  
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };


  return (
    <ModalWithForm
      onClose={closeActiveModal}
      openModal={openModal}
      buttonText="Log In"
      buttonClassName="login__modal-btn"
      title="Log in"
      isOpen={activeModal === "login"}
      isLogin={true}  
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="modal__input modal__input-underline"
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="modal__input modal__input-underline"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
