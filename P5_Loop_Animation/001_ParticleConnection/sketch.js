let particleList = [];

function setup() {
  createCanvas(800, 800);
  background(0);

  particleList = []; // 清空粒子

  // 随机产生150个粒子到画布中
  for (let i = 0; i < 150; i++) {
    let d = random() * 10 + 5;
    let x = random() * (width - d * 2) + d;
    let y = random() * (height - d * 2) + d;
    let color = "#ffffff";
    let weight = 1;
    particleList.push(new Particle(x, y, d, color, weight));
  }
}

function draw() {
  background(0);
  // 更新粒子
  for (let i = 0; i < particleList.length; i++) {
    particleList[i].update();
    particleList[i].draw();
  }
  drawLine();
}

/**
 * 粒子 Class
 */
class Particle {
  constructor(x, y, d, color, weight) {
    this.x = x; // x坐标
    this.y = y; // y坐标
    this.d = d; // 粒子尺寸
    this.minD = d; // 粒子最小尺寸
    this.color = color; // 粒子颜色
    this.weight = weight; // 粒子重量
  }
  draw() {
    // 画粒子
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.d);
  }

  /**
   * 粒子越界检测，当超出某一边，会从另一边过来
   */
  edge() {
    if (this.x >= width) {
      this.x = 0;
    }
    if (this.x <= 0) {
      this.x = width;
    }
    if (this.y >= height) {
      this.y = 0;
    }
    if (this.y <= 0) {
      this.y = height;
    }
  }

  update() {
    // 粒子尺寸随着时间推移慢慢变小
    this.d -= 0.15;

    // 当粒子尺寸小于0时
    if (this.d < 0) {
      this.d = random() * 25;
      this.weight = random() * 7;
    }
    this.y += this.weight; // 粒子的y坐标 不断加上重量
    this.weight += 0.05; // 重量不断累加

    if (this.y > height - this.d) {
      this.weight *= -1;
    }
  }
}

/**
 * 获取粒子并把它们用线条联系起来
 */
function drawLine() {
  for (let a = 0; a < particleList.length; a++) {
    for (let b = a; b < particleList.length; b++) {
      // 计算粒子之间的距离
      const v1 = createVector(particleList[a].x, particleList[a].y);
      const v2 = createVector(particleList[b].x, particleList[b].y);
      let distance = v1.dist(v2);

      if (distance < 110) {
        // 距离越近 越透明
        const c = color(255, 255, 255);
        c.setAlpha(map(distance, 0, 110, 255, 0));
        stroke(c);
        strokeWeight(2);
        line(
          particleList[a].x,
          particleList[a].y,
          particleList[b].x,
          particleList[b].y
        );
      }
    }
  }
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 10);
  }
}
