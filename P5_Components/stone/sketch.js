let stone001;

function setup() {
  createCanvas(600, 600);
  background(100);

  stone001 = new Stone001({
    pos: createVector(width / 2, height / 2),
  });
}

function draw() {
  stone001.draw();
}
