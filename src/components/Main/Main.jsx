import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, handleLikeClick}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const displayedTemp = weatherData.temp[currentTemperatureUnit];

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Its {Math.round(displayedTemp)}&deg; {currentTemperatureUnit} outside/
          You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onLikeClick={handleLikeClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
