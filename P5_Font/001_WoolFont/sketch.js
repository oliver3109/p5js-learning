// Wool Font
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

const shapeColor = "#000";
const fontSize = 230;

let overAllTexture;
let font;
function preload() {
  font = loadFont("Regular.otf");
}

class Letter {
  constructor(char, x, y, angle) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  draw() {
    let path = font.textToPoints(this.char, this.x, this.y, fontSize, {
      sampleFactor: 0.5,
    });
    stroke(shapeColor);
    stroke(random(255), random(255), random(255)); // 打开就是彩色
    for (let d = 0; d < 20; d += 4) {
      beginShape();
      for (let i = 0; i < path.length; i++) {
        let pos = path[i]; // 当前这个点的坐标
        let nextPos = path[i + 1]; // 下一个点的坐标
        if (nextPos) {
          let p0 = createVector(pos.x, pos.y);
          let p1 = createVector(nextPos.x, nextPos.y);
          let v = p5.Vector.sub(p1, p0);
          v.normalize();
          v.rotate(this.angle + random(-10, 10));
          v.mult(-d);
          let pneu = p5.Vector.add(p0, v);
          curveVertex(pneu.x, pneu.y);
        }
      }
      endShape(CLOSE);
    }
  }
}

const textTyped = "p 5 j s";
const letters = [];
function createLetters() {
  let chars = textTyped.split("");
  let x = 0;
  for (let i = 0; i < chars.length; i++) {
    if (i > 0) {
      let charsBefore = textTyped.substring(0, i);
      x = font.textBounds(charsBefore, 0, 0, fontSize).w + 10;
      console.log(x);
    }
    let newLetter = new Letter(chars[i], x, height / 2, PI);
    letters.push(newLetter);
  }
}

function setup() {
  createCanvas(600, 600);
  background(20, 20, 30);
  strokeWeight(1);
  noFill();
  createLetters();
  makeFilter(1);
  image(overAllTexture, 0, 0);
  translate(30, fontSize / 4);
  for (const item of letters) {
    item.draw();
  }
}
