// Text Flowing Animation
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

// reference: https://codepen.io/Mamboleoo/pen/GRJKoBw

let font;
function preload() {
  font = loadFont("Philosopher-Regular.ttf");
}

const fontSize = 270;
const detail = 6;
let particleList = [];
let grid = [];
let ctx;

let fontImage;
let particleImage;

function setup() {
  const canvas = createCanvas(600, 600);
  ctx = canvas.drawingContext;

  pixelDensity(1);

  particleImage = createGraphics(8, 8);
  particleImage.fill(255);
  particleImage.noStroke();
  particleImage.circle(4, 4, 4);

  fontImage = createGraphics(width, height);
  fontImage.textFont(font, fontSize);
  fontImage.fill(255);
  fontImage.background(30);
  fontImage.text("p5.js", 20, height / 2 + fontSize / 3);

  init();
}

function draw() {
  drawFlow();
}

function init() {
  clear();
  ctx.globalAlpha = 1;
  loop();
  image(fontImage, 0, 0, width, height);
  loadPixels();
  clear();
  noStroke();

  grid = [];
  for (let y = 0; y < height; y += detail) {
    let row = [];
    for (let x = 0; x < width; x += detail) {
      const r = pixels[(y * width + x) * 4];
      const g = pixels[(y * width + x) * 4 + 1];
      const b = pixels[(y * width + x) * 4 + 2];
      const _color = color(r, g, b);
      const _brightness = brightness(_color) / 100;
      row.push(_brightness);
    }
    grid.push(row);
  }

  particleList = [];
  for (let i = 0; i < 3000; i++) {
    particleList.push(new Particle(null, (i / 3000) * height));
  }
}

function drawFlow() {
  ctx.globalAlpha = 0.05;
  fill(0);
  rect(0, 0, width, height);
  ctx.globalAlpha = 0.2;
  particleList.forEach((p) => {
    p.update();
    ctx.globalAlpha = p.speed * 0.3;
    p.draw();
  });
}

class Particle {
  constructor(x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.prevX = this.x;
    this.speed = 0;
    this.v = random(0, 0.7);
  }

  update() {
    if (grid.length) {
      this.speed = grid[floor(this.y / detail)][floor(this.x / detail)] * 0.97;
    }
    this.x += (1 - this.speed) * 3 + this.v;

    if (this.x > width) {
      this.x = 0;
    }
  }

  draw() {
    image(particleImage, this.x, this.y);
  }
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 10);
  }
}
