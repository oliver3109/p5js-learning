// Blood Forest Under The Moon 2
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

class Branch {
  constructor({
    pos,
    length,
    latitude,
    fillColor,
    angle,
    level,
    leafStrokeColor,
    leafColor,
    leafMinLength,
    leafMaxLength,
    leafDensity,
    isMain,
  }) {
    this.isMain = isMain; // 是否是主干

    this.pos = pos; // 起始位置
    this.length = length; // 树枝长度
    this.fillColor = fillColor; // 树枝颜色
    this.leafColor = leafColor; // 叶子填充颜色
    this.leafStrokeColor = leafStrokeColor; // 叶子纹路颜色

    this.leafMinLength = leafMinLength; // 叶子最小长度
    this.leafMaxLength = leafMaxLength; // 叶子最大长度
    this.leafDensity = leafDensity; // 叶子密度

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

      if (isMain) {
        x += sin(y) * 8 * this.skew;
      } else {
        x += sin(y) * 20 * this.skew;
      }
    }

    this.subBranch = []; // 分支

    this.leafList = []; // 树叶对象
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);

    rotate(radians(this.angle));

    let maxLatitude = this.latitude;

    strokeWeight(maxLatitude);
    if (this.fillColor) {
      stroke(this.fillColor);
    }
    noFill();

    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(this.nodeList[0].x, this.nodeList[0].y);
    curveVertex(this.nodeList[0].x, this.nodeList[0].y);
    endShape();

    for (let i = 0; i < this.nodeList.length - 1; i++) {
      const w = map(i + 1, 0, this.nodeList.length, maxLatitude, 2);
      strokeWeight(w);
      beginShape();
      const node = this.nodeList[i];
      curveVertex(node.x, node.y);
      curveVertex(node.x, node.y);
      const nextNode = this.nodeList[i + 1];
      curveVertex(nextNode.x, nextNode.y);
      curveVertex(nextNode.x, nextNode.y);
      endShape();

      if (this.level == 2) {
        let count = int(random(0, this.leafDensity));
        for (let c = 0; c < count; c++) {
          this.leafList.push(
            new Leaf({
              length: random(this.leafMinLength, this.leafMaxLength),
              x: node.x,
              y: node.y,
              angle: random(360),
              fillColor: this.leafColor,
              strokeColor: this.leafStrokeColor,
              debugMode: false,
              textureMode: false,
              sWeight: 1,
            })
          );
        }
      }

      if (this.level < 2) {
        const widthRate = map(this.level, 0, 2, 0.6, 0.3);
        const heightRate = map(i, 0, this.nodeList.length, 0.3, 0.7);
        const divisionRate = map(i, 0, this.nodeList.length, 0.4, 0.9);
        this.subBranch.push(
          new Branch({
            pos: createVector(node.x, node.y),
            length: this.length * random(0.2, heightRate),
            latitude: w * widthRate,
            fillColor: this.fillColor,
            angle: this.angle + random(-20, 20),
            level: this.level + 1,
            leafColor: this.leafColor,
            leafStrokeColor: this.leafStrokeColor,
            leafMinLength: this.leafMinLength,
            leafMaxLength: this.leafMaxLength,
            leafDensity: this.leafDensity,
            isMain: this.isMain,
          })
        );
        const subBranchCount = int(random([1, 2]));
        for (let i = 0; i < subBranchCount; i++) {
          if (random() < divisionRate) {
            this.subBranch.push(
              new Branch({
                pos: createVector(node.x, node.y),
                length: this.length * random(0.2, heightRate),
                latitude: w * widthRate,
                fillColor: this.fillColor,
                angle: random(-65, 65),
                level: this.level + 1,
                leafColor: this.leafColor,
                leafStrokeColor: this.leafStrokeColor,
                leafMinLength: this.leafMinLength,
                leafMaxLength: this.leafMaxLength,
                leafDensity: this.leafDensity,
                isMain: false,
              })
            );
          }
        }
      }
    }

    for (const sub of this.subBranch) {
      sub.draw();
    }

    for (const leaf of this.leafList) {
      leaf.draw();
    }

    pop();
  }
}
