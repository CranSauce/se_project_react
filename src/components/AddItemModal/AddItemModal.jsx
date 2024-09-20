import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";


function AddItemModal({ closeActiveModal, activeModal, onAddItem }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      _id: Date.now(),
      name,
      imageUrl,
      weather: weatherType,
    };
    onAddItem(newItem);  
    closeActiveModal();
  };

  return (
    <ModalWithForm
      onClose={closeActiveModal}
      buttonText="Add Garment"
      title="New Garment"
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit} 
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
            value="Hot"
            checked={weatherType === "Hot"}
            onChange={(e) => setWeatherType(e.target.value)}
            className="modal__radio-input"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__input modal__input_type_radio">
          <input
            id="warm"
            name="weatherType"
            type="radio"
            value="Warm"
            checked={weatherType === "Warm"}
            onChange={(e) => setWeatherType(e.target.value)}
            className="modal__radio-input"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__input modal__input_type_radio">
          <input
            id="cold"
            name="weatherType"
            type="radio"
            value="Cold"
            checked={weatherType === "Cold"}
            onChange={(e) => setWeatherType(e.target.value)}
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
