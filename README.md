# React Weather Dashboard

A responsive weather dashboard built with React and Vite for
Assignment 5: React Multi-Component Application.

This application rebuilds my previous vanilla JavaScript Weather
Dashboard using functional components, hooks, and props.

Previous project:
https://github.com/ElieAntoineGeagea/weather-dashboard

## Features

- Search for current weather by city name.
- Display the city, country, weather description, and weather icon.
- Show temperature and feels-like temperature in degrees Celsius.
- Show humidity and wind speed in metres per second.
- Validate empty searches.
- Display loading, error, and success states.
- Handle unknown cities, API errors, and connection failures.
- Cancel outdated requests when another search begins.
- Adapt the layout to mobile and desktop screens.
- Support keyboard submission and visible keyboard focus.

## Technologies

- React
- Vite
- JavaScript
- CSS
- OpenWeatherMap Geocoding API
- OpenWeatherMap Current Weather API

## Requirements

- Node.js 24 LTS
- npm
- An internet connection
- An activated OpenWeatherMap API key

## Installation and setup

1. Download and extract the project ZIP, or clone this repository.
2. Open the project folder in VS Code.
3. Open a terminal in the project folder.
4. Install dependencies:

   ```bash
   npm ci
   ```

5. Copy `.env.example` to a new file named `.env.local`
   in the project root.

   In Windows PowerShell, you can use:

   ```powershell
   Copy-Item .env.example .env.local
   ```

6. Edit `.env.local` and replace the placeholder with your own
   activated OpenWeatherMap API key:

   ```dotenv
   VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
   ```

7. Start the development server:

   ```bash
   npm run dev
   ```

8. Open the Local address printed in the terminal.

Restart the development server after changing `.env.local`.

The application initially displays search instructions. Enter a city
and submit the form to request weather data.

## API key handling

`.env.local` is excluded from Git and the submission ZIP.
`.env.example` contains only a placeholder.

Vite includes variables prefixed with `VITE_` in the browser
application. This setup prevents committing the key to Git, but
does not hide it from someone using the application.

Do not place private server credentials in frontend environment
variables.

## Project structure

```text
weather-dashboard-react/
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorMessage.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── SearchBar.jsx
│   │   ├── WeatherCard.jsx
│   │   └── WeatherDetail.jsx
│   ├── services/
│   │   └── weatherApi.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

The `public` folder may be empty and may therefore be absent from Git.

## Component architecture

Each component is a functional component in its own file.

| Component | Responsibility |
| --- | --- |
| App | Own shared state, run the fetching effect, and select which UI state to display |
| SearchBar | Manage input text, validate empty searches, and notify App when submitted |
| WeatherCard | Display the selected location and current weather |
| WeatherDetail | Display one reusable measurement card |
| LoadingSpinner | Display the loading indicator |
| ErrorMessage | Display a request error |

## State management

`SearchBar` uses `useState` for the input text and its validation
message. These values remain local because other components do
not need them.

`App` uses `useState` for the submitted search request, fetched
result, loading status, and request error. This shared state is
lifted to App because App coordinates fetching and the display
components.

A new search-request object is created on each valid submission,
allowing the same city to be searched again.

## useEffect and data fetching

App runs a `useEffect` with `[searchRequest]` as its dependency
array. Typing into the input does not trigger a request; submitting
a valid search does.

The weather service first finds the city's coordinates, then
requests current weather using those coordinates.

The effect creates an `AbortController` and aborts the request
during cleanup. It also checks whether the request was aborted
before updating state. This prevents outdated responses from
replacing a newer search result.

Errors are caught and displayed through ErrorMessage.

## Props and component communication

- App passes an `onSearch` callback to SearchBar.
- SearchBar calls that callback with the submitted city.
- App passes `weather` and `location` to WeatherCard.
- WeatherCard passes `label` and `value` to WeatherDetail.
- App passes the error `message` to ErrorMessage.

The deepest data flow is App → WeatherCard → WeatherDetail:
two component levels. No deeper prop drilling or global state
library is needed.

## Conditional rendering

- Before a search: display instructions.
- While fetching: display LoadingSpinner.
- After a failed request: display ErrorMessage.
- After a successful request: display WeatherCard.

Empty-input validation appears within SearchBar.

## Code checks

Run the lint check:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Open the Local address printed by the preview command.

## Manual verification checklist

- Empty or whitespace-only input displays a validation message.
- A valid city displays current weather.
- Pressing Enter submits the form without reloading the page.
- An unknown city displays an error.
- A valid search after an error restores the weather display.
- Searching for the same city again works.
- Loading feedback appears while requests are pending.
- Connection failures produce a readable error.
- A newer search is not overwritten by an outdated response.
- Narrow screens show stacked controls and measurements.
- Keyboard focus remains visible.
- The browser console has no uncaught application errors.

## Assignment requirements

| Requirement | Implementation |
| --- | --- |
| React with Vite | Vite React project; starts with `npm run dev` |
| At least four components | Six components, including App, in separate files |
| At least two state values | Local form state and shared application state |
| Side effect with useEffect | Weather fetching with dependencies and cleanup |
| Two parent/child prop pairs | App → SearchBar and App → WeatherCard, plus other pairs |
| Loading, error, and success states | Conditional rendering in App |
| Functional components and hooks | No class components |
| Limited prop drilling | Maximum depth of two component levels |

## Submission contents

Submit the GitHub repository link and a ZIP of the project source.

Include source files, configuration files, `.env.example`,
`package.json`, `package-lock.json`, and this README.

Exclude `node_modules`, `dist`, `.git`, and local environment files
containing API keys.

The recipient must configure their own activated API key before
fetching weather data.