import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm.js';
import './RegisterModal.css';

function RegisterModal({ activeModal, onRegister, isLoading, closeActiveModal, openModal }) {
  const { values, handleChange, setValues } = useForm({
    name: '',
    avatar: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const handleError = (error) => {
      console.error('Sign up failed:', error);
      setErrorMessage('Registration failed. Please try again.');
    };

    onRegister(values, handleError)
      .then(() => {
        setValues({ name: '', avatar: '', email: '', password: '' });
      });
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? 'Registering...' : 'Register'}
      buttonClassName="register__modal-btn"
      title="Register"
      isOpen={activeModal === 'register'}
      onSubmit={handleSubmit}
      onClose={closeActiveModal}
      isLogin={false}
      openModal={openModal}
    >
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        Avatar URL
        <input
          id="register-avatar"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          type="url"
          className="modal__input modal__input-underline"
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

