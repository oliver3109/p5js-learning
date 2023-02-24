// Blood Forest Under The Moon 2
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches
ChihYungChang;

const branchList = [];
const branchList2 = [];
const leafList = [];
const leafList2 = [];
const horizonHeight = 1706 * 0.5;

// 滤镜材质
let overAllTexture;

function setup() {
  createCanvas(1706, 1706);
  background(color("#1c0404"));
  const bgC1 = color("#1c0404");
  const bgC2 = color("#ca0604");
  setGradient(width / 2, height / 2 - 200, 1706, bgC1, bgC2);
  overAllTexture = makeFilter(2);
  createLeaves();
  createTreesInTheNearby();
  createTreesInTheDistance();
}

function createLeaves() {
  for (let i = 0; i < 10000; i++) {
    const leafPos = createVector(
      random(width),
      random(height - horizonHeight, height)
    );
    const leafLength = map(leafPos.y, height - horizonHeight, height, 20, 190);
    const hRate = map(leafPos.y, height - 300, height - horizonHeight, 0, 1);
    let leafColor1 = color("#000000");
    let leafColor2 = color("#6b0709");
    let leafFillColor = lerpColor(leafColor1, leafColor2, hRate);
    leafList.push(
      new Leaf({
        length: leafLength,
        x: leafPos.x,
        y: leafPos.y,
        angle: random(360),
        fillColor: leafFillColor,
        strokeColor: leafFillColor,
        debugMode: false,
        textureMode: false,
        sWeight: 1,
      })
    );
  }
}

function createTreesInTheDistance() {
  for (let i = 0; i < int(random(7, 11)); i++) {
    const treePos = createVector(
      random(300, width - 300),
      height - horizonHeight + random(0, 150)
    );

    let wRate;
    if (treePos.x < width / 2) {
      wRate = map(treePos.x, 0, width / 2, 0, 1);
    } else {
      wRate = map(treePos.x, width / 2, width, 1, 0);
    }
    let treeFillC1 = color("#000000");
    let treeFillC2 = color("#650708");
    let treeFillColor = lerpColor(treeFillC1, treeFillC2, wRate);

    for (let j = 0; j < int(random(30, 40)); j++) {
      const leafLength = map(
        treePos.y,
        height - horizonHeight,
        height,
        20,
        190
      );
      leafList2.push(
        new Leaf({
          length: leafLength,
          x: random(treePos.x - 100, treePos.x + 100),
          y: random(treePos.y - 10, treePos.y + 50),
          angle: random(360),
          fillColor: treeFillColor,
          strokeColor: treeFillColor,
          debugMode: false,
          textureMode: false,
          sWeight: 1,
        })
      );
    }

    branchList2.push(
      new Branch({
        pos: treePos,
        length: height * random(0.5, 0.7),
        latitude: random(20, 40),
        fillColor: color(treeFillColor),
        angle: random(-5, 5),
        leafColor: color(treeFillColor),
        leafStrokeColor: color(treeFillColor),
        leafMinLength: 10,
        leafMaxLength: 20,
        leafDensity: int(random(2, 7)),
        isMain: false,
      })
    );
  }
}

function createTreesInTheNearby() {
  let fillColor = color("#000000");

  for (let i = 0; i < 2; i++) {
    branchList.push(
      new Branch({
        pos: createVector(random(10, 30), height - 200),
        length: height * random(0.7, 1),
        latitude: random(80, 100),
        fillColor: color(fillColor),
        angle: random(5, 14),
        leafColor: color(fillColor),
        leafStrokeColor: color(fillColor),
        leafMinLength: 20,
        leafMaxLength: 40,
        leafDensity: 0,
        isMain: false,
      })
    );
  }

  for (let i = 0; i < 4; i++) {
    branchList.push(
      new Branch({
        pos: createVector(
          random(width - 400, width),
          height - random(200, 300)
        ),
        length: height,
        latitude: random(60, 80),
        fillColor: color(fillColor),
        angle: random(-2, 2),
        leafColor: color(fillColor),
        leafStrokeColor: color(fillColor),
        leafMinLength: 20,
        leafMaxLength: 40,
        leafDensity: random([1, 2, 3, 4]),
        isMain: false,
      })
    );
  }
}

function setGradient(x, y, r, c1, c2) {
  noFill();
  for (let i = r; i > 0; i -= 0.5) {
    let inter = map(i, r, 0, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    circle(x, y, i);
  }
}

function draw() {
  for (const leaf of leafList) {
    leaf.draw();
  }
  for (const branch of branchList2) {
    branch.draw();
  }
  for (const leaf of leafList2) {
    leaf.draw();
  }
  for (const branch of branchList) {
    branch.draw();
  }

  // 在当前画布基础上 覆盖3次滤镜
  for (let i = 0; i < 3; i++) {
    image(overAllTexture, 0, 0);
  }

  noLoop();
}
