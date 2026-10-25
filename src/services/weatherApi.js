const API_BASE_URL = "https://api.openweathermap.org";

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Your weather API key was rejected. Check that it is correct and activated."
      );
    }

    if (response.status === 429) {
      throw new Error("Too many requests. Please wait and try again.");
    }

    throw new Error("Unable to load weather data. Please try again.");
  }

  return response.json();
}

export async function getWeather(city, signal) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim();

  if (!apiKey || apiKey === "PASTE_YOUR_ACTUAL_KEY_HERE") {
    throw new Error(
      "Weather API key is missing. Follow the project setup instructions."
    );
  }

  const locationParams = new URLSearchParams({
    q: city,
    limit: "1",
    appid: apiKey,
  });

  const locations = await fetchJson(
    `${API_BASE_URL}/geo/1.0/direct?${locationParams}`,
    signal
  );

  if (!Array.isArray(locations)) {
    throw new Error("Unexpected location data. Please try again.");
  }

  if (locations.length === 0) {
    throw new Error(
      "City not found. Please check the city name and try again."
    );
  }

  const location = locations[0];

  if (
    !Number.isFinite(location.lat) ||
    !Number.isFinite(location.lon) ||
    !location.name ||
    !location.country
  ) {
    throw new Error("Incomplete location data. Please try another city.");
  }

  const weatherParams = new URLSearchParams({
    lat: String(location.lat),
    lon: String(location.lon),
    units: "metric",
    appid: apiKey,
  });

  const weather = await fetchJson(
    `${API_BASE_URL}/data/2.5/weather?${weatherParams}`,
    signal
  );

  if (
    !Number.isFinite(weather?.main?.temp) ||
    !Number.isFinite(weather?.main?.feels_like) ||
    !Number.isFinite(weather?.main?.humidity) ||
    !Number.isFinite(weather?.wind?.speed) ||
    !weather?.weather?.[0]?.description ||
    !weather?.weather?.[0]?.icon
  ) {
    throw new Error("Incomplete weather data. Please try again.");
  }

  return { weather, location };
}