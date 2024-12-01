const fps = document.getElementById("fps");
const particlesCount = document.getElementById("particles");

function lerpColor(color1, color2, t) {
  // Extract the RGB components from each color (ensure the values are in range)
  const r1 = (color1 >> 16) & 0xff;
  const g1 = (color1 >> 8) & 0xff;
  const b1 = color1 & 0xff;

  const r2 = (color2 >> 16) & 0xff;
  const g2 = (color2 >> 8) & 0xff;
  const b2 = color2 & 0xff;

  // Lerp each color channel
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));

  // Combine the channels back into a single 24-bit color
  return (r << 16) | (g << 8) | b;
}

class Particle {
  constructor(x, y, w, h, c1, c2) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colorStart = c1; // Store the starting color
    this.colorEnd = c2; // Store the ending color
    this.color = lerpColor(c1, c2, Math.random()); // Initial color based on a random factor
    this.speed = Math.random();
    this.lifeTime = Math.random() * 90;
  }

  draw(ctx) {
    ctx.fillStyle = `rgb(${(this.color >> 16) & 0xff}, ${
      (this.color >> 8) & 0xff
    }, ${this.color & 0xff})`;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update(particles, canvas) {
    this.x += this.speed * Math.cos(this.speed * 10);
    this.y += this.speed * Math.sin(this.speed * 10);

    if (this.x > canvas.width || this.x < 0) {
      this.speed *= -1;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.speed *= -1;
    }

    this.lifeTime -= 1;

    // Calculate the interpolation factor based on remaining lifetime
    const t = Math.max(0, Math.min(1, this.lifeTime / 1000)); // Normalize t to be between 0 and 1

    // Update the color based on the lerp between colorStart and colorEnd
    this.color = lerpColor(this.colorStart, this.colorEnd, t);

    if (this.lifeTime <= 0) {
      particles.splice(particles.indexOf(this), 1);
    }
  }
}
const particelCount = document.getElementById("particles");
function lerp(a, b, t) {
  return a + (b - a) * t;
}

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // spawn particles

  particles.push(new Particle(x, y, 10, 10, 0xff0000, 0xffa500));
});

// Example usage:
const particles = [];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Creating a particle with a color gradient from red to green
particles.push(new Particle(100, 100, 10, 10, 0xff0000, 0x00ff00));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
    particles[i].update(particles, canvas);
  }

  particelCount.innerHTML = particles.length;
  requestAnimationFrame(animate);
}

animate();
