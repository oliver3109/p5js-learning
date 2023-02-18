let leaf;

function setup() {
  createCanvas(600, 600);
  frameRate(1);

  // // 0.0.1
  // leaf = new Leaf({
  //   length: 200,
  //   x: width / 2,
  //   y: height / 2,
  //   angle: -45,
  //   fillColor: color("#654e48"),
  //   strokeColor: color("#2b262a"),
  //   debugMode: false,
  //   textureMode: true,
  //   sWeight: 2,
  // });

  // 0.0.2
  leaf = new Leaf({
    length: 200,
    x: width / 2,
    y: height / 2,
    angle: -45,
    fillColor: color("#654e48"),
    strokeColor: color("#2b262a"),
    debugMode: false,
    textureMode: true,
    sWeight: 2,
    textureHighlightColor: "#bfa49d",
  });
}

function draw() {
  background(100);
  leaf.draw();
  noLoop();
}
