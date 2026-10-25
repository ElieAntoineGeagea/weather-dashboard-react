import WeatherDetail from "./WeatherDetail";

export default function WeatherCard({ weather, location }) {
  const description = weather.weather[0].description;
  const iconCode = weather.weather[0].icon;

  return (
    <section className="weather-card" aria-labelledby="weather-city">
      <div className="weather-header">
        <div>
          <h2 id="weather-city">
            {location.name}, {location.country}
          </h2>
          <p className="weather-description">{description}</p>
        </div>

        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={description}
          width="100"
          height="100"
        />
      </div>

      <p className="temperature">
        {Math.round(weather.main.temp)}°C
      </p>

      <div className="weather-details">
        <WeatherDetail
          label="Feels like"
          value={`${Math.round(weather.main.feels_like)}°C`}
        />
        <WeatherDetail
          label="Humidity"
          value={`${weather.main.humidity}%`}
        />
        <WeatherDetail
          label="Wind speed"
          value={`${weather.wind.speed} m/s`}
        />
      </div>
    </section>
  );
}