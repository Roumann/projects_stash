import { GameObject, GameObjectConfig } from "./GameObject";
import { KeyMovement } from "./KeyMovement";

type PlayerConfig = {
  velY?: number;
  velX?: number;
} & GameObjectConfig;

export class Player extends GameObject {
  velY: number;
  velX: number;
  movement: KeyMovement;

  constructor(config: PlayerConfig) {
    super(config);
    this.velY = config.velY || 1;
    this.velX = config.velX || 1;

    this.movement = new KeyMovement({
      player: this,
    });
  }

  draw(ctx: any) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 50, 50);
  }

  update(ctx: any) {
    this.movement.updatePosition();
    this.draw(ctx);
  }
}
