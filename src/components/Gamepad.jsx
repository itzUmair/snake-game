import Arrow from "../assets/arrow.svg";

const Gamepad = ({ updateLastMoveRef }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-1/2 md:w-[35rem] m-auto border-clr-900 border-y-4">
      <button
        onClick={() => updateLastMoveRef("a")}
        className="bg-clr-950 p-2 flex-1 active:bg-clr-900 col-start-1 row-start-2"
      >
        <img src={Arrow} alt="Left" className=" -rotate-90 w-5 m-auto " />
      </button>
      <button
        onClick={() => updateLastMoveRef("d")}
        className="bg-clr-950 p-2 flex-1 active:bg-clr-900 col-start-3 row-start-2"
      >
        <img src={Arrow} alt="Right" className=" rotate-90 w-5 m-auto" />
      </button>
      <button
        onClick={() => updateLastMoveRef("w")}
        className="bg-clr-950 p-2 flex-1 active:bg-clr-900 col-start-2 row-start-1"
      >
        <img src={Arrow} alt="Up" className=" rotate-0 w-5 m-auto" />
      </button>
      <button
        onClick={() => updateLastMoveRef("s")}
        className="bg-clr-950 p-2 flex-1 active:bg-clr-900 col-start-2 row-start-3"
      >
        <img src={Arrow} alt="Down" className=" rotate-180 w-5 m-auto" />
      </button>
    </div>
  );
};

export default Gamepad;
