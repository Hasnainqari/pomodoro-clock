import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 * 60
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      audioRef.current.play();
      if (isSession) {
        setIsSession(false);
        setTimeLeft(breakLength * 60);
      } else {
        setIsSession(true);
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, isSession, breakLength, sessionLength]);

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  return (
    <div className="container">
      <h1>Pomodoro Clock</h1>
      <div className="length-controls">
        <div id="break-label">
          <h2>Break Length</h2>
          <div className="length-control">
            <button id="break-decrement" onClick={decrementBreak}>
              -
            </button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment" onClick={incrementBreak}>
              +
            </button>
          </div>
        </div>
        <div id="session-label">
          <h2>Session Length</h2>
          <div className="length-control">
            <button id="session-decrement" onClick={decrementSession}>
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button id="session-increment" onClick={incrementSession}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="timer">
        <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
      <div className="controls">
        <button id="start_stop" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio
        id="beep"
        ref={audioRef}
        src="https://www.soundjay.com/button/beep-07.wav"
      ></audio>
    </div>
  );
};

export default App;
