import { useState, useEffect, React } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import {
  getWeather,
  filterWeatherData,
} from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardId, setSelectedCardId] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

   
    const onLogin = (data) => {
      localStorage.setItem("jwt", data.token);  
      setUser(data.user); 
      setIsLoggedIn(true);
      closeActiveModal();
      navigate("/profile");  
    };
  
    const onRegister = (data) => {
      localStorage.setItem("jwt", data.token);  
      setUser(data.user);  
      setIsLoggedIn(true);
      closeActiveModal();
      navigate("/profile");  
    };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };


  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleSignupClick = () => {
    setActiveModal("register");
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
      console.log("Deleting item with ID:", selectedCardId);
      deleteItem(selectedCardId)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCardId)
          );
          closeActiveModal();
        })
        .catch((error) => console.error("Error deleting item:", error));
    }
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCardId(null);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleAddItem = (item, resetForm) => {
    const newItem = { ...item, weather: item.weather };

    setIsLoading(true);

    addItem(newItem)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => console.error("Error adding item:", error))

      .finally(() => {
        setIsLoading(false);
      });
  };

 
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setUser(data.user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false); 
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems().then((data) => {
      setClothingItems(data);
    });
  }, []);
  

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={user}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleLoginClick={handleLoginClick} handleSignupClick={handleSignupClick} handleAddClick={handleAddClick} weatherData={weatherData} />
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
                <ProtectedRoute user={user}>
                <Profile
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                /> 
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <AddItemModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          onAddItem={handleAddItem}
          buttonText={isLoading ? "Saving..." : "Save"}
        />
        <ItemModal
          onClose={closeActiveModal}
          activeModal={activeModal}
          card={selectedCard}
          onDeleteClick={handleDeleteClick}
          buttonText={isLoading ? "Saving..." : "Save"}
        />
        <ConfirmationModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          handleDelete={handleDelete}
        />
        <LoginModal 
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
        onLogin={onLogin}
        openModal={setActiveModal}
        />
        <RegisterModal 
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
        onRegister={onRegister}
        openModal={setActiveModal}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
