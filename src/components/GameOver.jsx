import Start from "../assets/start.mp3";

const StartSFX = new Audio(Start);
StartSFX.load();

const GameOver = ({ setGameReset, setIsPlaying, setGameOver }) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-clr-100 text-center flex flex-col items-center justify-center gap-8">
      <div className="bg-clr-950">Game Over!</div>
      <div className="bg-clr-950 flex flex-col items-center gap-4">
        <button
          onClick={() => {
            StartSFX.play();
            setGameOver(false);
            setGameReset((prevState) => prevState + 1);
          }}
          className="text-xs text-clr-600 hover:bg-clr-100/80 p-2"
        >
          Play Again
        </button>
        <button
          onClick={() => setIsPlaying(false)}
          className="text-xs text-clr-600 hover:bg-clr-100/80 p-2"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default GameOver;
