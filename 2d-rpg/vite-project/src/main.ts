import { Player } from "./classes/Player";

const canvas = document.querySelector(".game_canvas") as HTMLCanvasElement;
const ctx = canvas?.getContext("2d");

if (!ctx || !canvas) {
  throw new Error("Canvas not found");
}

const player = new Player({
  x: 100,
  y: 100,
  velX: 4,
  velY: 4,
  direction: "down",
});

player.draw(ctx);

function animate() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);

  player.update(ctx);

  requestAnimationFrame(animate);
}

animate();
