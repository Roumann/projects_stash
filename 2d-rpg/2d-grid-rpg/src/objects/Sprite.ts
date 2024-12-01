export type SpriteConfig = {
  src: string;
  animations: {
    [key: string]: number[][];
  };
  currentAnimation: string;
};

export class Sprite {
  animations: object;
  currentAnimation: string;
  currentAnimationFrame: number;
  image: string;

  constructor(config: SpriteConfig) {
    this.image = new Image();
    this.image.src = config.src;
    this.animations = config.animations || {
      idleDown: [[0, 0]],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;
  }
}
