// Rectangle Composition
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches

function makeFilter(ver) {
  push();
  colorMode(HSB, 360, 100, 100, 100);
  drawingContext.shadowColor = color(0, 0, 5, 95);
  let overAllTexture = createGraphics(width, height);
  overAllTexture.loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (ver == 1) {
        overAllTexture.set(
          i,
          j,
          color(
            0,
            0,
            random(95, 85),
            (noise(i / 3, j / 3, (i * j) / 50) * random(5, 15)) / 1
          )
        );
      }
      if (ver == 2) {
        const alpha = (noise(i / 3, j / 3, (i * j) / 50) * random(5, 15)) / 1;
        overAllTexture.set(i, j, color(0, 0, random(5, 10), alpha));
      }
    }
  }
  overAllTexture.updatePixels();
  pop();

  return overAllTexture;
}
