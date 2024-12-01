import { Player } from "./Player";

type KeyMovementConfig = {
  player: Player;
};

export class KeyMovement {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;

  player: Player;

  constructor(config: KeyMovementConfig) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.player = config.player;
  }

  updatePosition() {
    this.getHeldDirections();

    let velX = this.player.velX;
    let velY = this.player.velY;

    if ((this.left || this.right) && (this.up || this.down)) {
      // Apply normalization to avoid faster diagonal movement
      const diagonalFactor = Math.sqrt(0.5); // This reduces the velocity by 1/sqrt(2)
      velX *= diagonalFactor;
      velY *= diagonalFactor;
    }
    if (this.left) {
      this.player.x -= velX;
    }
    if (this.right) {
      this.player.x += velX;
    }
    if (this.up) {
      this.player.y -= velY;
    }
    if (this.down) {
      this.player.y += velY;
    }
  }

  getHeldDirections() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.left = true;
      }
      if (event.key === "ArrowRight") {
        this.right = true;
      }
      if (event.key === "ArrowUp") {
        this.up = true;
      }
      if (event.key === "ArrowDown") {
        this.down = true;
      }
    });
    window.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft") {
        this.left = false;
      }
      if (event.key === "ArrowRight") {
        this.right = false;
      }
      if (event.key === "ArrowUp") {
        this.up = false;
      }
      if (event.key === "ArrowDown") {
        this.down = false;
      }
    });
  }
}
