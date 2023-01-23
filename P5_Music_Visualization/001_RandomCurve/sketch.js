// Random Curve
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

let fft;
let calmSound;

let pLIST = [];

let grapha;

let currentColor;
let nextColor;
let t = 0;

function preload() {
  // 加载所有的音频资源
  soundFormats("mp3", "ogg");
  calmSound = loadSound("bgm.mp3");
}

function setup() {
  createCanvas(800, 800);
  background(0);

  calmSound.loop();
  calmSound.play();

  // 初始化FFT
  fft = new p5.FFT();
  stroke(random(255), random(255), random(255));

  grapha = createGraphics(width, height);

  currentColor = color(random(255), random(255), random(255));
  nextColor = color(random(255), random(255), random(255));
}

function draw() {
  background(0, 10);
  const waves = fft.waveform();

  for (let i = 0; i < waves.length; i += 10) {
    const x = map(i, 0, waves.length, 0, width);
    const v = map(waves[i], 0, 1, 0, 400);
    // line(x, height / 2, x, height / 2 - v);
    // line(x, height / 2, x, height / 2 + v);

    if (v > 100) {
      if (pLIST.length < int(random(9, 18))) {
        pLIST.push(
          new Practice(
            x,
            height / 2,
            color(random(255), random(255), random(255))
          )
        );
      }
    }
  }

  pLIST = pLIST.filter((item) => item.life > 0);

  push();
  let inter = lerpColor(currentColor, nextColor, map(t, 0, 40, 0, 1));
  stroke(inter);
  if (frameCount % 40 === 0) {
    currentColor = nextColor;
    nextColor = color(random(255), random(255), random(255));
    t = 0;
  }
  noFill();
  beginShape();
  for (const p of pLIST) {
    p.update();
    p.draw();
    curveVertex(p.pos.x, p.pos.y);
  }
  endShape(CLOSE);
  pop();

  // background(10, 5);

  // image(grapha, 0, 0);

  t++;
}

class Practice {
  constructor(x, y, c) {
    this.pos = createVector(x, y);
    this.r = random(2, 4);

    this.c = c;

    this.vec = p5.Vector.random2D();
    this.acc = random(0.991, 1.009);

    this.life = 300;
  }

  update() {
    this.pos.add(this.vec);
    this.vec.mult(this.acc);

    this.life--;
  }

  draw() {
    if (this.life > 0) {
      push();
      noStroke();
      fill(this.c);
      // ellipse(this.pos.x, this.pos.y, this.r);
      pop();
    }
  }
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 10);
  }
}
