import { useEffect, useState } from "react";

const Canvas = () => {
  const [snake, setSnake] = useState([
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);

  const [gameSettings, setGameSettings] = useState({
    gameSpeed: 4,
  });

  const [moveCooldown, setMoveCooldown] = useState(false);

  const [lastMove, setLastMove] = useState("d");

  const isBitingSelf = () => {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
      }
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
      return false;
    } else if (isBitingSelf()) {
      return false;
    }
    return true;
  };

  const updateSnake = () => {
    if (!gameRunning()) {
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
    tempSnake.pop();
    setSnake(tempSnake);
  };

  const updateLastMove = (e) => {
    if (moveCooldown) return;
    if (lastMove === "d" && e.key !== "a") {
      setLastMove(e.key);
      return;
    } else if (lastMove === "s" && e.key !== "w") {
      setLastMove(e.key);
      return;
    } else if (lastMove === "a" && e.key !== "d") {
      setLastMove(e.key);
      return;
    } else if (lastMove === "w" && e.key !== "s") {
      setLastMove(e.key);
      return;
    }
  };
  useEffect(() => {
    const gameLoop = setInterval(updateSnake, 50 * gameSettings.gameSpeed);

    return () => {
      clearInterval(gameLoop);
    };
  });

  useEffect(() => {
    const keyListener = window.addEventListener("keydown", updateLastMove);
    return () => window.removeEventListener("keydown", keyListener);
  });

  return (
    <div className="relative w-11/12 h-[25rem] md:w-[35rem] md:h-[35rem] bg-clr-950 mx-auto grid grid-cols-20 grid-rows-20">
      {Array.from({ length: 20 * 20 }).map((_, index) => {
        const row = Math.floor(index / 20);
        const col = index % 20;
        const isSnakePart = snake.some(
          (part) => part.y === row && part.x === col
        );
        const isHead = snake[0].y === row && snake[0].x === col;

        return (
          <div
            key={index}
            className={`${
              isSnakePart ? (isHead ? "bg-clr-100/40" : "bg-clr-100") : ""
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default Canvas;
