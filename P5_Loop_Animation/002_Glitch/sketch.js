const THEME_LIST = [
  {
    theme: "purple",
    colors: ["#b915c2", "#a868b0", "#532459"],
  },
  {
    theme: "yellow",
    colors: ["#ecfc00", "#b5ba6e", "#4f540b", "#9e9e47"],
  },
  {
    theme: "blue",
    colors: ["#1a00ff", "#3f27ab", "#35abcc", "#3558cc", "#0f1f54", "#22b5d6"],
  },
  {
    theme: "green",
    colors: ["#00f224", "#a2f200", "#75a318", "#18a322", "#e2ff40"],
  },
  {
    theme: "red",
    colors: ["#de0000", "#ad1f1f", "#ad1f83", "#8c1515", "#aa19cf"],
  },
  {
    theme: "black",
    colors: ["#000000"],
  },
];

let currentTheme = "red";

const rectList = [];

let currentFrameCount = 0;

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < 150; i++) {
    for (let j = 0; j < int(random(1, 3)); j++) {
      rectList.push(new MyRect(createVector(0, -i * random(1, 3))));
    }
  }
}

function draw() {
  background(0);

  if (currentTheme == "black") {
    if (frameCount - currentFrameCount > 60) {
      currentTheme = random(
        THEME_LIST.filter((i) => i.theme !== "black").map((i) => i.theme)
      );
    }
  } else {
    if (frameCount % 160 === 0) {
      currentTheme = random(
        THEME_LIST.filter((i) => i.theme !== "black").map((i) => i.theme)
      );
    }
  }

  for (const myRect of rectList) {
    myRect.update();
    myRect.draw();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    currentTheme = "black";
    currentFrameCount = frameCount;
  }
}

class MyRect {
  constructor(pos) {
    this.pos = pos;
  }

  update() {
    this.pos.add(0, 1);

    if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  draw() {
    push();
    noStroke();
    const colors = THEME_LIST.find((i) => i.theme === currentTheme).colors;
    fill(random(colors));

    // if (currentTheme != "black") {
    //   fill(color(random(255), random(255), random(255)));
    // }

    if (currentTheme != "black" && random() < 0.1) {
      fill(color(random(255), random(255), random(255)));
    }
    rect(
      this.pos.x + random(-width / 2, width),
      this.pos.y,
      random(0, width / 3),
      random(0, width / 3)
    );
    rect(
      this.pos.x + random(-width / 2, width),
      this.pos.y,
      random(0, width),
      random(0, 5)
    );
    rect(
      this.pos.x + random(-width / 2, width),
      this.pos.y,
      random(0, 5),
      random(0, height / 3)
    );
    pop();
  }
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 10);
  }
}
