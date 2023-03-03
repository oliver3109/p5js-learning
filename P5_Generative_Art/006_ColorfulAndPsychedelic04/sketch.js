// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Twitter: https://twitter.com/chihyungchang66
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

//p5.js shader basic structure ref from https://www.openprocessing.org/sketch/920144

class Particle {
  constructor(args) {
    let def = {
      p: createVector(random(width), random(height)),
      v: createVector(0, 0),
      a: createVector(0, 0),
      r: random(70, 100),
      color: color(random(360), 100, 100, 100),
      steps: [
        int(random([1, 2, 3, 5, 50, 100, 200])),
        int(random([1, 2, 3, 5, 50, 100, 200])),
      ],
      shrinkRatio: random([0.95, 0.995, 0.99, 0.994, 0.98]),
      alive: true,
      randomId: int(random(10000)),
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }
  draw(g) {
    g.push();
    g.fill(this.color);
    g.ellipse(this.p.x, this.p.y, this.r);
    g.pop();
  }
  update() {
    this.p.add(this.v);
    this.v.add(this.a);
    this.r *= this.shrinkRatio;
    this.color.setAlpha(map(this.r, 100, 10, 1, 1));
    this.alive = this.r > 10;

    let steplize = (n, l) => int(n * l) / l;
    if (this.randomId % 25 == 0) {
      this.v.y =
        steplize(noise(this.p.x / 50, this.p.y / 50) - 0.5, this.steps[0]) * 10;
      this.v.x =
        steplize(noise(this.p.y / 50, this.p.x / 50) - 0.5, this.steps[1]) * 10;
    } else {
      this.v.x =
        steplize(noise(this.p.x / 50, this.p.y / 50) - 0.5, this.steps[0]) * 10;
      this.v.y =
        steplize(noise(this.p.y / 50, this.p.x / 50) - 0.5, this.steps[1]) * 10;
    }
  }
}

let theShader;
let webGLCanvas;
let originalGraphics;
let particles = [];
let overallTexture;
let bgColor;
function preload() {
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
  pixelDensity(5);
  createCanvas(1000, 1000);
  webGLCanvas = createGraphics(width, height, WEBGL);
  originalGraphics = createGraphics(width, height);

  background(0);
  colorMode(HSB, 360, 100, 100, 100);

  originalGraphics.noStroke();
  bgColor = color(random(360), 100, 100);
  // bgColor=color(255)
  originalGraphics.background(bgColor);
  // originalGraphics.rect(-width,-height,width*2,height*2)

  // originalGraphics.drawingContext.shadowColor=color(0,1)
  // originalGraphics.drawingContext.shadowOffsetY=-10
  // originalGraphics.drawingContext.shadowOffsetX=-10

  let pair = int(random(5));
  let span = [12, 16, 24, 36, 48, 64][pair];
  let maxSize = [220, 250, 300, 400, 500][pair];
  let ignorePossibility = random([0.05, 0.3]);
  let gapScale = random([3, 5, 10, 15, 20]);
  let gapRatio = random([0, 0.1, 0.2, 0.3]);
  let panScale = random([0, 1, 2, 5, 10, 15, 20, 25]);
  let panRatio = random([0, 0, random([0, 5, 10, 15])]);
  // noprotect
  for (x = 0; x < width; x += span) {
    if (noise(x / 2) < ignorePossibility) continue;
    // noprotect
    for (y = 0; y < height; y += span) {
      if (noise(x, y) < ignorePossibility) continue;
      if (noise(x / gapScale, y / gapScale) <= gapRatio) continue;
      particles.push(
        new Particle({
          p: createVector(
            x + noise(x / panScale, y / panScale) * panRatio,
            y + noise(x / panScale, y / panScale, 100000) * panRatio
          ),
          r: noise(x, y) * maxSize * random(1),
          color: color(random(0, 360), 100, 100, 1),
        })
      );
    }
  }
}

function draw() {
  webGLCanvas.shader(theShader);
  theShader.setUniform("u_resolution", [width / 1000, height / 1000]);
  theShader.setUniform("u_time", millis() / 1000);
  theShader.setUniform("u_mouse", [mouseX / width, mouseY / height]);
  theShader.setUniform("u_tex", originalGraphics);

  webGLCanvas.clear();

  webGLCanvas.background(bgColor);
  background(0);

  webGLCanvas.rect(-width / 2, -height / 2, width, height);

  particles.forEach((p) => {
    p.update();
    p.draw(originalGraphics);
  });
  particles = particles.filter((p) => p.alive);

  originalGraphics.noStroke();

  // blendMode(HARD_LIGHT); // alpha: 20 ~ 40
  // blendMode(DIFFERENCE); // alpha: 20 ~ 100
  // blendMode(DODGE); // alpha: 1 ~ 40
  // blendMode(BURN); // alpha: 1 ~ 40
  image(webGLCanvas, 0, 0);

  if (particles.length == 0) {
    noFill();
    stroke("#202020");
    strokeWeight(10);
    rect(0, 0, width, height);
  }
}
