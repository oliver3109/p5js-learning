class BambooBackbone {
  constructor(args) {
    let def = {
      p: createVector(random(width), random(height)),
      a: random(-45, 45),
      step: int(random(3, 6)),
      stepLength: int(random(200, 250)),
      alive: true,

      weight: 50,
      fill: random(0, 50),
      intermittentFrames: 8, // 间断帧数
    };

    Object.assign(def, args);
    Object.assign(this, def);

    this.currentStep = 0;
    this.currentStepLength = 0;
    this.visibleFrameCount = 0;
    this.step = int(height / this.stepLength);
    this.branchList = [];
  }

  update(g) {
    const v = createVector(
      sin(frameCount / 100) * random(0.1, 0.3) * random([-1, 1]),
      -1
    );

    this.p.add(v);
    if (this.p.y < 0) {
      this.alive = false;
    }

    const { y } = this.p;

    const currentStepRate = y % this.stepLength;

    if (currentStepRate == 0) {
      if (random() < 0.5) {
        const d = random([-1, 1]);
        this.branchList.push(
          new BambooBranch({
            p: this.p.copy().add((this.weight / 2) * d),
            d,
            weight: this.weight / 5,
          })
        );
      }
    }

    this.branchList = this.branchList.filter((item) => item.alive);
    this.branchList.forEach((item) => {
      item.update(g);
      item.draw(g);

      if (random() < 0.01) {
        let d;
        if (item.d > 0) {
          d = random([1, 3]);
        } else {
          d = random([-3, -2]);
        }
        this.branchList.push(
          new BambooBranch({
            p: item.p.copy(),
            d,
            weight: item.weight * 0.85,
          })
        );
      }
    });
  }

  draw(g) {
    g.push();

    g.noStroke(0);
    g.fill(0);

    if (frameCount < this.visibleFrameCount) {
      return;
    }

    const { y } = this.p;

    const currentStepRate = y % this.stepLength;

    let brushWeight = this.weight; // 宽度

    if (currentStepRate == 0) {
      this.visibleFrameCount = frameCount + this.intermittentFrames;
      this.currentStep++;
    }

    const LossRate = map(this.currentStep, 0, this.step, 0.5, 0.9);

    // 处理宽度
    let yColorOffset = 80;
    if (currentStepRate < 15) {
      brushWeight *= sq(map(currentStepRate, 0, 15, 1.3, 1));
      yColorOffset *= sq(map(currentStepRate, 0, 15, 1.3, 1));
    } else if (currentStepRate > this.stepLength - 30) {
      brushWeight *= sq(
        map(currentStepRate, this.stepLength, this.stepLength - 30, 1.3, 1)
      );
      yColorOffset *= sq(
        map(currentStepRate, this.stepLength, this.stepLength - 30, 1.3, 1)
      );
    } else {
      brushWeight = this.weight;
      yColorOffset = 10;
    }

    for (let i = -brushWeight / 2; i < brushWeight / 2; i += 1) {
      let fill = 255 - this.fill - yColorOffset;
      let xOffset = 0;
      const centerNumber = 0;
      if (i < centerNumber) {
        xOffset = map(i, -brushWeight / 2, centerNumber, 150, 50);
      } else {
        xOffset = map(i, centerNumber, brushWeight / 2, 50, 150);
      }

      fill -= xOffset;

      if (map(noise(i / 10, i / 10, i), -1, 1, 0, 1) < random(LossRate)) {
        fill = 255;
      }

      g.fill(fill);

      if (fill < 255) {
        let size = 0;
        const minSize = map(this.currentStep, 0, this.step, 1, 0.1);
        if (i < centerNumber) {
          size = map(i, -brushWeight / 2, centerNumber, 2, minSize);
        } else {
          size = map(i, centerNumber, brushWeight / 2, minSize, 2);
        }
        g.ellipse(this.p.x + i, this.p.y, size);
      }
    }

    g.fill(0);
    if (currentStepRate == this.stepLength - this.intermittentFrames) {
      for (let i = -brushWeight / 2; i < brushWeight / 2; i += 1) {
        if (random() < map(i, -brushWeight / 2, 0, 0.2, 0)) {
          for (let n = 0; n < int(random(10, 20)); n++) {
            g.ellipse(this.p.x + i, this.p.y + sin(i / 100) * 18, 10);
          }
        } else {
          g.ellipse(this.p.x + i, this.p.y, 10);
        }
      }
    }

    g.pop();
  }
}

class BambooBranch {
  constructor(args) {
    let def = {
      p: createVector(random(width), random(height)),
      d: random([-1, 1]),
      alive: true,

      len: random(90, 180),
      weight: random(4, 8),
    };

    Object.assign(def, args);
    Object.assign(this, def);

    this.startPos = this.p.copy();
    this.brushWeight = this.weight;
  }

  update(g) {
    this.p.add(this.d, -1);

    const d = this.startPos.dist(this.p);
    if (this.startPos.dist(this.p) > this.len) {
      this.alive = false;
      for (let i = 0; i < int(random(4, 9)); i++) {
        new BambooLeaf({
          p: this.p.copy().add(random(-5, 5), random(-5, 5)),
        }).draw(g);
      }
    }

    this.brushWeight = map(d, this.len, 0, this.weight, 0.5);
  }

  draw(g) {
    g.push();

    g.translate(this.p.x, this.p.y);
    g.rotate(radians(this.a));

    g.ellipse(0, 0, this.weight);

    g.pop();
  }
}

class BambooLeaf {
  constructor(args) {
    let def = {
      p: createVector(random(width), random(height)),

      length: random(150, 230),
      startX: 0,
      startY: 0,
      a: random(0, 180) + random(-30, 30),
    };

    Object.assign(def, args);
    Object.assign(this, def);
  }

  update() {}

  draw(g) {
    g.push();

    g.translate(this.p.x, this.p.y);
    g.rotate(radians(this.a));

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

    g.fill(0);
    g.beginShape();
    g.vertex(this.startX, this.startY); // 起始点
    g.bezierVertex(p1X, p1Y, p2X, p2Y, this.endX, this.endY); // 贝塞尔曲线
    g.bezierVertex(p3X, p3Y, p4X, p4Y, this.startX, this.startY); // 贝塞尔曲线
    g.endShape(CLOSE); // 结束

    g.pop();
  }
}
