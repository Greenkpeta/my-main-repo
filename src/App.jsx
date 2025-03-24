import React, { useState, useEffect } from "react";
import "./App.css";

// Audio clips
const drumPads = [
  { key: "Q", name: "Heater 1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", name: "Heater 2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", name: "Heater 3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", name: "Heater 4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", name: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Clap.mp3" },
  { key: "D", name: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Open-HH.mp3" },
  { key: "Z", name: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", name: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick.mp3" },
  { key: "C", name: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Closed-HH.mp3" },
];

function DrumMachine() {
  const [displayText, setDisplayText] = useState("");

  // Handle key presses
  useEffect(() => {
    const handleKeyPress = (event) => {
      const pad = drumPads.find((p) => p.key === event.key.toUpperCase());
      if (pad) {
        playSound(pad.key, pad.name);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const playSound = (key, name) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplayText(name);
    }
  };

  return (
    <div id="drum-machine">
      <h1>Drum Machine</h1>
      <div id="display">{displayText || "Press a key"}</div>
      <div className="drum-pad-container">
        {drumPads.map((pad) => (
          <button
            key={pad.key}
            className="drum-pad"
            id={pad.name}
            onClick={() => playSound(pad.key, pad.name)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrumMachine;