// reference: https://www.pinterest.com/pin/300967187615386778/

const wordStr = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890".split("");

const colors = ["#0d6920", "#1c7024", "#36d12e", "#9eb598"];

let font;
function preload() {
  font = loadFont("Regular.otf");
}

const wordList = [];
const particleList = [];
const fontSize = 30;

const gravitations = [];

let cols = 0;
let rows = 0;
const scl = 10;
const inc = 0.1;

let zoff = 0.001;

function setup() {
  createCanvas(600, 600);

  cols = floor(width / scl);
  rows = floor(height / scl);

  const span = 5;
  for (let x = span; x < width + fontSize; x += fontSize + span) {
    for (let y = span; y < height + fontSize; y += fontSize + span) {
      wordList.push(new Word(x, y, int(random(10, 250))));
    }
  }

  for (let i = 0; i < 12; i++) {
    const p = createVector(random(width), random(height));
    const v = createVector(0, 0);
    const a = createVector(0, 0);
    particleList.push(new Particle(p, v, a));
  }
}

function draw() {
  zoff += 0.01;
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols;
      const vec = p5.Vector.fromAngle(3.142);
      vec.setMag(1);
      gravitations[index] = vec;
      xoff += inc;
    }
    yoff += inc;
  }

  background(0);
  for (const p of particleList) {
    p.follow(gravitations);
    p.edge();
    p.update();
    // p.draw();
  }

  wordList.forEach((word) => {
    word.changeColor();
    word.changeWord();
    word.unlight();
    word.update();
    word.draw();
  });
}

class Word {
  constructor(x, y, f) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.w = random(wordStr);
    this.c = color(random(colors));

    this.islight = false;
    this.lastLightFrame = 0;
  }

  changeColor() {
    if (frameCount % int(random(10, 40)) == 0) {
      this.c = color(random(colors));
    }
  }

  changeWord() {
    if (frameCount % this.f == 0) {
      this.w = random(wordStr);
    }
  }

  light() {
    this.islight = true;
    this.lastLightFrame = frameCount + 100;
  }

  unlight() {
    if (this.lastLightFrame > frameCount) {
      this.islight = false;
    }
  }

  update() {
    particleList.forEach((p) => {
      if (p.p.dist(createVector(this.x, this.y)) < fontSize) {
        this.light();
      }
    });
  }

  draw() {
    push();
    textSize(fontSize);
    if (this.islight) {
      const c = color(random(10, 100), 255, random(10, 100));
      fill(c);
      neon(c, 80);
      text(this.w, this.x, this.y);
      neon(c, 60);
      text(this.w, this.x, this.y);
      neon(c, 40);
      text(this.w, this.x, this.y);
      neon(c, 20);
      text(this.w, this.x, this.y);
      neon(c, 10);
      text(this.w, this.x, this.y);
    } else {
      neon(null, 0);
      fill(this.c);
      text(this.w, this.x, this.y);
    }
    pop();
  }
}

class Particle {
  constructor(p, v, a) {
    this.p = p;
    this.v = v;
    this.a = a;

    this.maxV = 4;
  }

  draw() {
    ellipse(this.p.x, this.p.y, 10);
  }

  update() {
    this.v.add(this.a);
    this.v.limit(this.maxV);
    this.p.add(this.v);
    this.a.mult(0);
  }

  edge() {
    if (this.p.x > width) {
      this.p.x = 0;
    }
    if (this.p.x < 0) {
      this.p.x = width;
    }
    if (this.p.y >= height) {
      this.p.y = 0;
    }
    if (this.p.y <= 0) {
      this.p.y = height;
    }
  }

  follow(list) {
    const { x, y } = this.p;
    const forces = list[floor(x / scl) + floor(y / scl) * cols];
    this.applyForce(forces);
  }

  applyForce(force) {
    this.a.add(force);
  }
}

function neon(shadowColor, shadowBlur) {
  drawingContext.shadowBlur = shadowBlur;
  drawingContext.shadowColor = shadowColor;
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 5);
  }
}
