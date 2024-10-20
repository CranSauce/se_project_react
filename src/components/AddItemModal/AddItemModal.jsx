import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";

function AddItemModal({ activeModal, onAddItem, closeActiveModal }) {
  const { values, handleChange, setValues } = useForm({
    name: '',
    imageUrl: '',
    weatherType: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weatherType,
    };

    onAddItem(newItem);
    setValues({
      name: '',
      imageUrl: '',
      weatherType: '',
    });
  };

  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit}
      onClose={closeActiveModal}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          type="text"
          className="modal__input modal__input-underline"
          minLength={2}
          maxLength={30}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          id="imageUrl"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          type="url"
          className="modal__input modal__input-underline"
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__input modal__input_type_radio">
          <input
            id="hot"
            name="weatherType"
            type="radio"
            value="hot"
            checked={values.weatherType === "hot"}
            onChange={handleChange}
            className="modal__radio-input"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__input modal__input_type_radio">
          <input
            id="warm"
            name="weatherType"
            type="radio"
            value="warm"
            checked={values.weatherType === "warm"}
            onChange={handleChange}
            className="modal__radio-input"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__input modal__input_type_radio">
          <input
            id="cold"
            name="weatherType"
            type="radio"
            value="cold"
            checked={values.weatherType === "cold"}
            onChange={handleChange}
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
