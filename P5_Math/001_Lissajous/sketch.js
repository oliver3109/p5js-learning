// Lissajous
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

let p = 1;
let q = 1;

function setup() {
  createCanvas(1200, 1200);
  background(0);
  noFill();
  stroke("#ff00ff");
  strokeWeight(2);
}

function getProportion(p, q) {
  if (p != q) return { p, q };
  p = int(random(1, 9));
  q = int(random(1, 9));
  return getProportion(p, q);
}

function draw() {
  background(0);
  for (let startY = len + span; startY < height + span; startY += stepY) {
    for (let startX = len + span; startX < width + span; startX += stepX) {
      push();
      translate(startX, startY);
      const proportion = getProportion(p, q);

      beginShape();
      let total = 100;
      for (let i = 0; i < total; i += 1) {
        let angolo = (i / total) * TWO_PI;
        let x = sin(angolo * proportion.p) * len;
        let y = sin(angolo * proportion.q) * len;
        curveVertex(x, y);
      }
      endShape();
      pop();
    }
  }
  noLoop();
}
