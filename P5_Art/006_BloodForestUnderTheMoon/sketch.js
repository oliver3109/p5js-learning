// Blood Forest Under The Moon
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

const branchList = [];
const branchList2 = [];

function setup() {
  createCanvas(1706, 1706);
  colorMode(HSB, 360, 100, 100, 100);
  background(color(0, 100, 100, 100));

  for (let i = 0; i < 20; i++) {
    let fillColor = [0, 40, random(10, 50), 50];
    branchList.push(
      new Branch({
        pos: createVector((width / 20) * i, height + random(50, 200)),
        length: height * random(0.4, 0.5),
        latitude: random(20, 50),
        fillColor: color(...fillColor),
        angle: random(-10, 10),
        leafColor: color(...fillColor),
        leafStrokeColor: color(...fillColor),
        leafMinLength: 70,
        leafMaxLength: 100,
        leafDensity: 3,
      })
    );
  }

  for (let i = 0; i < 10; i++) {
    let fillColor = [random(0, 10), random(60, 90), 100, 90];
    branchList2.push(
      new Branch({
        pos: createVector((width / 10) * i, height + random(100, 300)),
        length: height * random(0.3, 0.55),
        latitude: random(5, 10),
        fillColor: color(...fillColor),
        angle: random(-15, 15),
        leafColor: color(...fillColor),
        leafStrokeColor: color(...fillColor),
        leafMinLength: 50,
        leafMaxLength: 70,
        leafDensity: 2,
      })
    );
  }

  // filter1 = new makeFilter(1);
}

function draw() {
  for (const branch of branchList) {
    branch.draw();
  }

  noStroke();
  fill(59, 20, 100, 80);
  ellipse(width / 2 + random(-300, 200), random(200, 650), 900, 900);

  for (const branch of branchList2) {
    branch.draw();
  }

  // image(overAllTexture, 0, 0);
  noLoop();
}
