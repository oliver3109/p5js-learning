// Color Tree
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

class Leaf002 {
  constructor({
    length, // 叶子长度
    x, // 叶子起始x
    y, // 叶子起始y
    angle, // 叶子角度
    fillColor, // 叶子颜色
    strokeColor, // 纹路颜色
    debugMode, // DEBUG模式
    textureMode, // 纹路模式
    sWeight, // 纹路宽度

    textureHighlightColor, // 纹路高亮色
  }) {
    this.startX = 0;
    this.startY = 0;
    this.endX = length;
    this.endY = 0;

    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;

    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.debugMode = debugMode;

    this.textureMode = textureMode;
    this.sWeight = sWeight;

    this.textureHighlightColor = textureHighlightColor || "#fff";
  }

  draw() {
    push();

    translate(this.x, this.y);
    rotate(radians(this.angle));

    // 左侧贝塞尔曲线 2个控制点
    let p1X = this.length * random(0.3, 0.35);
    let p1Y = -this.length * random(0.3, 0.35);
    let p2X = this.length * random(0.6, 0.8);
    let p2Y = -this.length * random(0.3, 0.35);

    // 右侧贝塞尔曲线 2个控制点
    let p4X = this.length * random(0.3, 0.35);
    let p4Y = this.length * random(0.3, 0.35);
    let p3X = this.length * random(0.6, 0.8);
    let p3Y = this.length * random(0.3, 0.35);

    // 贝塞尔曲线debug模式
    if (this.debugMode) {
      push();
      strokeWeight(2);
      stroke(0);
      line(p1X, p1Y, p2X, p2Y);
      stroke(255);
      line(p3X, p3Y, p4X, p4Y);
      pop();
      line(0, 0, this.endX + 300, 0);
      console.log(this);
      console.log(p1X, p1Y, p2X, p2Y, p3X, p3Y, p4X, p4Y);
    }

    this.drawBody(p1X, p1Y, p2X, p2Y, p3X, p3Y, p4X, p4Y);

    // 是否开启叶子纹理
    if (this.textureMode) {
      let topOrBottom = random(["top", "bottom"]);

      // 左侧贝塞尔曲线 2个控制点
      let p1X_1 = p1X * 0.6;
      let p1Y_1 = p1Y * 0.6;
      let p2X_1 = p2X * 0.85;
      let p2Y_1 = p2Y * 0.85;

      // 右侧贝塞尔曲线 2个控制点
      let p3X_1 = p3X * 0.85;
      let p3Y_1 = p3Y * 0.85;
      let p4X_1 = p4X * 0.6;
      let p4Y_1 = p4Y * 0.6;

      // 左侧贝塞尔曲线 2个控制点
      let p1X_2 = p1X * 0.1;
      let p1Y_2 = p1Y * 0.1;
      let p2X_2 = p2X * 0.45;
      let p2Y_2 = p2Y * 0.45;
      // 右侧贝塞尔曲线 2个控制点
      let p3X_2 = p3X * 0.45;
      let p3Y_2 = p3Y * 0.45;
      let p4X_2 = p4X * 0.1;
      let p4Y_2 = p4Y * 0.1;

      if (topOrBottom == "top") {
        this.drawPath(this.textureHighlightColor, p1X_1, p1Y_1, p2X_1, p2Y_1);
        this.drawPath(this.textureHighlightColor, p1X_2, p1Y_2, p2X_2, p2Y_2);
        this.drawPath(this.strokeColor, p4X_1, p4Y_1, p3X_1, p3Y_1);
        this.drawPath(this.strokeColor, p4X_2, p4Y_2, p3X_2, p3Y_2);
      }

      if (topOrBottom == "bottom") {
        this.drawPath(this.strokeColor, p1X_1, p1Y_1, p2X_1, p2Y_1);
        this.drawPath(this.strokeColor, p1X_2, p1Y_2, p2X_2, p2Y_2);
        this.drawPath(this.textureHighlightColor, p4X_1, p4Y_1, p3X_1, p3Y_1);
        this.drawPath(this.textureHighlightColor, p4X_2, p4Y_2, p3X_2, p3Y_2);
      }
    }

    pop();
  }

  /**
   * 画叶子主体部分
   * @param {*} p1X
   * @param {*} p1Y
   * @param {*} p2X
   * @param {*} p2Y
   * @param {*} p3X
   * @param {*} p3Y
   * @param {*} p4X
   * @param {*} p4Y
   */
  drawBody(p1X, p1Y, p2X, p2Y, p3X, p3Y, p4X, p4Y) {
    push();
    if (this.strokeColor) {
      strokeWeight(this.sWeight);
      stroke(this.strokeColor);
    } else {
      noStroke();
    }
    fill(this.fillColor);
    beginShape();
    vertex(this.startX, this.startY); // 起始点
    bezierVertex(p1X, p1Y, p2X, p2Y, this.endX, this.endY); // 贝塞尔曲线
    bezierVertex(p3X, p3Y, p4X, p4Y, this.startX, this.startY); // 贝塞尔曲线
    endShape(CLOSE); // 结束
    pop();
  }

  /**
   * 画路径
   * @param {*} c 路径颜色
   * @param {*} p1X
   * @param {*} p1Y
   * @param {*} p2X
   * @param {*} p2Y
   */
  drawPath(c, p1X, p1Y, p2X, p2Y) {
    push();
    strokeWeight(this.sWeight);
    stroke(c);
    noFill();
    beginShape();
    curveVertex(this.startX, this.startY);
    curveVertex(this.startX, this.startY);
    let steps = this.length / 8;
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = bezierPoint(this.startX, p1X, p2X, this.endX, t);
      let y = bezierPoint(this.startY, p1Y, p2Y, this.endY, t);
      curveVertex(x, y);
    }
    curveVertex(this.endX, this.endY);
    curveVertex(this.endX, this.endY);
    endShape();
    pop();
  }
}
