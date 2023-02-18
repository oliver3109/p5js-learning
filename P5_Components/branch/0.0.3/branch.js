/**
 * 树枝对象 0.0.3
 */

class Branch {
  constructor({
    pos,
    length,
    latitude,
    fillColor,
    strokeColor,
    angle,
    level,
    maxLevel,
  }) {
    this.pos = pos; // 起始位置
    this.length = length; // 树枝长度
    this.fillColor = fillColor; // 树枝颜色
    this.strokeColor = strokeColor; // 树枝边框色

    this.skew = random([-1, 1]);
    this.curveR = random(20, 50);

    this.latitude = latitude; // 树枝粗度

    this.angle = angle; // 树枝角度

    this.level = level || 0; // 级别
    this.maxLevel = maxLevel; // 最大级别

    this.leftNodeList = []; // 树左侧节点
    this.rightNodeList = []; // 树右侧节点

    // for (let y = 0; y < length; y += 1) {
    //   const w = map(y, 0, length, latitude, 3);
    //   const x = noise(y / 150) * map(y, 0, length, 0, 200);
    //   this.leftNodeList.push(createVector(x - w / 2, -y));
    //   this.rightNodeList.push(createVector(x + w / 2, -y));
    // }

    let step = createVector(0, 0);
    for (let y = 0; y < length; y += 1) {
      const x = noise(y / 200) * map(y, 0, length, 0, 10);
      step.add(x, -1);
      console.log(`x: ${step.x}, y:${step.y}`);
      // if (y % (length / 10) == 0) {
      //   console.log("发生弯曲");
      //   step.setHeading(random(PI));
      // }
      this.leftNodeList.push(step);
      this.rightNodeList.push(step);
    }

    this.rightNodeList.reverse();
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);

    // rotate(radians(this.angle));

    strokeWeight(1);
    stroke(this.strokeColor);
    fill(this.fillColor);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    for (let pos of this.leftNodeList) {
      curveVertex(pos.x, pos.y);
    }
    for (let pos of this.rightNodeList) {
      curveVertex(pos.x, pos.y);
    }
    endShape(CLOSE);

    pop();
  }
}
