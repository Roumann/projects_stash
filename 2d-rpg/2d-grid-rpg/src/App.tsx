import { useRef, useEffect } from "react";
import "./App.css";
import { RenderWorld } from "./objects/RenderWorld";
import { CreatePlayer } from "./objects/player";

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const player = CreatePlayer({ canvas, x: 100, y: 100 });

  useEffect(() => {
    RenderWorld({ canvas });
    player?.draw(canvas.current?.getContext("2d"));
  }, []);

  const animate = () => {
    player?.move({ direction: "down", speed: 1 });
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  return (
    <>
      <canvas ref={canvas} width="800" height="600"></canvas>
    </>
  );
}

export default App;
