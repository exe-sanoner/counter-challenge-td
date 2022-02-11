// import Button from "./components/Button";
import Countdown from "./components/CountDown";
// import Stadistics from "./components/Statistics";
import "./styles/App.scss";

function App() {
  function renderMainContent() {
    return (
      <>
        <img
          src="/background.svg"
          alt="background image"
          className="imageBack"
        ></img>
        <Countdown />
      </>
    );
  }

  return (
    <div className="App-container">
      <header></header>
      <main className="main">{renderMainContent()}</main>
      <footer className="footer">
        <span>Counter Challenge by Exequiel Sanoner</span>
      </footer>
    </div>
  );
}

export default App;
