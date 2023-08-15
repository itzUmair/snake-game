import { useState } from "react";
import Logo from "../assets/logo.svg";

const Home = ({ gameSettings, setGameSettings, setIsPlaying }) => {
  const [gameSpeed, setGameSpeed] = useState(4);
  return (
    <div className="px-4 lg:px-16 flex flex-col items-center justify-center">
      <img src={Logo} alt="Snake Retro" />
      <div className=" w-[80vw] lg:w-[30rem]">
        <label
          htmlFor="length"
          className=" mt-4 text-xs text-clr-100 flex justify-between items-center pr-4"
        >
          Game speed
          <p className="text-sm">{gameSpeed}</p>
        </label>
        <input
          type="range"
          name="length"
          id="length"
          min={1}
          max={5}
          step={1}
          value={gameSpeed}
          onChange={(e) => setGameSpeed(e.target.value)}
          className="w-full h-2 bg-clr-950 rounded-lg appearance-none cursor-pointer accent-clr-600"
        />
      </div>
      <button
        onClick={() => {
          setGameSettings({ ...gameSettings, gameSpeed: gameSpeed });
          setIsPlaying(true);
        }}
        className="bg-clr-600 py-2 px-4 mt-4 text-clr-100 "
      >
        Play
      </button>
    </div>
  );
};

export default Home;