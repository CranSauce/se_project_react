import { useState } from "react";

import Header from "../Header/Header";
import './App.css';
import Main from '../Main/Main';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";


function App() {
  const [weatherData, setWeatherData] = useState({type: "cold"})
  const [activeModal, setActiveModal] = useState("preview");
  const [selectedCard, setSelectedCard] = useState([]);
  const handleAddClick = () => {
    setActiveModal("add-garment");
  }

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm 
      onClose={closeActiveModal}
      buttonText="Add Garment" 
      title="New Garment"
      activeModal={activeModal}>
      <label htmlFor="name" className="modal__label">
                    Name
                    <input 
                    id="name" 
                    placeholder= "Name" 
                    type="text"
                     className="modal__input modal__input-underline" />
                </label>
                <label htmlFor="imageUrl" className="modal__label" >
                    Image
                    <input 
                    id="imageUrl" 
                    placeholder= "Image URL" 
                    type="url"
                     className="modal__input modal__input-underline" />
                </label>
                <fieldset className="modal__radio-buttons"> 
                    <legend className="modal__legend">Select the weather type</legend>
                    <label htmlFor="hot"  className="modal__input modal__input_type_radio">
                        <input 
                        id="hot"
                        type="radio"
                         className="modal__radio-input" />Hot
                    </label>
                    <label htmlFor="warm"  className="modal__input modal__input_type_radio">
                        <input 
                        id="warm"
                        type="radio"
                         className="modal__radio-input" />Warm
                    </label>
                    <label htmlFor="cold"  className="modal__input modal__input_type_radio">
                        <input 
                        id="cold"
                        type="radio"
                         className="modal__radio-input" />Cold
                    </label>
                </fieldset>
      </ModalWithForm>
      <ItemModal 
      onClose={closeActiveModal} 
      activeModal={activeModal} 
      card={selectedCard} />
      <Footer />
      </div>
  )
}

export default App
