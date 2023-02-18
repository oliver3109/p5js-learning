/**
 * 树枝对象 0.0.2
 * 特性：
 * 1. S型扭曲生长
 * 2. 可以在1～2级分支调节
 * 3.
 */

class Branch {
  constructor({ pos, length, latitude, fillColor, angle, level, maxLevel }) {
    this.pos = pos; // 起始位置
    this.length = length; // 树枝长度
    this.fillColor = fillColor; // 树枝颜色

    this.skew = random([-1, 1]);
    this.curveR = random(30, 50);

    this.latitude = latitude; // 树枝粗度

    this.angle = angle; // 树枝角度

    this.level = level || 0; // 级别
    this.maxLevel = maxLevel; // 最大级别

    this.nodeList = []; // 树节点
    for (let y = 0; y < length; y++) {
      this.nodeList.push(
        createVector(sin(y / this.curveR) * 8 * this.skew, -y)
      );
    }

    this.subBranch = []; // 分支
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);

    rotate(radians(this.angle));

    let maxLatitude = this.latitude;

    noFill();

    strokeWeight(maxLatitude);
    stroke(this.fillColor);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(this.nodeList[0].x, this.nodeList[0].y);
    curveVertex(this.nodeList[0].x, this.nodeList[0].y);
    endShape();

    for (let i = 0; i < this.nodeList.length - 1; i++) {
      const w = map(i + 1, 0, this.nodeList.length, maxLatitude, 3);
      strokeWeight(w);
      stroke(this.fillColor);
      beginShape();
      const node = this.nodeList[i];
      curveVertex(node.x, node.y);
      curveVertex(node.x, node.y);
      const nextNode = this.nodeList[i + 1];
      curveVertex(nextNode.x, nextNode.y);
      curveVertex(nextNode.x, nextNode.y);
      endShape();

      if (this.level < this.maxLevel) {
        if (i % 10 === 0) {
          let wRate = map(this.level, 0, this.maxLevel, 0.6, 0.3);
          let hRate = map(i, 0, this.nodeList.length, 0.6, 0.3);
          this.subBranch.push(
            new Branch({
              pos: createVector(node.x, node.y),
              length: this.length * random(0.2, hRate),
              latitude: w * wRate,
              fillColor: this.fillColor,
              angle: -45 * random(0.4, 0.8),
              level: this.level + 1,
            }),
            new Branch({
              pos: createVector(node.x, node.y),
              length: this.length * random(0.2, hRate),
              latitude: w * wRate,
              fillColor: this.fillColor,
              angle: 45 * random(0.4, 0.8),
              level: this.level + 1,
            })
          );
        }
      }
    }

    for (const sub of this.subBranch) {
      sub.draw();
    }
    pop();
  }
}
