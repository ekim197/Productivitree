var tabs = 1;

/*
chrome.runtime.sendMessage({method: "getTabs"}, function(response) {
    tabs = response.status;
  });

async function getTabs() {
    tabs = localStorage["allWindowsTabCount"]
}

*/

if(tabs > 26)
  tabs = 26;
var health = 0 + 0.002*tabs;


var angle1 = 0.5;
var angle2 = 0.6;
var angle3 = 0.4;

var leftScale1 = 0.5;
var rightScale1 = 0.5;
var leftScale2 = 0.5;
var rightScale2 = 0.5;
var leftScale3 = 0.5;
var rightScale3 = 0.5;
var skew = 0.4 * (tabs/26);
var leftSkew = 0;
var rightSkew = 0;



var level = 0;
var branchProb = 0.8;
var r = 1;
var shrinkage = 0;
var thinness = 6 + tabs;
var r = 0;
var g = 0;
var b = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if(random() > 0.5) {
    rightSkew = 0.8*skew;
  }
  else {
    leftSkew = skew;
  }
  leftScale1 = random(0.65, 0.75) - 6*health - rightSkew;
  rightScale1 = random(0.65, 0.75) - 2*health - leftSkew;
  leftScale2 = random(0.65, 0.8) - 4*health - rightSkew;
  rightScale2 = random(0.65, 0.8) - 3*health - leftSkew;
  leftScale3 = random(0.6, 0.7) - 5*health - rightSkew;
  rightScale3 = random(0.7, 0.8) - 7*health - leftSkew;
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
//  fill('green');
//  rect(0, 0.88*height, windowWidth, height);
  stroke('green');
  strokeWeight(0.12*windowHeight);
  line(0,windowHeight*0.94,windowWidth,windowHeight*0.94);
  translate(windowWidth/2, height*0.9);
  branch1(windowHeight/4 - shrinkage);

}

function branch1(len) {
  stroke(82 + (windowHeight/4 - shrinkage - len)*0.1,
         51 + (windowHeight/4 - shrinkage - len)*0.1,
         51 + (windowHeight/4 - shrinkage - len)*0.1);
  strokeWeight(len/thinness);
  line(0,0,0,-len);
  translate(0, -len);
  if(len > 1) {
    push();
    rotate(angle1);
    branch2(len * rightScale1);
    pop();
    push();
    rotate(-angle1);
    branch3(len * leftScale1);
    pop();
  }
  else if(tabs < 6) {
    stroke(29, 161, 0);
    point(0, 0);
  }
}

function branch2(len) {
  stroke(82 + (windowHeight/4 - shrinkage - len)*0.1,
         51 + (windowHeight/4 - shrinkage - len)*0.1,
         51 + (windowHeight/4 - shrinkage - len)*0.1);
  strokeWeight(len/thinness);
  line(0,0,0,-len);
  translate(0, -len);
  if(len > 1) {
    push();
    rotate(angle2);
    branch1(len * rightScale2);
    pop();
    push();
    rotate(-angle2);
    branch3(len * leftScale2);
    pop();
  }
  else if(tabs < 16) {
    stroke(29, 161, 0);
    point(0, 0);
  }
}

function branch3(len) {
  stroke(82 + (windowHeight/4 - shrinkage - len)*0.1,
         51 + (windowHeight/4 - shrinkage - len)*0.1,
         51 + (windowHeight/4 - shrinkage - len)*0.1);
  strokeWeight(len/thinness);
  line(0,0,0,-len);
  translate(0, -len);
  if(len > 1) {
    push();
    rotate(angle3);
    branch1(len * rightScale3);
    pop();
    push();
    rotate(-angle3);
    branch2(len * leftScale3);
    pop();
  }
  else {
    stroke(r, g, b);
    point(0, 0);
  }
}
