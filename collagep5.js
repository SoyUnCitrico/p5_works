/**
 * collage generator. example footage can be found in "P_4_2_1_footage".
 * if you use your own footage, make sure to rename the files or adjust the prefixes:
 * see the parameters of generateCollageItems()
 *
 * KEYS
 * 1-3                  : create a new collage (layer specific)
 * s                    : save png
 */
var layer1Images = [];
var layer2Images = [];
var layer3Images = [];

var layer1Items = [];
var layer2Items = [];
var layer3Items = [];

function preload() {
  layer1Images.push(loadImage('/data/collage/layer1_01.png'));
  layer1Images.push(loadImage('/data/collage/layer1_02.png'));
  layer1Images.push(loadImage('/data/collage/layer1_03.png'));
  layer1Images.push(loadImage('/data/collage/layer1_04.png'));
  layer1Images.push(loadImage('/data/collage/layer1_05.png'));
  layer1Images.push(loadImage('/data/collage/layer1_06.png'));
  layer1Images.push(loadImage('/data/collage/layer1_07.png'));
  layer1Images.push(loadImage('/data/collage/layer1_08.png'));
  layer1Images.push(loadImage('/data/collage/layer1_09.png'));
  layer1Images.push(loadImage('/data/collage/layer1_10.png'));
  layer1Images.push(loadImage('/data/collage/layer1_11.png'));

  layer2Images.push(loadImage('/data/collage/layer2_01.png'));
  layer2Images.push(loadImage('/data/collage/layer2_02.png'));
  layer2Images.push(loadImage('/data/collage/layer2_03.png'));
  layer2Images.push(loadImage('/data/collage/layer2_04.png'));
  layer2Images.push(loadImage('/data/collage/layer2_05.png'));

  layer3Images.push(loadImage('/data/collage/layer3_01.png'));
  layer3Images.push(loadImage('/data/collage/layer3_02.png'));
  layer3Images.push(loadImage('/data/collage/layer3_03.png'));
  layer3Images.push(loadImage('/data/collage/layer3_04.png'));
  layer3Images.push(loadImage('/data/collage/layer3_05.png'));
  layer3Images.push(loadImage('/data/collage/layer3_06.png'));
  layer3Images.push(loadImage('/data/collage/layer3_07.png'));
  layer3Images.push(loadImage('/data/collage/layer3_08.png'));
  layer3Images.push(loadImage('/data/collage/layer3_09.png'));
  layer3Images.push(loadImage('/data/collage/layer3_10.png'));
  layer3Images.push(loadImage('/data/collage/layer3_11.png'));
  layer3Images.push(loadImage('/data/collage/layer3_12.png'));
  layer3Images.push(loadImage('/data/collage/layer3_13.png'));
  layer3Images.push(loadImage('/data/collage/layer3_14.png'));
  layer3Images.push(loadImage('/data/collage/layer3_15.png'));
  layer3Images.push(loadImage('/data/collage/layer3_16.png'));
  layer3Images.push(loadImage('/data/collage/layer3_17.png'));
  layer3Images.push(loadImage('/data/collage/layer3_18.png'));
  layer3Images.push(loadImage('/data/collage/layer3_19.png'));
  layer3Images.push(loadImage('/data/collage/layer3_20.png'));
  layer3Images.push(loadImage('/data/collage/layer3_21.png'));
  layer3Images.push(loadImage('/data/collage/layer3_22.png'));
}

function setup() {
  createCanvas(1024, 768);
  imageMode(CENTER);

  layer1Items = generateCollageItems(layer1Images, 100, width / 2, height / 2, width, height, 0.1, 0.5, 0, 0);
  layer2Items = generateCollageItems(layer2Images, 150, width / 2, height / 2, width, height, 0.1, 0.3, -HALF_PI, HALF_PI);
  layer3Items = generateCollageItems(layer3Images, 110, width / 2, height / 2, width, height, 0.1, 0.4, 0, 0);

  drawCollageItems(layer1Items);
  drawCollageItems(layer2Items);
  drawCollageItems(layer3Items);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') layer1Items = generateCollageItems(layer1Images, random(50, 200), width / 2, height / 2, width, height, 0.1, 0.5, 0, 0);
  if (key == '2') layer2Items = generateCollageItems(layer2Images, random(25, 300), width / 2, height / 2, width, height, 0.1, random(0.3, 0.8), -HALF_PI, HALF_PI);
  if (key == '3') layer3Items = generateCollageItems(layer3Images, random(50, 300), width / 2, height / 2, width, height, 0.1, random(0.2, 0.6), -0.05, 0.05);

  clear();

  drawCollageItems(layer1Items);
  drawCollageItems(layer2Items);
  drawCollageItems(layer3Items);
}

function generateCollageItems(layerImages, count, posX, posY, rangeX, rangeY, scaleStart, scaleEnd, rotationStart, rotationEnd) {
  var layerItems = [];
  for (var i = 0; i < count; i++) {
    var index = i % layerImages.length;
    var item = new CollageItem(layerImages[index]);
    item.x = posX + random(-rangeX / 2, rangeX / 2);
    item.y = posY + random(-rangeY / 2, rangeY / 2);
    item.scaling = random(scaleStart, scaleEnd);
    item.rotation = random(rotationStart, rotationEnd);
    layerItems.push(item);
  }
  return layerItems;
}

function CollageItem(image) {
  this.image = image;
  this.x = 0;
  this.y = 0;
  this.rotation = 0;
  this.scaling = 1;
}

function drawCollageItems(layerItems) {
  for (var i = 0; i < layerItems.length; i++) {
    push();
    translate(layerItems[i].x, layerItems[i].y);
    rotate(layerItems[i].rotation);
    scale(layerItems[i].scaling);
    image(layerItems[i].image, 0, 0);
    pop();
  }
}