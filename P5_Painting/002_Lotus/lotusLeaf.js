// Lotus
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches
ChihYungChang;

class LotusLeaf {
  constructor(args) {
    this.position = args.position; // 位置

    this.r = args.r || random(40, 70);

    this.c = random(["#70ae00", "#009e57", "#018583", "#014c0a", "#0b4e04"]);

    this.count = int(random(15, 24));
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);

    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "black";

    const list = [];

    for (let i = 0; i < this.count; i++) {
      const line_vec = createVector(0, this.r + random(this.r / 5, this.r / 2));
      line_vec.rotate((360 / this.count) * i);
      list.push(line_vec);
    }

    /** 荷叶 */
    push();
    fill(this.c);
    stroke(this.c);
    beginShape();
    for (const item of list) {
      curveVertex(item.x, item.y);
    }
    endShape(CLOSE);
    pop();
    /** 荷叶 */

    /** 根茎 */
    push();
    let _c = color(this.c);
    _c.setAlpha(255);
    stroke(_c);
    strokeWeight(2);
    for (const item of list) {
      item.mult(0.99);
      line(0, 0, item.x, item.y);
    }
    pop();
    /** 根茎 */

    pop();
  }
}
