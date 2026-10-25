export default function LoadingSpinner() {
  return (
    <div className="loading-message" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>Loading weather data...</p>
    </div>
  );
}