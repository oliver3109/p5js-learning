// Color Tree
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

const TREE_THEME_001 = [
  {
    type: 0,
    name: "土黄",
    treeBrunchColor: "#302724",
    treeLeafColor: "#5c4841",
    leafStrokeColor: "#47332c",
  },
  {
    type: 1,
    name: "棕红",
    treeBrunchColor: "#211a14",
    treeLeafColor: "#c8822c",
    leafStrokeColor: "#442020",
  },

  // {
  //   type: 3,
  //   name: "蓝色妖姬",
  //   treeBrunchColor: "#211a14",
  //   treeLeafColor: "#27b1bc",
  //   leafStrokeColor: "#3c305d",
  // },
];
const TREE_THEME_002 = [
  {
    type: 1,
    name: "绿草",
    treeBrunchColor: "#33401d",
    treeLeafColor: "#678238",
    leafStrokeColor: "#33401d",
  },
  {
    type: 2,
    name: "深绿",
    treeBrunchColor: "#07360c",
    treeLeafColor: "#084d0f",
    leafStrokeColor: "#0a4010",
  },
];

const branchList = [];

function setup() {
  createCanvas(1280, 1706);
  background("#352f2f");
  filter1 = new makeFilter(1);

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

  // stroke(255);
  // strokeWeight(2);
  // for (let y = 0; y < height; y += 40) {
  //   line(0, y, width, y);
  // }

  for (let i = 0; i < 18; i++) {
    if (random() < 0.3) {
      let branch001length = random(500, 800);
      let branch001latitude = random(15, 35);
      const theme = random(TREE_THEME_001);
      branchList.push(
        new Branch001({
          pos: createVector(random(width), height),
          length: branch001length,
          latitude: branch001latitude,
          fillColor: color(theme.treeBrunchColor),
          angle: random(-5, 5),
          leafColor: theme.treeLeafColor,
          leafStrokeColor: theme.leafStrokeColor,
        })
      );
    } else {
      let branch002length = random(200, 400);
      let branch002latitude = random(5, 8);

      const theme = random(TREE_THEME_002);
      branchList.push(
        new Branch002({
          pos: createVector(random(width), height),
          length: branch002length,
          latitude: branch002latitude,
          fillColor: color(theme.treeBrunchColor),
          angle: random(-5, 5),
          leafColor: theme.treeLeafColor,
          leafStrokeColor: theme.leafStrokeColor,
        })
      );
    }
  }
}

function draw() {
  for (const branch of branchList) {
    branch.draw();
  }
  image(overAllTexture, 0, 0);
  noLoop();
}
