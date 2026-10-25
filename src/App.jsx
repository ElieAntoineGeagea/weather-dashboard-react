import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { getWeather } from "./services/weatherApi";

export default function App() {
  const [searchRequest, setSearchRequest] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSearch(city) {
    setResult(null);
    setError("");
    setIsLoading(true);

    // A new object allows the same city to be searched again.
    setSearchRequest({ city });
  }

  useEffect(() => {
    if (!searchRequest) {
      return;
    }

    const controller = new AbortController();

    async function loadWeather() {
      try {
        const data = await getWeather(
          searchRequest.city,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setResult(data);
        }
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(
            fetchError instanceof TypeError
              ? "Unable to connect. Check your internet connection and try again."
              : fetchError.message || "Something went wrong. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      controller.abort();
    };
  }, [searchRequest]);

  return (
    <main className="weather-app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <p>Search for a city to view the current weather.</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <div className="weather-content" aria-busy={isLoading}>
        {!searchRequest && (
          <p className="status-message">
            Enter a city above to get started.
          </p>
        )}

        {isLoading && <LoadingSpinner />}

        {!isLoading && error && <ErrorMessage message={error} />}

        {!isLoading && !error && result && (
          <WeatherCard
            weather={result.weather}
            location={result.location}
          />
        )}
      </div>
    </main>
  );
}