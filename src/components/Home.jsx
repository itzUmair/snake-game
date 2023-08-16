import { useState } from "react";
import Logo from "../assets/logo.svg";
import Start from "../assets/start.mp3";

const StartSFX = new Audio(Start);
StartSFX.load();

const Home = ({ gameSettings, setGameSettings, setIsPlaying }) => {
  const [gameSpeed, setGameSpeed] = useState(3);
  const [hiScore, setHiScore] = useState(
    JSON.parse(localStorage.getItem("hi-score"))
  );

  return (
    <div className="px-4 lg:px-16 flex flex-col items-center justify-center">
      <img src={Logo} alt="Snake Retro" className=" w-96" />
      <div className=" w-[80vw] lg:w-[30rem]">
        <h2 className="text-center text-clr-100 py-8">Hi-score: {hiScore}</h2>
        <label
          htmlFor="length"
          className=" mt-4 text-xs text-clr-100 flex justify-between items-center pr-4"
        >
          Game speed
          <p className="text-sm">{6 - gameSpeed}</p>
        </label>
        <input
          type="range"
          name="length"
          id="length"
          min={1}
          max={5}
          step={1}
          value={gameSpeed}
          onChange={(e) => {
            setGameSpeed(e.target.value);
          }}
          className="w-full h-2 bg-clr-950 rounded-lg appearance-none cursor-pointer accent-clr-600 rtl"
        />
      </div>
      <button
        onClick={() => {
          setGameSettings({ ...gameSettings, gameSpeed: gameSpeed });
          StartSFX.play();
          setIsPlaying(true);
        }}
        className="bg-clr-600 py-2 px-4 mt-4 text-clr-100 "
      >
        Play
      </button>
      <button
        onClick={() => {
          setHiScore(0);
          localStorage.setItem("hi-score", JSON.stringify(0));
        }}
        className="bg-clr-600 py-2 px-4 mt-4 text-clr-100 "
      >
        Clear Hi-Score
      </button>
    </div>
  );
};

export default Home;
