// Triangle Nested Pattern
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

const COLOR = [
  "#4e1256",
  "#edb478",
  "#4ebbb5",
  "#ea7527",
  "#d3313d",
  "#eb91ab",
  "#7e358c",
  "#f1dec7",
  "#000000",
];

function setup() {
  createCanvas(1600, 1800);
  background(0);

  let totalCount = 0;
  const sideLen = random(150, 250);
  const h = calcTriangleHeight(sideLen);
  let yCount = 1;
  for (let y = 0; y < height; y += h) {
    let xCount = 0;
    if (yCount % 2 == 0) {
      xCount = 1;
    } else {
      xCount = 2;
    }
    let type;
    for (let x = 0; x < width + sideLen / 2; x += sideLen / 2) {
      if (xCount % 2 == 0) {
        type = "negative";
      } else {
        type = "positive";
      }
      const pos = createVector(x, y);
      new MyTriangle(pos, type, sideLen, totalCount).draw();
      xCount++;
      totalCount++;
    }
    yCount++;
  }
}

function calcTriangleHeight(sideLen) {
  return (sideLen / 2) * sqrt(3);
}

class MyTriangle {
  constructor(pos, type, sideLen, count) {
    this.pos = pos;
    this.sideLen = sideLen;
    this.type = type;
    // this.c = COLOR[count % (COLOR.length)];
    this.c = random(COLOR);
    this.count = count;
    this.h = calcTriangleHeight(this.sideLen);
  }

  draw() {
    push();
    stroke(this.c);
    translate(this.pos.x, this.pos.y + this.h);
    fill(this.c);

    if (this.type === "positive") {
      beginShape(TRIANGLES);
      vertex(-this.sideLen / 2, 0);
      vertex(this.sideLen / 2, 0);
      vertex(0, -this.h);
      endShape();
    }
    if (this.type === "negative") {
      beginShape(TRIANGLES);
      vertex(0, 0);
      vertex(-this.sideLen / 2, -this.h);
      vertex(this.sideLen / 2, -this.h);
      endShape();
    }

    const combination = [
      // ['empty', 'patten1'],
      // ['patten1', 'patten2'],
      // ['patten1', 'patten2', 'patten3'],
      ["patten1", "patten2", "patten3", "patten4"],
    ];
    const funName = random(random(combination));
    this[funName]();
    pop();
  }

  empty() {}

  patten1() {
    push();
    if (this.type === "positive") {
      const newC = random(COLOR.filter((item) => item != this.c));
      fill(newC);
      stroke(newC);
      const newSideLen = this.sideLen / 2;
      const newH = calcTriangleHeight(newSideLen);
      translate(0, -(this.h - newH) / 3);
      beginShape(TRIANGLES);
      vertex(-newSideLen / 2, 0);
      vertex(newSideLen / 2, 0);
      vertex(0, -newH);
      endShape();
    }
    if (this.type === "negative") {
      const newC = random(COLOR.filter((item) => item != this.c));
      fill(newC);
      stroke(newC);
      const newSideLen = this.sideLen / 2;
      const newH = calcTriangleHeight(newSideLen);
      translate(0, -(this.h - newH) / 1.5);
      beginShape(TRIANGLES);
      vertex(0, 0);
      vertex(-newSideLen / 2, -newH);
      vertex(newSideLen / 2, -newH);
      endShape();
    }
    pop();
  }

  patten2() {
    push();
    let posList = [];
    if (this.type === "positive") {
      for (
        let x = -this.sideLen / 2;
        x < this.sideLen / 2;
        x += this.sideLen / 5
      ) {
        posList.push(x);
      }
      for (let i = 0; i < posList.length - 1; i++) {
        const newC = random(COLOR.filter((item) => item != this.c));
        stroke(newC);
        fill(newC);
        beginShape(TRIANGLES);
        vertex(posList[i], 0);
        vertex(posList[i + 1], 0);
        vertex(0, -this.h);
        endShape();
      }
    }
    if (this.type === "negative") {
      for (
        let x = -this.sideLen / 2;
        x < this.sideLen / 2;
        x += this.sideLen / 5
      ) {
        posList.push(x);
      }
      for (let i = 0; i < posList.length - 1; i++) {
        const newC = random(COLOR.filter((item) => item != this.c));
        stroke(newC);
        fill(newC);
        beginShape(TRIANGLES);
        vertex(0, 0);
        vertex(posList[i], -this.h);
        vertex(posList[i + 1], -this.h);
        endShape();
      }
    }
    pop();
  }

  patten3() {
    push();
    if (this.type === "negative") {
      const newC = random(COLOR.filter((item) => item != this.c));
      fill(newC);
      stroke(newC);
      const newSideLen = this.sideLen / 4;
      const newH = calcTriangleHeight(newSideLen);
      translate(0, -(this.h - newH) / 1.29);
      beginShape(TRIANGLES);
      vertex(-newSideLen / 2, 0);
      vertex(newSideLen / 2, 0);
      vertex(0, -newH);
      endShape();
    }
    if (this.type === "positive") {
      const newC = random(COLOR.filter((item) => item != this.c));
      fill(newC);
      stroke(newC);
      const newSideLen = this.sideLen / 4;
      const newH = calcTriangleHeight(newSideLen);
      translate(0, -(this.h - newH) / 4.5);
      beginShape(TRIANGLES);
      vertex(0, 0);
      vertex(-newSideLen / 2, -newH);
      vertex(newSideLen / 2, -newH);
      endShape();
    }
    pop();
  }

  patten4() {
    this.patten1();
    this.patten3();
  }
}
