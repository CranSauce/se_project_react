import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm.js';
import './LoginModal.css';

function LoginModal({ activeModal, onLogin, isLoading, closeActiveModal, openModal }) {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const handleError = (error) => {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    };

    onLogin(values, handleError)
      .then(() => {
        setValues({ email: '', password: '' });
      });
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? 'Logging in...' : 'Log In'}
      buttonClassName="login__modal-btn"
      title="Log in"
      isOpen={activeModal === 'login'}
      isLogin={true}
      onSubmit={handleSubmit}
      onClose={closeActiveModal}
      openModal={openModal}
    >
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
