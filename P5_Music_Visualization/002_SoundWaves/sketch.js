// Sound Waves
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

let bgm;
let fft;

let kMax;
let step;
let n = 6;
let radius = 99;
let inter = 2;
let maxNoise = 555;

let noiseProg = (x) => x * x;

function preload() {
  // 加载所有的音频资源
  soundFormats("mp3", "ogg");
  bgm = loadSound("bgm.mp3");
}

function setup() {
  createCanvas(1000, 1000);

  bgm.loop();
  bgm.play();

  // 初始化FFT
  fft = new p5.FFT();

  colorMode(HSB, 1);
  angleMode(DEGREES);
  noFill();
  // noLoop();
  kMax = random(6, 20);
  step = 0.01;
}

function draw() {
  background(0, 0.08);

  for (let i = 0; i < n; i++) {
    let alpha = noiseProg(i / n) + 0.5;

    let size = radius + i * random(9, 33);
    stroke(map(i, 0, n, 0.2, 1), 1, 1, alpha);
    let k = kMax * sqrt(i / n);
    let noisiness = maxNoise * noiseProg(i / n);
    blob(size, width / 2, height / 2, k, i * step, noisiness);
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  const waves = fft.waveform();
  beginShape();
  let angleStep = 360 / 500;
  for (let theta = 0; theta < 360; theta += angleStep) {
    let r1, r2;
    r1 = cos(theta) + 1;
    r2 = sin(theta) + 1;
    const i = int(map(theta, 0, 360, 0, waves.length));
    _noisiness = map(waves[i], 0, 1, 10, noisiness);
    let r = size + noise(k * r1, k * r2, t) * _noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 5);
  }
}
