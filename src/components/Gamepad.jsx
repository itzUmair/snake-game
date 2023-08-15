import Arrow from "../assets/arrow.svg";

const Gamepad = ({ updateLastMoveRef }) => {
  return (
    <div className="flex w-11/12 md:w-[35rem] m-auto">
      <button
        onClick={() => updateLastMoveRef("a")}
        className="bg-clr-950 p-2 flex-1"
      >
        <img src={Arrow} alt="Left" className=" -rotate-90 w-8 m-auto" />
      </button>
      <button
        onClick={() => updateLastMoveRef("d")}
        className="bg-clr-950 p-2 flex-1"
      >
        <img src={Arrow} alt="Right" className=" rotate-90 w-8 m-auto" />
      </button>
      <button
        onClick={() => updateLastMoveRef("w")}
        className="bg-clr-950 p-2 flex-1"
      >
        <img src={Arrow} alt="Up" className=" rotate-0 w-8 m-auto" />
      </button>
      <button
        onClick={() => updateLastMoveRef("s")}
        className="bg-clr-950 p-2 flex-1"
      >
        <img src={Arrow} alt="Down" className=" rotate-180 w-8 m-auto" />
      </button>
    </div>
  );
};

export default Gamepad;
