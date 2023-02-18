/**
 * 叶子对象
 */
class Leaf {
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
  }

  draw() {
    push();

    translate(this.x, this.y);
    rotate(radians(this.angle));

    // 左侧贝塞尔曲线 2个控制点
    let p1X = this.length * random(0.05, 0.5);
    let p1Y = -this.length * random(0.05, 0.5);
    let p2X = this.length * random(0.3, 0.8);
    let p2Y = -this.length * random(0.05, 0.5);

    // 右侧贝塞尔曲线 2个控制点
    let p4X = this.length * random(0.05, 0.5);
    let p4Y = this.length * random(0.05, 0.5);
    let p3X = this.length * random(0.3, 0.8);
    let p3Y = this.length * random(0.05, 0.5);

    // 贝塞尔曲线debug模式
    if (this.debugMode) {
      push();
      strokeWeight(2);
      stroke(0);
      line(p1X, p1Y, p2X, p2Y);
      stroke(255);
      line(p3X, p3Y, p4X, p4Y);
      pop();
      console.log(this);

      line(0, 0, this.endX + 1000, 0);
    }

    this.drawBody(p1X, p1Y, p2X, p2Y, p3X, p3Y, p4X, p4Y);

    // 是否开启叶子纹理
    if (this.textureMode) {
      this.drawPath(p1X, p1Y, p2X, p2Y, p3X, p3Y, p4X, p4Y);
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
    fill(this.fillColor);
    if (this.strokeColor) {
      strokeWeight(this.sWeight);
      stroke(this.strokeColor);
    } else {
      noStroke();
    }
    beginShape();
    vertex(this.startX, this.startY); // 起始点
    bezierVertex(p1X, p1Y, p2X, p2Y, this.endX, this.endY); // 贝塞尔曲线
    bezierVertex(p3X, p3Y, p4X, p4Y, this.startX, this.startY); // 贝塞尔曲线
    endShape(CLOSE); // 结束
    pop();
  }

  drawPath(p1X, p1Y, p2X, p2Y, p3X, p3Y, p4X, p4Y) {
    push();
    strokeWeight(this.sWeight);
    stroke(this.strokeColor);
    let steps = this.length / 8;
    let leftArr = [];
    let rightArr = [];
    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = bezierPoint(this.startX, p1X, p2X, this.endX, t);
      let y = bezierPoint(this.startY, p1Y, p2Y, this.endY, t);
      leftArr.push(createVector(x, y));
    }

    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = bezierPoint(this.startX, p4X, p3X, this.endX, t);
      let y = bezierPoint(this.startY, p4Y, p3Y, this.endY, t);
      rightArr.push(createVector(x, y));
    }

    let centerSteps = this.length / 8;
    let centerPointArr = [];
    noFill();
    beginShape();
    curveVertex(this.startX, this.startY);
    curveVertex(this.startX, this.startY);
    for (let i = 0; i <= centerSteps; i++) {
      let t = i / centerSteps;
      let x = bezierPoint(
        this.startX,
        (p1X + p4X) * 0.7,
        (p2X + p3X) * 0.3,
        this.endX,
        t
      );
      let y = bezierPoint(
        this.startY,
        (p1Y + p4Y) * 0.7,
        (p2Y + p3Y) * 0.3,
        this.endY,
        t
      );
      curveVertex(x, y);
      centerPointArr.push(createVector(x, y));
    }
    curveVertex(this.endX, this.endY);
    curveVertex(this.endX, this.endY);
    endShape();

    for (let i = 0; i < steps - 1; i++) {
      stroke(this.strokeColor);
      line(
        centerPointArr[i].x,
        centerPointArr[i].y,
        leftArr[i + 1].x,
        leftArr[i + 1].y
      );
      line(
        centerPointArr[i].x,
        centerPointArr[i].y,
        rightArr[i + 1].x,
        rightArr[i + 1].y
      );
    }
    pop();
  }
}
