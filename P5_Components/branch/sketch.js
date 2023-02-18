let branch;

function setup() {
  createCanvas(600, 600);
  background(200);
  frameRate(1);

  // // 0.0.1
  // branch = new Branch({
  //   pos: createVector(width / 2, height),
  //   length: 400,
  //   latitude: 10,
  //   fillColor: color("#fff"),
  //   angle: 10,
  //   level: 0,
  // });

  // // 0.0.2
  // branch = new Branch({
  //   pos: createVector(width / 2, height),
  //   length: 400,
  //   latitude: 4,
  //   fillColor: color("#fff"),
  //   angle: 0,
  //   level: 0,
  //   maxLevel: 1,
  // });

  // 0.0.3
  branch = new Branch({
    pos: createVector(width / 2, height),
    length: 400,
    latitude: 20,
    fillColor: color("#b3786f"),
    strokeColor: color("#000"),
    angle: 0,
    level: 0,
    maxLevel: 1,
  });
}

function draw() {
  branch.draw();
  noLoop();
}
