export default function WeatherDetail({ label, value }) {
  return (
    <article className="weather-detail">
      <h3>{label}</h3>
      <p>{value}</p>
    </article>
  );
}