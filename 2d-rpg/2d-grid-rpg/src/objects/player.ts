import { GameObject } from "./gameObject";

export const CreatePlayer = ({
  canvas,
  x,
  y,
}: {
  canvas: React.RefObject<HTMLCanvasElement>;
  x: number;
  y: number;
}) => {
  const ctx = canvas.current?.getContext("2d");
  if (!ctx) return;

  const player = new GameObject({
    x,
    y,
    width: 50,
    height: 50,
    speed: 1,
    direction: "down",
  });

  player.draw(ctx);

  return player;
};
