// Seaweed
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches
ChihYungChang;

class Branch {
  constructor(args) {
    this.style = args.style; // 风格

    this.location = args.location; // 起始位置

    this.length = args.length; // 长度

    this.c = args.c; // 颜色
  }

  draw() {
    if (this.style === "line") {
      // 实心线段风格
      const curvature = random(60, 100);
      const dict = random([-1, 1]);
      for (let y = 0; y < this.length; y++) {
        stroke(this.c);
        this.location.add(0, -1);
        const angle = sin(map(y, 0, this.length, 100 * dict, TWO_PI * 100));
        this.location.rotate(angle / curvature + random(-0.1, 0.1));
        const roughRate = map(y, 0, this.length, 15, 20 + sin(y) * 5);
        strokeWeight(roughRate);
        point(this.location.x, this.location.y);
      }
    }
  }
}
