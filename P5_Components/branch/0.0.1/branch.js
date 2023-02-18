/**
 * 树枝对象 0.0.1
 * 特性：
 * 1. 只会往一侧弯曲
 * 2. 有分支，分支裂变3次
 * 3. 分支角度不会太大
 * 4. 主树干逐级变细
 */

class Branch {
  constructor({ pos, length, latitude, fillColor, angle, level }) {
    this.pos = pos; // 起始位置
    this.length = length; // 树枝长度
    this.fillColor = fillColor; // 树枝颜色

    this.skew = random([-1, 1]);

    this.latitude = latitude; // 树枝粗度

    this.angle = angle; // 树枝角度

    this.level = level || 0; // 级别

    this.nodeList = []; // 树节点
    let y = 0;
    let x = 0;
    let steps = this.length * 0.0205;
    for (let i = 0; i < steps; i++) {
      let step = int(map(i, 0, steps, this.length * 0.2, this.length * 0.0205));
      this.nodeList.push(createVector(x, (y -= step)));

      x += sin(y / 600) * 8 * this.skew;
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

      if (this.level < 2) {
        if (random() < 1) {
          console.log(this.level);
          let wRate = map(this.level, 0, 2, 0.6, 0.3);
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
