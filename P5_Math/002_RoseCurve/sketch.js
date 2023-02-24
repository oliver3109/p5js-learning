// Rose Curve
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches
ChihYungChang;

let span = 10;
let len = 50;
let stepY = (len + span) * 2;
let stepX = (len + span) * 2;

function setup() {
  createCanvas(800, 800);
  background(random(255), random(255), random(255));
  strokeWeight(2);
  stroke(random(255), random(255), random(255));
  fill(random(255), random(255), random(255));
}

function draw() {
  for (let startY = len + span; startY < height - span; startY += stepY) {
    for (let startX = len + span; startX < width - span; startX += stepX) {
      push();
      translate(startX, startY);
      beginShape();
      const k = int(random(2, 9)); // 如果k是偶数，玫瑰线就有2k个瓣，如果k是奇数，则有k个瓣
      const r = len; // 半径
      const count = 1000;
      for (let i = 0; i < count; i += 1) {
        const angle = (TWO_PI / len) * i;
        const x = r * sin(k * angle) * cos(angle);
        const y = r * sin(k * angle) * sin(angle);
        curveVertex(x, y);
      }
      endShape(CLOSE);
      pop();
    }
  }
  noLoop();
}
