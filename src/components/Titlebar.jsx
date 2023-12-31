import Logo from "../assets/logo.svg";
import { useState } from "react";

const Titlebar = ({ score }) => {
  const [hiScore, setHiScore] = useState(
    JSON.parse(localStorage.getItem("hi-score")) || 0
  );
  if (score > hiScore) {
    setHiScore(score);
  }

  return (
    <nav className="flex items-center justify-between px-4 lg:px-16">
      <img src={Logo} alt="Snake Retro" className="w-28 md:w-40" />
      <div className="flex flex-col md:flex-row md:gap-4 text-[0.5rem] md:text-xs text-clr-100">
        <p>Score: {score}</p>
        <p>Hi-Score: {hiScore}</p>
      </div>
    </nav>
  );
};

export default Titlebar;
