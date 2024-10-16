import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";
import { signup } from "../../utils/auth.js";  
import "./RegisterModal.css";

function RegisterModal({ closeActiveModal, activeModal, onRegister, openModal }) {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(values.name, values.avatar, values.email, values.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);  
        onRegister(data); 
        closeActiveModal();  
      })
      .catch((err) => {
        console.error("Sign up failed:", err);
      });
  };


  return (
    <ModalWithForm
      onClose={closeActiveModal}
      openModal={openModal}
      buttonText="Next"
      buttonClassName="register__modal-btn"
      title="Register"
      isOpen={activeModal === "register"}
      isLogin={false}  
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          id="register-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          type="text"
          className="modal__input modal__input-underline"
          required
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          id="register-email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="modal__input modal__input-underline"
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          id="register-password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="modal__input modal__input-underline"
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*
        <input
          id="register-avatar"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="AvatarURL*"
          type="url"
          className="modal__input modal__input-underline"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
