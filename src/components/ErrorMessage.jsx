export default function ErrorMessage({ message }) {
  return (
    <div className="error-message" role="alert">
      <p>{message}</p>
    </div>
  );
}