// Text Poster Loop Animation
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

let font;
let textScrolling;

function preload() {
  font = loadFont("JetBrainsMono.ttf");
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(90);
  noStroke();

  textScrolling = new TextScrolling([
    { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 200 },
    { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 320 },
    { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 200 },
    { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 100 },
    { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 100 },
    { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 150 },
    { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 280 },
  ]);
}

function draw() {
  background(0, 150);

  textScrolling.update();
  textScrolling.draw();
}

function getTextBound(text, fontSize) {
  return font.textBounds(text, 0, 0, fontSize);
}

class TextScrolling {
  constructor(row) {
    this.rollList = [];

    let y = 0;
    for (let i = 0; i < row.length; i++) {
      const wordList = row[i].list;
      const fontSize = row[i].fontSize;
      const graphicsList = [];
      const { h } = getTextBound(wordList[0][0], fontSize);
      for (let text of wordList) {
        const textSize = getTextBound(text, fontSize);
        const graphics = createGraphics(textSize.w, h + 8);
        // graphics.background(random(255), random(255), random(255));
        let x = int(map(fontSize, 320, 100, -10, 0));
        graphics.fill(color(random(255), random(255), random(255)));
        for (let char of text.split("")) {
          const path = font.textToPoints(char, x, h, fontSize, {
            sampleFactor: 1,
            simplifyThreshold: 0,
          });
          const charSize = getTextBound(char, fontSize);

          this.typeface3(graphics, path, fontSize);
          x += charSize.w + int(map(fontSize, 320, 100, 24, 6));
        }
        graphicsList.push({ y, graphics, h, text });
      }
      this.rollList.push(new Roll(y, graphicsList));
      y += h;
    }
  }

  update() {
    for (let row of this.rollList) {
      row.update();
    }
  }

  draw() {
    for (let row of this.rollList) {
      row.draw();
    }
  }

  typeface0(graphics, path, fontSize) {
    for (let i = 0; i < path.length; i += int(map(fontSize, 320, 100, 10, 5))) {
      let pos = path[i];
      const fontX = pos.x;
      graphics.noStroke();
      graphics.fill(255);
      const rectSize = int(map(fontSize, 320, 100, 7.5, 3));
      graphics.rect(fontX, pos.y, rectSize, rectSize);
    }
  }

  typeface1(graphics, path, fontSize) {
    graphics.strokeWeight(1);
    graphics.noFill();
    graphics.stroke(255); // 打开就是彩色

    for (
      let d = 0;
      d < int(map(fontSize, 320, 100, 30, 8));
      d += int(map(fontSize, 320, 100, 5, 3))
    ) {
      graphics.beginShape();
      for (let i = 0; i < path.length; i++) {
        let pos = path[i]; // 当前这个点的坐标
        let nextPos = path[i + 1]; // 下一个点的坐标
        if (nextPos) {
          let p0 = createVector(pos.x, pos.y);
          let p1 = createVector(nextPos.x, nextPos.y);
          let v = p5.Vector.sub(p1, p0);
          v.normalize();
          v.rotate(HALF_PI);
          v.mult(d);
          let pneu = p5.Vector.add(p0, v);
          graphics.curveVertex(pneu.x, pneu.y);
        }
      }
      graphics.endShape(CLOSE);
    }
  }

  typeface2(graphics, path, fontSize) {
    graphics.strokeWeight(1);
    graphics.noFill();
    graphics.stroke(random(255), random(255), random(255)); // 打开就是彩色
    for (
      let d = 0;
      d < int(map(fontSize, 320, 100, 30, 8));
      d += int(map(fontSize, 320, 100, 5, 3))
    ) {
      graphics.beginShape();
      for (let i = 0; i < path.length; i++) {
        let pos = path[i]; // 当前这个点的坐标
        let nextPos = path[i + 1]; // 下一个点的坐标
        if (nextPos) {
          let p0 = createVector(pos.x, pos.y);
          let p1 = createVector(nextPos.x, nextPos.y);
          let v = p5.Vector.sub(p1, p0);
          v.normalize();
          v.rotate(PI + random(-0.5, 0.5));
          v.mult(d);
          let pneu = p5.Vector.add(p0, v);
          graphics.curveVertex(pneu.x, pneu.y);
        }
      }
      graphics.endShape(CLOSE);
    }
  }

  typeface3(graphics, path, fontSize) {
    graphics.beginShape();
    for (let i = 0; i < path.length; i++) {
      let pos = path[i]; // 当前这个点的坐标
      let nextPos = path[i + 1]; // 下一个点的坐标
      if (nextPos) {
        let p0 = createVector(pos.x, pos.y);
        let p1 = createVector(nextPos.x, nextPos.y);
        let v = p5.Vector.sub(p1, p0);
        v.normalize();
        let pneu = p5.Vector.add(p0, v);
        graphics.curveVertex(pneu.x, pneu.y);
      }
    }
    graphics.endShape(CLOSE);
  }
}

class Roll {
  constructor(y, graphicsList) {
    this.y = y;
    this.graphicsList = graphicsList;

    this.maxLength = this.graphicsList.length;

    this.currentIndex = 0;
    this.nextIndex = 1;

    this.time = int(random(0, 100));

    this.acc = 1;
  }

  update() {
    this.time = (this.time + this.acc) % 100;

    if (this.time == 99) {
      this.acc = 0;
      this.time = 0;
      setTimeout(() => {
        this.acc = 1;
      }, 1000);
      this.currentIndex += 1;
      this.nextIndex += 1;
      if (this.nextIndex >= this.maxLength) {
        this.nextIndex = 0;
      }
      if (this.currentIndex >= this.maxLength) {
        this.currentIndex = 0;
        this.nextIndex = 1;
      }
    }
  }

  draw() {
    const time = this.time;
    const leftOffset = map(time, 0, 99, 0, width);
    const left = this.graphicsList[this.currentIndex];
    const right = this.graphicsList[this.nextIndex];

    image(left.graphics, 0, this.y, width - leftOffset, left.h);
    image(right.graphics, width - leftOffset, this.y, width, right.h);
  }
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 5);
  }
}
