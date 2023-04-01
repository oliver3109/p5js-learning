let capture = null;
let cacheGraphics = null;

let particleImage;

let particleList = [];
let grid = [];
const detail = 10;
let ctx;

let button;

let modeType = 1;

function setup() {
  let canvas = createCanvas(1000, 1000);
  ctx = canvas.drawingContext;
  noStroke();
  pixelDensity(1);

  capture = createCapture(VIDEO);
  capture.size(1000, 1000);
  cacheGraphics = createGraphics(1000, 1000);
  cacheGraphics.translate(1000, 0);
  cacheGraphics.scale(-1, 1);
  capture.hide();

  particleImage = createGraphics(16, 16);
  particleImage.fill(255);
  particleImage.noStroke();
  particleImage.circle(8, 8, 8);

  particleList = [];
  for (let i = 0; i < 10000; i++) {
    particleList.push(new Particle(null, (i / 10000) * height));
  }

  button = createButton("切换模式");
  button.position(0, 0);
  button.style("width", "100px");
  button.style("height", "30px");
  button.mousePressed(changeBG);
}

function changeBG() {
  if (modeType == 1) {
    modeType = 2;
  } else {
    modeType = 1;
  }
}

function init() {
  cacheGraphics.image(capture, 0, 0);
  cacheGraphics.loadPixels();

  grid = [];
  for (let y = 0; y < height; y += detail) {
    let row = [];
    for (let x = 0; x < width; x += detail) {
      const r = cacheGraphics.pixels[(y * width + x) * 4];
      const g = cacheGraphics.pixels[(y * width + x) * 4 + 1];
      const b = cacheGraphics.pixels[(y * width + x) * 4 + 2];
      const _color = color(r, g, b);
      const _brightness = brightness(_color) / 200;
      row.push({ v: _brightness, c: _color });
    }
    grid.push(row);
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

function draw() {
  init();

  drawFlow();
}

class Particle {
  constructor(x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.prevX = this.x;
    this.speed = 0;
    this.v = random(0.1, 3);
    this.c = null;
  }

  update() {
    const { v, c } = grid[floor(this.y / detail)][floor(this.x / detail)];
    this.c = c;
    if (grid.length) {
      this.speed = v * 0.97;
    }
    this.x += (1 - this.speed) * 3 + this.v;

    if (this.x > width) {
      this.x = 0;
    }
  }

  draw() {
    if (modeType == 1) {
      image(particleImage, this.x, this.y);
    } else {
      fill(this.c);
      circle(this.x, this.y, 10);
    }
  }
}
