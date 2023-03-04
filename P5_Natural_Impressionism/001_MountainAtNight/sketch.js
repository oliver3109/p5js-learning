// Mountain At Night
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

function setup() {
  createCanvas(728, 1024);
  background("#154d7d");

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      const n = noise(x / 80, y / 80, 1);
      const c = lerpColor(color("#05091e"), color("#1c5587"), n);
      const c2 = lerpColor(c, color("#091423"), map(y, 0, height - 100, 0, 1));

      stroke(c2);
      point(x, y, 1);

      if (random() < 0.003) {
        stroke("#fff");
        point(x, y, 1);
      }
    }
  }

  drawMountain();
  drawMoon();
}

function drawMoon() {
  push();
  fill("#bfb0a6");
  const x = random(200, 400);
  const y = random(200, 300);
  translate(x, y);
  const r = 70;
  const pos = createVector(0, 0);
  ellipse(0, 0, r * 2);
  for (let x = -r; x < r; x++) {
    for (let y = -r; y < r; y++) {
      if (pos.dist(createVector(x, y)) <= r) {
        const n = noise(x / -20, y / -30, 1);
        const c = lerpColor(color("#bfb0a6"), color("#faf6f2"), n);
        stroke(c);
        point(x, y);
      }
    }
  }

  pop();
}

function drawMountain() {
  push();
  noStroke();

  const cList = [
    "#233f49",
    "#f4f1f2",
    "#dbe5e4",
    "#efecbb",
    "#7cada4",
    "#64733e",
  ];
  for (let i = 0; i < 6; i++) {
    fill(color(cList[i]));
    const stage = i; // 阶段

    const h = map(stage, 0, 6, height / 2, height / 12);

    const posList = [];
    for (let x = 0; x < width; x += 4) {
      const n = noise(h, x / 100);
      if (x == 0) {
        posList.push(createVector(0, n));
      } else {
        if (random() < 0.2) {
          posList.push(createVector(x, n));
        }
      }
      if (x + 4 >= width) {
        posList.push(createVector(width, n));
      }
    }

    beginShape();
    let startPos = null;
    let index = 0;
    for (const pos of posList) {
      if (index === 0) {
        startPos = pos;
      }
      vertex(pos.x, height - (h + pos.y * 200));
      index++;
    }
    vertex(width, height);
    vertex(0, height);
    vertex(startPos.x, height - (h + startPos.y * 200));
    endShape(CLOSE);
  }

  pop();
}

function drawPine() {
  for (let i = 0; i < width; i++) {}
}
