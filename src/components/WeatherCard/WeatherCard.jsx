import sunny from "../../assets/sunny.svg";
import { weatherOptions } from "../../utils/constants";
import './WeatherCard.css';

function WeatherCard({weatherData}) {

    const filteredOptions = weatherOptions.filter((option) => {
        return(
            option.day === weatherData.isDay && 
        option.condition === weatherData.condition
    );
});

const weatherOption = filteredOptions[0];

// const weatherOptionUrl = filteredOptions[0]?.url;
// const weatherOptionCondition = filteredOptions[0]?.condition;

    return <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
        <img src={weatherOption?.url} 
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${weatherOption?.condition} weather`} 
        className="weather-card__image" />
    </section>
}
 export default WeatherCard;
