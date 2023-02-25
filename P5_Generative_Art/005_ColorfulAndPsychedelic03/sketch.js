// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Twitter: https://twitter.com/chihyungchang66
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

var seed = Math.random() * 2941;

let margin, round;

let theShader;
let webGLCanvas;
let originalGraphics;

let mySize = 1080;

function preload() {
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
  frameRate(25);
  randomSeed(seed);
  pixelDensity(2);
  margin = mySize / 100;
  createCanvas(mySize, mySize);
  webGLCanvas = createGraphics(width, height, WEBGL);
  originalGraphics = createGraphics(width, height);
  originalGraphics.colorMode(HSB, 360, 100, 100, 100);
  // originalGraphics.background(0);

  round = 0;

  colorMode(HSB, 360, 100, 100, 100);
  new makeFilter();
}

function draw() {
  webGLCanvas.shader(theShader);
  theShader.setUniform("u_resolution", [width / width, height / height]);
  theShader.setUniform("u_time", millis() / 1000);
  theShader.setUniform("u_mouse", [mouseX / width, mouseY / height]);
  theShader.setUniform("u_tex", originalGraphics);
  theShader.setUniform("u_radius", 0.5);
  theShader.setUniform("u_center", 0.5);
  theShader.setUniform("u_angle", random(TWO_PI));
  webGLCanvas.clear();

  webGLCanvas.rect(-width / 2, -height / 2, width, height);

  // originalGraphics.drawingContext.shadowColor = "#2020200d";
  // originalGraphics.drawingContext.shadowOffsetX = 1;
  // originalGraphics.drawingContext.shadowOffsetY = 1;
  // originalGraphics.drawingContext.shadowBlur = 0;

  let H = 1 * random(-0.25, 0.05);
  let aa = 1.05 * random(1.2, 0.85);

  for (let j = 0; j < 90; j++) {
    originalGraphics.push();
    originalGraphics.translate(0, -height * 1.05 + (j * height) / 15);

    for (let x = 0; x < width * 1.1; x += width / 18) {
      let n = noise(x * 0.05, j * 0.05, frameCount);
      let y = map(n, 0, 1, height * aa, height * H);
      originalGraphics.push();
      originalGraphics.translate(x, y);

      if (random() < 1) {
        originalGraphics.strokeWeight(random(5, 40));
        originalGraphics.stroke(
          color(
            random(0, map(y, height * aa, height * H, 200, 360)),
            100,
            100,
            random(20, 40)
          )
        );
        originalGraphics.line(
          0,
          0,
          random(-height * aa, height * H),
          random(-height * aa, height * H)
        );
      } else {
        // originalGraphics.noStroke();
        // originalGraphics.fill(
        //   color(random(random(0, 120), 360), 100, 100, random(20, 40))
        // );
        // originalGraphics.ellipse(0, 0, random(30, 60));
      }
      originalGraphics.pop();
    }

    originalGraphics.pop();
  }

  blendMode(HARD_LIGHT); // alpha: 20 ~ 40
  // blendMode(DIFFERENCE); // alpha: 20 ~ 100
  // blendMode(DODGE); // alpha: 1 ~ 40
  // blendMode(BURN); // alpha: 1 ~ 40
  image(webGLCanvas, 0, 0);

  blendMode(BLEND);

  if (round > -0.8) {
    round -= random(1, 2) * random(0.05, 0.15);
    image(overAllTexture, 0, 0);
  } else {
    noFill();
    drawingContext.setLineDash([2, 1, 2, 3]);
    image(overAllTexture, 0, 0);

    noFill();
    stroke("#202020");
    strokeWeight(margin);
    rect(0, 0, width, height);
    noLoop();
  }
}
