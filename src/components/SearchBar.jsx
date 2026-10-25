import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [inputError, setInputError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const city = query.trim();

    if (!city) {
      setInputError("Please enter a city name.");
      return;
    }

    setInputError("");
    onSearch(city);
  }

  function handleChange(event) {
    setQuery(event.target.value);
    setInputError("");
  }

  return (
    <section className="search-section" aria-label="City search">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="city-input">City</label>

        <div className="search-group">
          <input
            id="city-input"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter a city name"
            autoComplete="off"
            aria-invalid={Boolean(inputError)}
            aria-describedby={inputError ? "input-error" : undefined}
          />

          <button type="submit">Search</button>
        </div>

        <p id="input-error" className="input-error" aria-live="polite">
          {inputError}
        </p>
      </form>
    </section>
  );
}