// Text Particle Loop Animation
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

let font;
function preload() {
  font = loadFont("Regular.otf");
}

const fontSize = 330;

const particleList = [];

function setup() {
  createCanvas(800, 600);

  noStroke(255);

  let path = font.textToPoints(
    "2023",
    70,
    height / 2 + fontSize / 3,
    fontSize,
    {
      sampleFactor: 0.5,
    }
  );

  for (const vec of path) {
    if (random() < 0.5) {
      particleList.push(
        new Particle({
          x: random(width),
          y: random(height),
          targetX: vec.x,
          targetY: vec.y,
        })
      );
    }
  }
}

function draw() {
  background(0, 50);
  for (const p of particleList) {
    p.move();
    p.draw();
  }
}

class Particle {
  constructor(config) {
    this.startX = config.x;
    this.startY = config.y;

    this.targetPos = createVector(config.targetX, config.targetY);

    this.startPos = createVector(config.x, config.y);

    this.pos = createVector(config.x, config.y);

    this.acc = createVector(0, 0);

    this.c = color(255, random(255), random(255));
  }

  move() {
    push();
    translate(this.startPos.x, this.startPos.y);
    let force = p5.Vector.sub(this.targetPos, this.startPos);
    this.pos.add(force.div(100).mult(sin(frameCount / 50)));
    pop();
  }

  draw() {
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, random(1, 10));
  }
}
