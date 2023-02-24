// Lotus
// By Chih-Yung Chang
// Github: https://github.com/ChihYungChang
// Openprocessing: https://openprocessing.org/user/324595?o=2&view=sketches
ChihYungChang;

const lotusLeafList = [];
const lotusList = [];

function setup() {
  createCanvas(768, 1024);
  background(random(["#21465f", "#0f1818"]));
  angleMode(DEGREES);

  for (let i = 0; i < int(random(30, 60)); i++) {
    const lotusLeaf = new LotusLeaf({
      position: createVector(random(width), random(height)),
    });
    lotusLeafList.push(lotusLeaf);
  }

  for (const lotusLeaf of lotusLeafList) {
    lotusLeaf.draw();
  }

  for (let i = 0; i < int(random(5, 10)); i++) {
    const lotus = new Lotus({
      position: createVector(random(width), random(height)),
    });
    lotusList.push(lotus);
  }

  for (const lotus of lotusList) {
    lotus.draw();
  }
}

function draw() {}
