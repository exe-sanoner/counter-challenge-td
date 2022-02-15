import { useState, useEffect, useRef } from "react";
import ButtonOfCountdown from "./ButtonOfCountdown";
import "../styles/CountDown.scss";
import Statistics from "./Statistics";

let myColorsListFromLocalStorage = localStorage.getItem("colors");
let myUserIsOutFromLocalStorage = localStorage.getItem("user");

export default function Countdown() {
  const [colorsList, setColorsList] = useState(
    myColorsListFromLocalStorage
      ? JSON.parse(myColorsListFromLocalStorage)
      : {
          purple: 0,
          blue: 0,
          green: 0,
          yellow: 0,
          orange: 0,
          red: 0,
          grey: 0,
          white: 0,
        }
  );

  const [userIsOut, setUserIsOut] = useState(
    myUserIsOutFromLocalStorage
      ? JSON.parse(myUserIsOutFromLocalStorage)
      : false
  );

  const [isTicking, setIsTicking] = useState(true);
  const [count, setCount] = useState(60);
  const [clickButton, setClickButton] = useState(0);
  const [clickedStyle, setClickedStyle] = useState("");
  const [delay, setDelay] = useState(100);
  const [showStatistics, setShowStatistics] = useState(false);

  useInterval(
    () => {
      setCount(count - 1);
    },
    isTicking ? delay : null
  );

  const handleStopTime = () => {
    try {
      if (clickButton === 0 && count >= 0) {
        assignStyle(count);
        setCount(60);
        setClickButton(1);
        setUserIsOut(true);
      }
      // Eager clicker counter JeJe...
      else if (clickButton > 0 && count > 0) {
        setColorsList({ ...colorsList, white: colorsList.white + 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const assignStyle = (timeStop) => {
    // If you need to only assign the style if you are a new user, use this:
    // if (!userIsOut) {
    if (timeStop <= 60 && timeStop >= 52) {
      setClickedStyle("btn-first-stop");
      setColorsList({ ...colorsList, purple: colorsList.purple + 1 });
    } else if (timeStop >= 42) {
      setClickedStyle("btn-second-stop");
      setColorsList({ ...colorsList, blue: colorsList.blue + 1 });
    } else if (timeStop >= 32) {
      setClickedStyle("btn-third-stop");
      setColorsList({ ...colorsList, green: colorsList.green + 1 });
    } else if (timeStop >= 22) {
      setClickedStyle("btn-fourth-stop");
      setColorsList({ ...colorsList, yellow: colorsList.yellow + 1 });
    } else if (timeStop >= 12) {
      setClickedStyle("btn-fifth-stop");
      setColorsList({ ...colorsList, orange: colorsList.orange + 1 });
    } else if (timeStop >= 0) {
      setClickedStyle("btn-sixth-stop");
      setColorsList({ ...colorsList, red: colorsList.red + 1 });
    } else if (timeStop < 0) {
      setClickedStyle("btn-did-not-click");
      setColorsList({ ...colorsList, grey: colorsList.grey + 1 });
    }
    // }
  };

  // If you need to only assign the style if you are a new user, use this:
  // useEffect(() => {
  //   if (userIsOut) setClickedStyle("btn-not-able-to-click");
  // }, []);

  // Set Colors & User in LocalStorage

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colorsList));
    localStorage.setItem("user", JSON.stringify(userIsOut));
  }, [colorsList, userIsOut]);

  // Show Stadistics

  useEffect(() => {
    if (count <= 10 && clickButton === 0) {
      setClickedStyle("keyframe-heartbeat");
    }
    if (count < 0 && clickButton === 0) {
      assignStyle(count);
      setClickButton(1);
      setIsTicking(null);
      setShowStatistics(true);
    } else if (count < 0 && clickButton >= 0) {
      setShowStatistics(true);
      setDelay(null);
    }
  }, [count]);

  /* --------------------------------------------------------------------------------------------------- */

  // useInterval function
  // Font ===> https://www.30secondsofcode.org/articles/s/react-use-interval-explained

  // setInvertal is a side effect. You have to call it inside a useEffect() and use a return to call clearInterval and disassemble it.
  // setInvertal will only have access to the variables and values that were available when it was instantiated. I create a mutable variable using useRef() to have access to new values when I need them.

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <>
      <div className="container-countdown">
        {count > 0 ? (
          <h1>{`${count.toString().padStart(2, "0")}`}</h1>
        ) : (
          <h1>0</h1>
        )}

        <ButtonOfCountdown
          onClick={() => handleStopTime()}
          className={clickedStyle}
          userIsOut={userIsOut}
        />
      </div>

      <Statistics showStatistics={showStatistics} colorsList={colorsList} />
    </>
  );
}
