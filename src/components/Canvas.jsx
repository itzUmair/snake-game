import { useEffect, useRef, useState } from "react";
import GameOver from "./GameOver";
import Gamepad from "./Gamepad";
import PauseMenu from "./PauseMenu";
import PauseIcon from "../assets/pause.svg";
import Point from "../assets/point.mp3";
import Fail from "../assets/fail.mp3";
import Pause from "../assets/pause.mp3";
import UnPause from "../assets/unpause.mp3";

const PointSFX = new Audio(Point);
PointSFX.load();
const FailSFX = new Audio(Fail);
FailSFX.load();
const PauseSFX = new Audio(Pause);
PauseSFX.load();
const UnPauseSFX = new Audio(UnPause);
UnPauseSFX.load();

const Canvas = ({ score, setScore, gameSettings, setIsPlaying }) => {
  const [gameReset, setGameReset] = useState(0);
  const [snake, setSnake] = useState([
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const lastMoveRef = useRef("s");
  const moveCooldown = useRef(0);
  const [lastMove, setLastMove] = useState("d");
  const [isPaused, setIsPaused] = useState(false);

  const isBitingSelf = () => {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (isPaused) return;
    UnPauseSFX.play();
  }, [isPaused]);

  const generateFood = () => {
    const newFoodCoordinates = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
    setFood(newFoodCoordinates);
  };

  const isEatingFood = () => {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      generateFood();
      setScore((prevScore) => prevScore + 1);
      PointSFX.play();
      return true;
    }
    return false;
  };

  const gameRunning = () => {
    if (
      snake[0].x === 20 ||
      snake[0].x < 0 ||
      snake[0].y === 20 ||
      snake[0].y < 0
    ) {
      if (score > JSON.parse(localStorage.getItem("hi-score"))) {
        localStorage.setItem("hi-score", JSON.stringify(score));
      }
      setGameOver(true);
    } else if (isBitingSelf()) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (gameOver === false) return;
    FailSFX.play();
  }, [gameOver]);

  const updateSnake = () => {
    if (isPaused) return;
    gameRunning();
    if (gameOver) {
      return;
    }
    let tempSnake = [...snake];
    if (lastMove === "d") {
      tempSnake.unshift({ x: tempSnake[0].x + 1, y: tempSnake[0].y });
    } else if (lastMove === "s") {
      tempSnake.unshift({ x: tempSnake[0].x, y: tempSnake[0].y + 1 });
    } else if (lastMove === "w") {
      tempSnake.unshift({ x: tempSnake[0].x, y: tempSnake[0].y - 1 });
    } else {
      tempSnake.unshift({ x: tempSnake[0].x - 1, y: tempSnake[0].y });
    }
    if (!isEatingFood()) {
      tempSnake.pop();
    }
    setSnake(tempSnake);
  };

  const updateLastMoveRef = (move) => {
    if (Date.now() - moveCooldown.current < 50 * gameSettings.gameSpeed) return;
    moveCooldown.current = Date.now();

    if (["a", "s", "d", "w"].includes(move)) {
      if (lastMoveRef.current === "d" && move !== "a") {
        lastMoveRef.current = move;
        return;
      }
      if (lastMoveRef.current === "s" && move !== "w") {
        lastMoveRef.current = move;
        return;
      }
      if (lastMoveRef.current === "a" && move !== "d") {
        lastMoveRef.current = move;
        return;
      }
      if (lastMoveRef.current === "w" && move !== "s") {
        lastMoveRef.current = move;
        return;
      }
    }
  };

  useEffect(() => {
    const gameLoop = setInterval(updateSnake, 50 * gameSettings.gameSpeed);

    return () => {
      clearInterval(gameLoop);
    };
  });

  useEffect(() => {
    const keyListener = window.addEventListener("keydown", (e) =>
      updateLastMoveRef(e.key)
    );

    return () => window.removeEventListener("keydown", keyListener);
  });

  useEffect(() => {
    const moveUpdateInterval = setInterval(
      setLastMove(lastMoveRef.current),
      50 * gameSettings.gameSpeed
    );
    return () => clearInterval(moveUpdateInterval);
  });

  useEffect(() => {
    setSnake([
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]);
    setFood({ x: 10, y: 10 });
    lastMoveRef.current = "s";
    setScore(0);
  }, [gameReset]);

  return (
    <>
      <div className="relative w-11/12 h-[25rem] md:w-[35rem] md:h-[35rem] bg-clr-950 mx-auto grid grid-cols-20 grid-rows-20">
        <button
          onClick={() => {
            !isPaused && PauseSFX.play();
            setIsPaused((prevState) => !prevState);
          }}
          className="absolute top-4 right-4 p2 w-4 h-4"
        >
          <img src={PauseIcon} alt="pause" />
        </button>
        {Array.from({ length: 20 * 20 }).map((_, index) => {
          const row = Math.floor(index / 20);
          const col = index % 20;
          const isSnakePart = snake.some(
            (part) => part.y === row && part.x === col
          );
          const isHead = snake[0].y === row && snake[0].x === col;
          const isFood = food.y === row && food.x === col;

          return (
            <div
              key={index}
              className={`${
                isSnakePart
                  ? isHead
                    ? "bg-clr-100/40"
                    : "bg-clr-100"
                  : isFood
                  ? "bg-clr-600"
                  : ""
              }`}
            ></div>
          );
        })}

        {gameOver && (
          <GameOver
            setGameReset={setGameReset}
            setIsPlaying={setIsPlaying}
            setGameOver={setGameOver}
          />
        )}
        {isPaused && (
          <PauseMenu setIsPaused={setIsPaused} setIsPlaying={setIsPlaying} />
        )}
      </div>
      {window.innerWidth < 1024 && (
        <Gamepad updateLastMoveRef={updateLastMoveRef} />
      )}
    </>
  );
};

export default Canvas;
