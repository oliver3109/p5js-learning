// Text Poster Loop Animation
// By Chih-Yung Chang
// My Github https://github.com/ChihYungChang
// More Works https://openprocessing.org/user/324595?o=2&view=sketches

let font;
let textScrolling;

function setup() {
  createCanvas(1000, 1000);
  frameRate(90);
  noStroke();

  opentype.load("./JetBrainsMono.ttf", function (err, f) {
    if (err) {
      alert("Font could not be loaded: " + err);
    } else {
      font = f;
      textScrolling = new TextScrolling([
        { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 200 },
        { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 320 },
        { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 200 },
        { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 100 },
        { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 100 },
        { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 150 },
        { list: ["CRENERATIVE", "CODING", "WITH", "P5JS"], fontSize: 280 },
      ]);
    }
  });
}

function draw() {
  background(0, 150);

  if (textScrolling) {
    textScrolling.update();
    textScrolling.draw();
  }
}

function getTextBound(text, fontSize) {
  const hrate = fontSize / height;
  const glyph = font.charToGlyph(text);
  const w = font.getAdvanceWidth(text, fontSize);

  return {
    w: w,
    h: glyph.yMax * hrate,
  };
}

class TextScrolling {
  constructor(row) {
    this.rollList = [];

    let y = 0;
    for (let i = 0; i < row.length; i++) {
      const wordList = row[i].list;
      const fontSize = row[i].fontSize;
      const graphicsList = [];
      const { h } = getTextBound(wordList[0][0], fontSize);
      for (let text of wordList) {
        const textSize = getTextBound(text, fontSize);
        const graphics = createGraphics(textSize.w, h + 8);
        let x = 0;
        const c = {
          r: int(random(255)),
          g: int(random(255)),
          b: int(random(255)),
        };
        for (let char of text.split("")) {
          const path = font.getPath(char, x, h, fontSize);
          const charSize = getTextBound(char, fontSize);

          this.drawFont(graphics, path, c);
          x += charSize.w;
        }
        graphicsList.push({ y, graphics, h, text });
      }
      this.rollList.push(new Roll(y, graphicsList));
      y += h;
    }
  }

  update() {
    for (let row of this.rollList) {
      row.update();
    }
  }

  draw() {
    for (let row of this.rollList) {
      row.draw();
    }
  }

  drawFont(graphics, path, c) {
    path.fill = `rgb(${c.r}, ${c.g}, ${c.b})`;
    let _ctx = graphics.drawingContext;
    path.draw(_ctx);
  }
}

class Roll {
  constructor(y, graphicsList) {
    this.y = y;
    this.graphicsList = graphicsList;

    this.maxLength = this.graphicsList.length;

    this.currentIndex = 0;
    this.nextIndex = 1;

    this.time = int(random(0, 100));

    this.acc = 1;
  }

  update() {
    this.time = (this.time + this.acc) % 100;

    if (this.time == 99) {
      this.acc = 0;
      this.time = 0;
      setTimeout(() => {
        this.acc = 1;
      }, 1000);
      this.currentIndex += 1;
      this.nextIndex += 1;
      if (this.nextIndex >= this.maxLength) {
        this.nextIndex = 0;
      }
      if (this.currentIndex >= this.maxLength) {
        this.currentIndex = 0;
        this.nextIndex = 1;
      }
    }
  }

  draw() {
    const time = this.time;
    const leftOffset = map(time, 0, 99, 0, width);
    const left = this.graphicsList[this.currentIndex];
    const right = this.graphicsList[this.nextIndex];

    image(left.graphics, 0, this.y, width - leftOffset, left.h);
    image(right.graphics, width - leftOffset, this.y, width, right.h);
  }
}

function keyPressed() {
  if (key === "s") {
    saveGif("mySketch", 5);
  }
}
