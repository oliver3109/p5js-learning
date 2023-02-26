// Blood Forest Under The Moon 2
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches
ChihYungChang;

function makeFilter(ver) {
  push();
  colorMode(HSB, 360, 100, 100, 100);
  drawingContext.shadowColor = color(0, 0, 5, 95);
  overAllTexture = createGraphics(width, height);
  overAllTexture.loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (ver == 1) {
        overAllTexture.set(
          x,
          y,
          color(
            0,
            0,
            random(95, 85),
            (noise(x / 3, y / 3, (x * y) / 50) * random(5, 15)) / 1
          )
        );
      }
      if (ver == 2) {
        overAllTexture.set(
          x,
          y,
          color(
            0,
            100,
            map(dist(x, y, width / 2, height / 2), 0, width / 2, 100, 0),
            map(dist(x, y, width / 2, height / 2 + 300), 0, width / 1.5, 0, 30)
          )
        );
      }
    }
  }
  overAllTexture.updatePixels();
  pop();
  return overAllTexture;
}
