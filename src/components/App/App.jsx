import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, getWeatherType, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState([]);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null); // Added state to store card ID

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (cardId) => {
    setActiveModal("preview");
    setSelectedCard(cardId);
  };

  const handleDeleteClick = (cardId) => {
    setSelectedCardId(cardId);
    setActiveModal("confirm");
  };

  const handleDelete = () => {
    if (selectedCardId) {
      deleteItem(selectedCardId)
        .then(() => {
          setClothingItems((prevItems) => prevItems.filter((item) => item._id !== selectedCardId));
          closeActiveModal();
        })
        .catch((error) => console.error('Error deleting item:', error));
    }
  };
  

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCardId(null); 
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleAddItem = (item) => {
    const weatherType = getWeatherType(weatherData.temp.F); 
    const newItem = { ...item, weather: weatherType }; 


    addItem(newItem)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
      })
      .catch((error) => console.error('Error adding item:', error));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          onAddItem={handleAddItem}
        />
        <ItemModal
          onClose={closeActiveModal}
          activeModal={activeModal}
          card={selectedCard}
          onDeleteClick={handleDeleteClick} 
        />
        <ConfirmationModal 
          closeActiveModal={closeActiveModal} 
          activeModal={activeModal} 
          handleDelete={handleDelete} 
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
