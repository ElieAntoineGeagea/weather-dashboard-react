import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [submittedCity, setSubmittedCity] = useState("");

  return (
    <main className="weather-app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <p>Search for a city to view the current weather.</p>
      </header>

      <SearchBar onSearch={setSubmittedCity} />

      <p className="status-message" role="status">
        {submittedCity
          ? `You searched for ${submittedCity}. Weather fetching will be added next.`
          : "Enter a city above to get started."}
      </p>
    </main>
  );
}