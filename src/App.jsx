import { useState } from "react";
import Canvas from "./components/Canvas";
import Titlebar from "./components/Titlebar";

function App() {
  const [score, setScore] = useState(0);
  return (
    <>
      <Titlebar score={score} />
      <Canvas score={score} setScore={setScore} />
    </>
  );
}

export default App;
