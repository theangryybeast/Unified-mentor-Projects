import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const handleStart = () => {
    setActive(true);
    setIsPause(false);
  };
  const intervalRef = useRef(null);
  useEffect(() => {
    if (isActive && !isPause && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative values
      }, 1000);
    } else if (isActive && time === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      setActive(false);
      // if (intervalRef.current) alert("Time's Up !!!"); // Prevent alert on immediate start
      if (time !== 0) alert("Time's Up !!!");
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isPause, time]);
  const handlePause = () => {
    setIsPause(!isPause);
  };
  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null; // Reset the ref
    setActive(false);
    setIsPause(false);
    setTime(0);
  };
  const handleInput = (event) => {
    setTime(parseInt(event.target.value * 60) || 0);
  };
  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min} : ${sec}`;
  };

  return (
    <div className="countdown-timer">
      <h1>Count Down Timer</h1>
      <div className="timer-display">
        <input
          type="number"
          placeholder="Enter time in minutes"
          onChange={handleInput}
        />
        <div>{formatTime()}</div>
      </div>
      <div className="timer-controls">
        <button
          onClick={handleStart}
          disabled={time === 0 || (isActive && !isPause)}
        >
          Start
        </button>
        <button onClick={handlePause} disabled={!isActive}>
          {isPause ? "Resume" : "Pause"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
