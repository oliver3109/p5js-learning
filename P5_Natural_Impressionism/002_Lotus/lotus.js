// Lotus
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

const FLOWER_COLOR = [
  ["#eab9e4", "#db27af"],
  ["#d9d8cc", "#dabfa6"],
];

class Lotus {
  constructor(args) {
    this.position = args.position; // 位置

    this.r = args.r || random(10, 20);

    this.count = int(random(15, 24));

    this.layer = int(random(3, 5));
  }

  draw() {
    push();
    const colors = random(FLOWER_COLOR);
    translate(this.position.x, this.position.y);
    const list = [];

    /** 莲花 start */
    push();
    strokeWeight(2);
    stroke(colors[0]);
    // noStroke();
    // 层级
    for (let layer = 0; layer < this.layer; layer++) {
      push();
      // 层级 花瓣数量
      const layerCount = map(layer, 0, this.layer, 12, 4);
      for (let count = 0; count < layerCount; count++) {
        // 花瓣颜色
        let c = lerpColor(
          color(colors[0]),
          color(colors[1]),
          map(layer, 0, this.layer, 0, 1)
        );
        fill(c);
        // 图形
        ellipse(0, 0, 22, map(layer, 0, this.layer, 120, 60));
        // 旋转
        rotate((360 / layerCount) * (count / 2));
      }
      pop();
    }
    pop();
    /** 莲花 end */

    /** 花蕊 start */
    push();
    noStroke();
    const center = createVector(0, 0);
    for (let i = 0; i < int(random(150, 180)); i++) {
      const stamen = center.copy().add(random(0, 16), 0);
      stamen.rotate(random(360));
      const dist = stamen.dist(center);
      let c = lerpColor(
        color("#421321"),
        color("#fcdf00"),
        map(dist, 0, 16, 0, 1)
      );
      fill(c);
      ellipse(stamen.x, stamen.y, random(4, 6));
    }
    pop();
    /** 花蕊 end */

    pop();
  }
}
