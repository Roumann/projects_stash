export type GameObjectConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  direction: string;
};

export class GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  direction: string;

  constructor(config: GameObjectConfig) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 50;
    this.height = config.height || 50;
    this.speed = config.speed || 1;
    this.direction = config.direction;
  }

  draw(ctx: CanvasRenderingContext2D | null | undefined) {
    if (ctx) {
      ctx.fillStyle = "#fff";
      ctx?.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  move({ direction, speed }: { direction: string; speed: number }) {
    if (direction === "up") {
      this.y -= speed;
    } else if (direction === "down") {
      this.y += speed;
    } else if (direction === "left") {
      this.x -= speed;
    } else if (direction === "right") {
      this.x += speed;
    }
  }
}
