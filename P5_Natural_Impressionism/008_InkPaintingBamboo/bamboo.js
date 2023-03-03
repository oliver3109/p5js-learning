class BambooBackbone {
  constructor(args) {
    let def = {
      p: createVector(random(width), random(height)),
      a: random(-45, 45),
      step: int(random(3, 6)),
      stepLength: int(random(200, 250)),
      alive: true,

      currentStep: 0,
      currentStepLength: 0,

      visibleFrameCount: 0,
    };

    Object.assign(def, args);
    Object.assign(this, def);

    this.step = int(height / this.stepLength);
  }

  update() {
    const v = createVector(0, -1);

    this.p.add(v);
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

    let brushWeight = 50; // 宽度

    if (currentStepRate == 0) {
      this.visibleFrameCount = frameCount + 15;
      this.currentStep++;
    }

    if (currentStepRate < this.stepLength / 2) {
      brushWeight = map(currentStepRate, 0, this.stepLength / 2, 50, 45);
    } else {
      brushWeight = map(
        currentStepRate,
        this.stepLength / 2,
        this.stepLength,
        45,
        50
      );
    }

    for (let i = -brushWeight / 2; i < brushWeight / 2; i += 1) {
      let xOffset = 0;
      const centerNumber = 0;
      if (i < centerNumber) {
        xOffset = map(i, -brushWeight / 2, centerNumber, 200, 50);
      } else {
        xOffset = map(i, centerNumber, brushWeight / 2, 50, 200);
      }

      const fill = 255 - abs(noise(i / 10, i / 100, i)) * (50 + xOffset);

      g.fill(fill);

      if (fill < 255) {
        let size = 0;
        const minSize = map(this.currentStep, 0, this.step, 2, 0.1);
        if (i < centerNumber) {
          size = map(i, -brushWeight / 2, centerNumber, 2, minSize);
        } else {
          size = map(i, centerNumber, brushWeight / 2, minSize, 2);
        }
        g.ellipse(this.p.x + i, this.p.y, size);
      }
    }

    g.fill(0);
    if (currentStepRate == 0) {
      for (let i = -brushWeight / 2; i < brushWeight / 2; i += 1) {
        if (random() < map(i, -brushWeight / 2, 0, 0.2, 0)) {
          for (let n = 0; n < int(random(10, 20)); n++) {
            g.ellipse(this.p.x + i, this.p.y + sin(i / 50) * 9, 10);
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
  constructor() {
    //
  }
}

class BambooLeaf {}
