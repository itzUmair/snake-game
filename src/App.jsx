import { useState } from "react";
import Canvas from "./components/Canvas";
import Titlebar from "./components/Titlebar";
import Home from "./components/Home";

function App() {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    gameSpeed: 4,
  });
  return (
    <>
      {isPlaying ? (
        <>
          <Titlebar score={score} />
          <Canvas
            score={score}
            setScore={setScore}
            gameSettings={gameSettings}
            setIsPlaying={setIsPlaying}
          />
        </>
      ) : (
        <Home
          gameSettings={gameSettings}
          setGameSettings={setGameSettings}
          setIsPlaying={setIsPlaying}
        />
      )}
    </>
  );
}

export default App;
