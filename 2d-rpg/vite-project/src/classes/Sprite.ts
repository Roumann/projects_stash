import { GameObject } from "./GameObject";

type SpriteConfig = {
  animations?: {
    [key: string]: Array<[number, number]>;
  };
  currentAnimation?: string;
  currentAnimationFrame?: number;
  image?: HTMLImageElement;
  src: string;
  isLoaded?: boolean;
  gameObject: GameObject;
};

export class Sprite {
  image: HTMLImageElement;
  animations: {
    [key: string]: Array<[number, number]>;
  };
  currentAnimation: string;
  currentAnimationFrame: number;
  isLoaded: boolean = false;
  gameObject: GameObject;

  constructor(config: SpriteConfig) {
    this.image = new Image();
    this.image.src = config.src || "";
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.animations = config.animations || {
      idleDown: [[0, 0]],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    // reference to the game object
    this.gameObject = config.gameObject;
  }

  draw(ctx: CanvasRenderingContext2D | null | undefined) {
    const x = this.gameObject.x;
    const y = this.gameObject.y;

    this.isLoaded && ctx?.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
