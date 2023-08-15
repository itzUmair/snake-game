const PauseMenu = ({ setIsPaused, setIsPlaying }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center text-clr-100 bg-clr-950 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-lg md:text-2xl ">Game Paused</h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            setIsPaused(false);
          }}
          className=" text-clr-600 hover:bg-clr-100/80 p-2"
        >
          Continue
        </button>
        <button
          onClick={() => setIsPlaying(false)}
          className=" text-clr-600 hover:bg-clr-100/80 p-2"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default PauseMenu;
