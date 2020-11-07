

var angle = 0.5;
var leftScale = 0.7;
var rightScale = 0.65;
var level = 0;
var branchProb = 0.8;
var r = 1;
var shrinkage = 0;
var thinness = 12;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = Math.random(0, 1);
}

function draw() {
  background(51);
  translate(windowWidth/2, height);
  branch(windowHeight/4 - shrinkage);

}

function branch(len) {
  level++;
  stroke(82, 51, 51);
  strokeWeight(len/thinness);
  line(0,0,0,-len);
  translate(0, -len);
  //r = Math.random();
  if(len > 1/* && r < branchProb*/) {
    push();
    rotate(angle);
    branch(len * rightScale);
    pop();
    push();
    rotate(-angle);
    branch(len * leftScale);
    pop();
  }
  else {
    stroke(29, 161, 0);
    point(0, 0);
  }
}
