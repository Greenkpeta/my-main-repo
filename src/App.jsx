import React, { useState, useEffect } from "react";

const App = () => {
  // State management
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  // Format time for display
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle increment and decrement of break/session
  const handleBreakChange = (change) => {
    if (!isRunning) {
      setBreakLength((prev) => Math.min(60, Math.max(1, prev + change)));
    }
  };

  const handleSessionChange = (change) => {
    if (!isRunning) {
      let newSession = Math.min(60, Math.max(1, sessionLength + change));
      setSessionLength(newSession);
      setTimeLeft(newSession * 60);
    }
  };

  // Handle start/stop functionality
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      const id = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  // Handle timer logic
  useEffect(() => {
    if (timeLeft < 0) {
      document.getElementById("beep").play();
      setTimeout(() => {
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
      }, 1000);
      
      if (isSession) {
        setTimeLeft(breakLength * 60);
      } else {
        setTimeLeft(sessionLength * 60);
      }
      setIsSession(!isSession);
    }
  }, [timeLeft, isSession, breakLength, sessionLength]);

  // Handle reset functionality
  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsSession(true);
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  return (
    <div className="container text-center mt-5">
      <h1>25 + 5 Clock</h1>

      <div className="row">
        <div className="col">
          <h3 id="break-label">Break Length</h3>
          <button id="break-decrement" onClick={() => handleBreakChange(-1)}>−</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => handleBreakChange(1)}>+</button>
        </div>

        <div className="col">
          <h3 id="session-label">Session Length</h3>
          <button id="session-decrement" onClick={() => handleSessionChange(-1)}>−</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => handleSessionChange(1)}>+</button>
        </div>
      </div>

      <div id="timer">
        <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
        <h1 id="time-left">{formatTime(timeLeft)}</h1>
      </div>

      <button id="start_stop" onClick={toggleTimer}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={resetTimer}>Reset</button>

      <audio id="beep" src="https://www.soundjay.com/button/beep-07.wav"></audio>
    </div>
  );
};

export default App;