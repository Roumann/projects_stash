export class World {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null | undefined;

  constructor() {
    this.canvas = document.querySelector(".game_canvas");
    this.ctx = this.canvas?.getContext("2d");
  }

  init() {
    if (!this.ctx || !this.canvas) {
      return;
    }
  }
}
