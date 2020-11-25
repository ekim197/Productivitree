var tabs;

chrome.runtime.sendMessage({method: "getTabs"}, function(response) {
    tabs = response.status;
  });
/*
async function getTabs() {
    tabs = localStorage["allWindowsTabCount"]
}

*/

var health = 0 + 0.002*tabs;
var angle1 = 0.5;
var angle2 = 0.6;
var angle3 = 0.4;

var leftScale1 = 0.77-6*health;
var rightScale1 = 0.67-2*health;
var leftScale2 = 0.82-4*health;
var rightScale2 = 0.72-3*health;
var leftScale3 = 0.56-5*health;
var rightScale3 = 0.77-7*health;

var level = 0;
var branchProb = 0.8;
var r = 1;
var shrinkage = 0;
var thinness = 8;

function setup() {
createCanvas(windowWidth, windowHeight);
r = Math.random(0, 1);
}

function draw() {
console.log(tabs);
background(230);
translate(windowWidth/2, height);
branch1(windowHeight/4 - shrinkage);

}

function branch1(len) {
stroke(82, 51, 51);
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
else {
    stroke(29, 161, 0);
    point(0, 0);
}
}

function branch2(len) {
stroke(82, 51, 51);
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
else {
    stroke(29, 161, 0);
    point(0, 0);
}
}

function branch3(len) {
stroke(82, 51, 51);
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
    stroke(255, 209, 253);
    point(0, 0);
}
}



