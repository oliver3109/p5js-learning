//ref makeFilter from https://openprocessing.org/sketch/1844970/

function makeFilter() {
  let filterNum = random([1, 2]);
  randomSeed(seed);
  colorMode(HSB, 360, 100, 100, 100);
  drawingContext.shadowColor = color(0, 0, 5, 1);
  overAllTexture = createGraphics(width, height);
  overAllTexture.loadPixels();
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      if (filterNum % 4 == 0) {
        overAllTexture.set(
          i,
          j,
          color(random(60), 5, 95, noise(i / 3, j / 3, (i * j) / 50) * 12)
        ); // white
      } else if (filterNum % 4 == 1) {
        overAllTexture.set(
          i,
          j,
          color(221, 100, 28, noise(i / 3, j / 3, (i * j) / 50) * 12)
        ); // dark blue
      } else if (filterNum % 4 == 2) {
        overAllTexture.set(
          i,
          j,
          color(
            random(268, 273),
            100,
            32,
            noise(i / 3, j / 3, (i * j) / 50) * 12
          )
        ); // purple
      } else if (filterNum % 4 == 3) {
        overAllTexture.set(
          i,
          j,
          color(
            random(200, 210),
            10,
            86,
            noise(i / 3, j / 3, (i * j) / 50) * 12
          )
        );
      }
    }
  }
  overAllTexture.updatePixels();
}
