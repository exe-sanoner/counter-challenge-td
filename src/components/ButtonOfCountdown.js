import "../styles/Button.scss";

export default function ButtonOfCountdown({ onClick, className, userIsOut }) {
  return (
    <button
      type="button"
      className={className}
      title="Click Me and I'll paint the button!!"
      onClick={onClick}
    >
      {userIsOut ? "Click Me Again..." : "Click Me!!"}
    </button>
  );
}
