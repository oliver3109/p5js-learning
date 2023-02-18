// Color Tree
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

const TREE_THEME = [
  {
    type: 0,
    name: "土黄",
    treeBrunchColor: "#6a524c",
    treeLeafColor: "#5c4841",
    leafStrokeColor: "#47332c",
  },
  {
    type: 1,
    name: "棕红",
    treeBrunchColor: "#5e3737",
    treeLeafColor: "#583333",
    leafStrokeColor: "#442020",
  },
  {
    type: 2,
    name: "紫色妖姬",
    treeBrunchColor: "#171421",
    treeLeafColor: "#9885c7",
    leafStrokeColor: "#3c305d",
  },
  {
    type: 3,
    name: "白色妖姬",
    treeBrunchColor: "#e4e1eb",
    treeLeafColor: "#d6d1e3",
    leafStrokeColor: "#9a8fb5",
  },
  {
    type: 4,
    name: "负片",
    treeBrunchColor: "#f0edf5",
    treeLeafColor: "#c6bfd9",
    leafStrokeColor: "#3c305d",
  },
];

const branchList = [];

function setup() {
  createCanvas(1280, 1706);
  background("#352f2f");

  // for (let x = 0; x < width; x += 1) {
  //   for (let y = 0; y < height; y += 1) {
  //     const n = noise(x / 80, y / 80, 1);
  //     const c = lerpColor(color("#05091e"), color("#1c5587"), n);
  //     const c2 = lerpColor(c, color("#091423"), map(y, 0, height - 100, 0, 1));

  //     stroke(c2);
  //     point(x, y, 1);

  //     if (random() < 0.003) {
  //       stroke("#fff");
  //       point(x, y, 1);
  //     }
  //   }
  // }

  stroke(255);
  strokeWeight(2);
  for (let y = 0; y < height; y += 40) {
    line(0, y, width, y);
  }

  for (let i = 0; i < 10; i++) {
    const theme = random(TREE_THEME);

    let length = random(500, 700);
    let latitude = random(8, 18);
    if (theme.type == 3) {
      length = random(500, 800);
    }
    if (theme.type == 3) {
      latitude = random(8, 15);
    }

    branchList.push(
      new Branch001({
        pos: createVector(random(width), height),
        length: length,
        latitude: random(20, 50),
        fillColor: color(theme.treeBrunchColor),
        angle: random(-5, 5),
        leafColor: theme.treeLeafColor,
        leafStrokeColor: theme.leafStrokeColor,
      })
    );
  }
}

function draw() {
  for (const branch of branchList) {
    branch.draw();
  }
  noLoop();
}
