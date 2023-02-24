// Radial Twist
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

const graphyRect = {
  width: 200, // 矩形宽度 92px
  height: 200, // 矩形高度 92px
};

const myRectList = []; // 矩形列表

function setup() {
  pixelDensity(2);
  createCanvas(800, 800);
  noStroke(); // 设置无边框
  colorMode(HSB, 360, 100, 100, 100);

  // Loop画布 并且 创建矩形
  for (let y = 0; y < height; y += graphyRect.height) {
    for (let x = 0; x < width; x += graphyRect.width) {
      // 创建矩形
      // 矩形放入到我的矩形列表中
      myRectList.push(new MyRect(x, y));
    }
  }
}

function draw() {
  // loop 我的矩形数组
  for (const r of myRectList) {
    r.draw(); // 调用 draw 函数
  }
}

class MyRect {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.graphy = createGraphics(graphyRect.width, graphyRect.height); // 创建子画布 宽为矩形宽度 高为矩形高度
    this.init();
  }

  init() {
    this.graphy.rectMode(CENTER);
    const startH = 150;
    const endH = 290;
    for (let i = this.graphy.width * 2; i > 0; i--) {
      this.graphy.stroke(
        color(map(i, this.graphy.width, 0, startH, endH), 100, 100)
      );
      this.graphy.ellipse(graphyRect.width / 2, graphyRect.height / 2, i, i);
    }
  }

  draw() {
    this.filter();
    image(this.graphy, this.x, this.y, graphyRect.width, graphyRect.height);
  }

  filter() {
    this.init();
    // 定义扭曲的幅度和频率
    const amplitude = random(60, 120);
    const frequency = random(0.02, 0.1);

    this.graphy.loadPixels();
    for (let x = 0; x < graphyRect.width; x++) {
      for (let y = 0; y < graphyRect.height; y++) {
        const centerX = graphyRect.width / 2;
        const centerY = graphyRect.height / 2;
        const radius = dist(centerX, centerY, x, y);
        const angle = atan2(y - centerY, x - centerX);

        const distortion =
          (amplitude + random(-10, 10)) * sin(radius * frequency);
        const newX = centerX + (radius + distortion) * cos(angle);
        const newY = centerY + (radius + distortion) * sin(angle);

        if (
          !(
            newX >= graphyRect.width ||
            newX <= 0 ||
            newY >= graphyRect.height ||
            newY <= 0
          )
        ) {
          const color = this.graphy.get(newX, newY);

          this.graphy.set(x, y, color);
        }
      }
    }
    this.graphy.updatePixels();
  }
}
