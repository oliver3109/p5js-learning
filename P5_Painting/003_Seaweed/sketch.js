// Seaweed
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches
ChihYungChang;

const branchList = [];

function setup() {
  createCanvas(1024, 728);
  background("#00866d");

  angleMode(DEGREES);

  for (let i = 0; i < 10; i++) {
    const b = new Branch({
      location: createVector(random(width), height),
      length: int(random(height / 3, height / 1.2)),
      c: color("#91b20c"),
      style: "line",
    });
    branchList.push(b);
  }

  for (const b of branchList) {
    b.draw();
  }
}

function draw() {}
