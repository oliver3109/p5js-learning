// Color Tree
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

class Branch002 {
  constructor({
    pos,
    length,
    latitude,
    fillColor,
    angle,
    level,
    maxLevel,
    leafColor,
    leafStrokeColor,
  }) {
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

    this.leafColor = leafColor;
    this.leafStrokeColor = leafStrokeColor;

    this.subBranch = []; // 分支

    this.leafList = []; // 树叶对象
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

    let prevNodeList = [{ x: this.nodeList[0].x, y: this.nodeList[0].y }];

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

      if (i % int(map(i, 0, this.nodeList.length - 1, 40, 16) / 1.2) == 0) {
        const growVec = createVector(
          node.x - prevNodeList[prevNodeList.length - 1].x,
          (abs(node.y) - abs(prevNodeList[prevNodeList.length - 1].y)) * -1
        );
        prevNodeList.push({
          x: node.x,
          y: node.y,
        });
        const angle = radians(growVec.heading());
        const leftAngle = abs(angle * 200) * (node.x > 0 ? -1 : 1);
        const rightAngle = abs(angle * 200) * (node.x < 0 ? -1 : 1);

        const leafStrokeColor = color(this.leafStrokeColor);
        const textureHighlightColor = color(
          red(leafStrokeColor) + 20,
          blue(leafStrokeColor) + 20,
          green(leafStrokeColor) + 20
        );
        this.leafList.push(
          new Leaf002({
            length: map(i, 0, this.nodeList.length, 50, 16),
            x: node.x - w / 2,
            y: node.y,
            angle: -90 - 45 + leftAngle,
            fillColor: color(this.leafColor),
            strokeColor: leafStrokeColor,
            debugMode: false,
            textureMode: true,
            sWeight: 0.6,

            textureHighlightColor: textureHighlightColor,
          }),
          new Leaf002({
            length: map(i, 0, this.nodeList.length, 50, 16),
            x: node.x + w / 2,
            y: node.y,
            angle: -90 + 45 + rightAngle,
            fillColor: color(this.leafColor),
            strokeColor: leafStrokeColor,
            debugMode: false,
            textureMode: true,
            sWeight: 0.6,

            textureHighlightColor: textureHighlightColor,
          })
        );
      }

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

    console.log(prevNodeList);

    for (const sub of this.subBranch) {
      sub.draw();
    }

    for (const leaf of this.leafList) {
      leaf.draw();
    }
    pop();
  }
}
