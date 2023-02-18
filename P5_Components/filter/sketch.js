const ver = 2;

function setup() {
  createCanvas(600, 600);
  background(100);

  filter1 = new makeFilter();
}

function draw() {
  image(overAllTexture, 0, 0);
}
