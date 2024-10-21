import { useContext, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm.js';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function EditProfileModal({ activeModal, onEditProfile, isLoading, closeActiveModal }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: '',
    avatar: '',
  });

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || '',
        avatar: currentUser.avatar || '',
      });
    }
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onEditProfile(values)
      .then(() => {
        setValues({ name: '', avatar: '' });  
        closeActiveModal(); 
      })
      .catch((error) => {
        console.error("Error updating profile:", error); 
      });
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? 'Saving...' : 'Save Changes'}
      title="Edit Profile"
      isOpen={activeModal === 'edit-profile'}
      onSubmit={handleSubmit}
      onClose={closeActiveModal}
    >
      <label htmlFor="profile-name" className="modal__label">
        Name
        <input
          id="profile-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your name"
          type="text"
          className="modal__input modal__input-underline"
          minLength={2}
          maxLength={30}
          required
        />
      </label>
      <label htmlFor="profile-avatar" className="modal__label">
        Avatar URL
        <input
          id="profile-avatar"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Enter avatar URL"
          type="url"
          className="modal__input modal__input-underline"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
