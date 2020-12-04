var tabs = 7;

if(tabs > 26)
  tabs = 26;
//Decreases leftScale1, rightScale1, etc.
var health = 0 + 0.002*tabs;

var sway = 0;

// Angle that each branch function branches at:
var angle1 = 0.5;
var angle2 = 0.6;
var angle3 = 0.4;

// Initialized to 0.5, will change in setup.
var leftScale1 = 0.5;
var rightScale1 = 0.5;
var leftScale2 = 0.5;
var rightScale2 = 0.5;
var leftScale3 = 0.5;
var rightScale3 = 0.5;
// How much longer one branch is than the other:
var skew = 0.4 * (tabs/26);
var leftSkew = 0;
var rightSkew = 0;


var thinness = 6 + tabs;  //scales down strikeWeight

//color(will randomize later)
var r = 0;
var g = 0;
var b = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Skews to the left/right half of the time
  if(random() > 0.5) {
    rightSkew = 0.8*skew;
  }
  else {
    leftSkew = skew;
  }

  //Randomizes all the scaling variables, within a certain range
  leftScale1 = random(0.65, 0.75) - 6*health - rightSkew;
  rightScale1 = random(0.65, 0.75) - 2*health - leftSkew;
  leftScale2 = random(0.65, 0.8) - 4*health - rightSkew;
  rightScale2 = random(0.65, 0.8) - 3*health - leftSkew;
  leftScale3 = random(0.6, 0.7) - 5*health - rightSkew;
  rightScale3 = random(0.7, 0.8) - 7*health - leftSkew;
  //Random color, for leaves only in branch3.
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  // only sways if tabs is greater than 6, too slow for larger trees.
  if(tabs < 7)
    noLoop();
}

function draw() {
  // Sway changes periodically based on frameCount, makes it look like it's randomly swaying.
  sway = cos(0.02*frameCount)*sin(0.1*frameCount);
  background(255, 204, 200);
  translate(windowWidth/2, height);
  branch1(windowHeight/4);

}

function branch1(len) {
  stroke(82 + (windowHeight/4 - len)*0.1,
         51 + (windowHeight/4 - len)*0.1,
         51 + (windowHeight/4 - len)*0.1);
  strokeWeight(len/thinness);
  line(0,0,0,-len);
  translate(0, -len);
  if(len > 1) {
    push();
    rotate(angle1 + 0.04*sway);
    branch2(len * rightScale1);
    pop();
    push();
    rotate(-angle1 + 0.04*sway);
    branch3(len * leftScale1);
    pop();
  }
  else if(tabs < 6) {
    stroke(29, 161, 0);
    point(0, 0);
  }
}

function branch2(len) {
  stroke(82 + (windowHeight/4 - len)*0.1,
         51 + (windowHeight/4 - len)*0.1,
         51 + (windowHeight/4 - len)*0.1);
  strokeWeight(len/thinness);
  line(0,0,0,-len);
  translate(0, -len);
  if(len > 1) {
    push();
    rotate(angle2 + 0.04*sway);
    branch1(len * rightScale2);
    pop();
    push();
    rotate(-angle2 + 0.04*sway);
    branch3(len * leftScale2);
    pop();
  }
  else if(tabs < 16) {
    stroke(29, 161, 0);
    point(0, 0);
  }
}

function branch3(len) {
  stroke(82 + (windowHeight/4 - len)*0.1,
         51 + (windowHeight/4 - len)*0.1,
         51 + (windowHeight/4 - len)*0.1);
  strokeWeight(len/thinness);
  line(0,0,0,-len);
  translate(0, -len);
  if(len > 1) {
    push();
    rotate(angle3 + 0.04*sway);
    branch1(len * rightScale3);
    pop();
    push();
    rotate(-angle3 + 0.04*sway);
    branch2(len * leftScale3);
    pop();
  }
  else {
    stroke(r, g, b);
    point(0, 0);
  }
}
