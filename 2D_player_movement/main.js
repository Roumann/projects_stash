const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let LEFT, RIGHT, UP, DOWN;
let balls = [];

let friction = 0.1;

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  sub(v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n) {
    return new Vector2(this.x * n, this.y * n);
  }

  unit() {
    if (this.mag() === 0) {
      return new Vector2(0, 0);
    } else {
      return new Vector2(this.x / this.mag(), this.y / this.mag());
    }
  }

  normal() {
    return new Vector2(-this.y, this.x).unit();
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  drawVec(start_x, start_y, n, color) {
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

class Ball {
  constructor(x, y, r, color) {
    this.pos = new Vector2(x, y);
    this.vel = new Vector2(0, 0);
    this.acc = new Vector2(0, 0);
    this.acceleration = 0.5;
    this.r = r;
    this.color = color;
    this.player = false;
    balls.push(this);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  display() {
    this.vel.drawVec(700, 500, 10, "blue");
    this.acc.unit().drawVec(700, 500, 50, "yellow");
    ctx.beginPath();
    ctx.arc(700, 500, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // moveTo(target, friction) {
  // Calculate the direction vector towards the target
  //   const direction = target.pos.sub(this.pos).unit(); // Ensure `.unit()` normalizes the vector

  //   // Apply acceleration in the direction of the target
  //   this.acc = direction.mult(this.acceleration);

  //   // Update velocity with acceleration
  //   this.vel = this.vel.add(this.acc);

  //   // Apply friction to slow down the ball over time
  //   this.vel = this.vel.mult(1 - friction);

  //   // Update position with velocity
  //   this.pos = this.pos.add(this.vel);
  // }
}
function keyControl(b) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      LEFT = true;
    }
    if (e.key === "ArrowRight") {
      RIGHT = true;
    }
    if (e.key === "ArrowUp") {
      UP = true;
    }
    if (e.key === "ArrowDown") {
      DOWN = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
      LEFT = false;
    }
    if (e.key === "ArrowRight") {
      RIGHT = false;
    }
    if (e.key === "ArrowUp") {
      UP = false;
    }
    if (e.key === "ArrowDown") {
      DOWN = false;
    }
  });

  if (LEFT) {
    b.acc.x = -b.acceleration;
  }
  if (RIGHT) {
    b.acc.x = b.acceleration;
  }
  if (UP) {
    b.acc.y = -b.acceleration;
  }
  if (DOWN) {
    b.acc.y = b.acceleration;
  }
  if (!LEFT && !RIGHT) {
    b.acc.x = 0;
  }
  if (!UP && !DOWN) {
    b.acc.y = 0;
  }

  b.acc = b.acc.unit().mult(b.acceleration);

  b.vel = b.vel.add(b.acc);
  b.vel = b.vel.mult(1 - friction);

  b.pos = b.pos.add(b.vel);
}

function round(num, precision) {
  let factor = 10 ** precision;
  return Math.round(num * factor) / factor;
}

function coll_det_bb(b1, b2) {
  if (b1.r + b2.r >= b2.pos.sub(b1.pos).mag()) {
    return true;
  } else {
    return false;
  }
}

function pen_res_bb(b1, b2) {
  let dist = b1.pos.sub(b2.pos);
  let pen_depth = b1.r + b2.r - dist.mag();
  let pen_res = dist.unit().mult(pen_depth / 2);
  b1.pos = b1.pos.add(pen_res);
  b2.pos = b2.pos.add(pen_res.mult(-1));
}

const ball1 = new Ball(100, 100, 30, "red");
const ball2 = new Ball(200, 200, 30, "blue");
const ball3 = new Ball(300, 100, 30, "blue");
const ball4 = new Ball(100, 300, 30, "blue");
const ball5 = new Ball(300, 300, 30, "blue");

ball1.player = true;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball, index) => {
    if (ball !== ball1) {
      ball.moveTo(ball1, friction);
    }

    ball.draw();
    if (ball.player === true) {
      keyControl(ball);
    }
    for (let i = index + 1; i < balls.length; i++) {
      if (coll_det_bb(balls[index], balls[i])) {
        pen_res_bb(balls[index], balls[i]);
      }
    }
    ball.display();
  });

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
