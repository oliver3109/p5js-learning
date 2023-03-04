// Rectangle Composition
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

const WIDTH = 846; // 画布宽度
const HEIGHT = 1185; // 画布高度

const span = 4; // 间隔 4px

const graphyRect = {
  width: 92, // 矩形宽度 92px
  height: 92, // 矩形高度 92px
};

const myRectList = []; // 矩形列表

// 主题色
const TEHEM = [
  {
    name: "机械革命",
    bgColor: ["#2A1C3F", "#453274", "#5C356A", "#69F4F9", "#CA2F8B"],
    colors: ["#2A1C3F", "#453274", "#5C356A", "#69F4F9", "#CA2F8B"],
  },
  {
    name: "红色家族",
    bgColor: ["#181818", "#A8E4E2", "#D0B0B8", "#686870", "#D81850", "#A81848"],
    colors: ["#A8E4E2", "#D0B0B8", "#686870", "#D81850", "#A81848", "#181818"],
  },
  {
    name: "粉色佳人",
    bgColor: ["#F088E8", "#F000D1", "#0C9AE6", "#0376E9", "#403068", "#001028"],
    colors: ["#F088E8", "#F000D1", "#0C9AE6", "#0376E9", "#403068", "#001028"],
  },
  {
    name: "赛伯朋克",
    bgColor: ["#000000", "#6CFF00", "#F600FF", "#3808E9"],
    colors: ["#6CFF00", "#F600FF", "#3808E9", "#000000"],
  },
];

// 当前主题
let CURRENT_THEME;

// 滤镜材质
let overAllTexture;

function setup() {
  pixelDensity(2); // 设置像素密度 val越大 密度越小
  createCanvas(WIDTH, HEIGHT); // 创建画布
  overAllTexture = makeFilter(2); // 创建滤镜
  noStroke(); // 设置无边框

  // 随机获取一个主题
  CURRENT_THEME = random(TEHEM);

  // 随机设置背景色
  background(random(CURRENT_THEME.bgColor));

  // Loop画布 并且 创建矩形
  let yCount = 1;
  for (
    let y = 115; // y轴 从115开始
    y < height - graphyRect.height * 2; // y轴到 (height - 92 * 2) 结束
    y += graphyRect.height + span // 92 + 4
  ) {
    let xOffset = yCount % 2 ? graphyRect.width / 2 : graphyRect.width; // x轴偏移的距离
    for (
      let x = graphyRect.width / 2 + xOffset; // x轴从 (92 / 2 + xOffset) 开始
      x < width - graphyRect.width - xOffset; // x轴到 (width - 92 - xOffset) 结束
      x += graphyRect.width + span // 92 + 4
    ) {
      // 创建矩形
      // 矩形放入到我的矩形列表中
      myRectList.push(new MyRect(x, y));
    }
    yCount++;
  }

  // loop 我的矩形数组
  for (const r of myRectList) {
    r.draw(); // 调用 draw 函数
  }

  // 在当前画布基础上 覆盖3次滤镜
  for (let i = 0; i < 3; i++) {
    image(overAllTexture, 0, 0);
  }
}

function draw() {}

class MyRect {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.graphy = createGraphics(graphyRect.width, graphyRect.height); // 创建子画布 宽为矩形宽度 高为矩形高度
    this.init();
  }

  init() {
    this.graphy.background(random(CURRENT_THEME.colors)); // 设置子画布背景色 从当前主题中 随机挑选一个

    // 在当前子画布中 随机创建10～20个矩形
    // int 转换成 整数
    for (let i = 0; i < int(random(10, 20)); i++) {
      this.graphy.noStroke(); // 子画布为无边框模式
      this.graphy.fill(random(CURRENT_THEME.colors)); // 子画布设置填充颜色

      // 矩形的位置随机，宽高随机，最低10
      this.graphy.rect(
        random(graphyRect.width),
        random(graphyRect.height),
        random(10, graphyRect.width),
        random(10, graphyRect.height)
      );
    }

    // 画线
    this.graphy.push(); // 创建一个隔离环境
    this.graphy.stroke("#fff"); // 子画布设置边框色为白色
    this.graphy.noFill(); // 子画布 设置为无填充模式

    this.graphy.beginShape(); // 子画布 开始画一个图形
    let lineX = random(graphyRect.width);
    let lineY = random(graphyRect.height);
    // 随机产生20～40坐标
    for (let i = 0; i < int(random(20, 40)); i++) {
      if (random() < 0.5) {
        // 50% 只让 x 发生改变
        lineX += random(-graphyRect.width / 3, graphyRect.width / 3);
      } else {
        // 50% 只让 y 发生改变
        lineY += random(-graphyRect.height / 3, graphyRect.height / 3);
      }
      this.graphy.vertex(lineX, lineY); // 子画布 连线
    }
    this.graphy.endShape(CLOSE); // 子画布 结束画一个图形
    this.graphy.pop(); // 离开一个隔离环境
  }

  draw() {
    // 把当前的子画布(图片) 画在 住画布的 x, y的位置上
    // 图片宽高 = 矩形宽高
    image(this.graphy, this.x, this.y, graphyRect.width, graphyRect.height);
  }
}
