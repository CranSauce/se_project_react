import { useContext } from "react";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption = filteredOptions[0] || {
    url: defaultWeatherOptions.day.url,
    condition: "unknown",
  };

  const displayedTemp =
    currentTemperatureUnit === "F"
      ? weatherData.temp.F
      : ((weatherData.temp.F - 32) * 5) / 9;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(displayedTemp)}&deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption.url}
        alt={`Card showing ${weatherOption.day ? "day" : "night"}time ${
          weatherOption.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;

