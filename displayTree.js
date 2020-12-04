var thisDay = 1;
var thisMonth = "noMonth";
var date = "No date obtained";
var thisHour = 00;
var thisMinute = 00;
var ampm = "AM";

var tabs;
var health;
var sway;
var angle1;
var angle2;
var angle3;

var leftScale1;
var rightScale1;
var leftScale2;
var rightScale2;
var leftScale3;
var rightScale3;

var skew;
var leftSkew;
var rightSkew;

var shrinkage;
var thinness;

var txtSize = 25;
var backgroundColor;

var r;
var g;
var b;

var swayLimit = 9;

chrome.runtime.sendMessage({ method: "getTabs" }, function (response) {
  tabs = response.status;
});

chrome.runtime.sendMessage({ method: "getHealth" }, function (response) {

  health = response.status;
});
chrome.runtime.sendMessage({ method: "getSway" }, function (response) {

  sway = response.status;
});
chrome.runtime.sendMessage({ method: "getAngle1" }, function (response) {

  angle1 = response.status;
});
chrome.runtime.sendMessage({ method: "getAngle2" }, function (response) {

  angle2 = response.status;
});
chrome.runtime.sendMessage({ method: "getAngle3" }, function (response) {

  angle3 = response.status;
});


chrome.runtime.sendMessage({ method: "getLeftScale1" }, function (response) {

  leftScale1 = response.status;
});
chrome.runtime.sendMessage({ method: "getRightScale1" }, function (response) {

  rightScale1 = response.status;
});
chrome.runtime.sendMessage({ method: "getLeftScale2" }, function (response) {

  leftScale2 = response.status;
});
chrome.runtime.sendMessage({ method: "getRightScale2" }, function (response) {

  rightScale2 = response.status;
});
chrome.runtime.sendMessage({ method: "getLeftScale3" }, function (response) {

  leftScale3 = response.status;
});
chrome.runtime.sendMessage({ method: "getRightScale3" }, function (response) {

  rightScale3 = response.status;

});
chrome.runtime.sendMessage({ method: "getSkew" }, function (response) {

  skew = response.status;
});
chrome.runtime.sendMessage({ method: "getLeftSkew" }, function (response) {

  leftSkew = response.status;
});
chrome.runtime.sendMessage({ method: "getRightSkew" }, function (response) {

  rightSkew = response.status;
});

chrome.runtime.sendMessage({ method: "getshrinkage" }, function (response) {

  shrinkage = response.status;
});
chrome.runtime.sendMessage({ method: "getthinness" }, function (response) {

  thinness = response.status;

});
chrome.runtime.sendMessage({ method: "getR" }, function (response) {

  r = response.status;
});
chrome.runtime.sendMessage({ method: "getG" }, function (response) {

  g = response.status;
});
chrome.runtime.sendMessage({ method: "getB" }, function (response) {

  b = response.status;
});
chrome.runtime.sendMessage({ method: "getBackgroundColor1" }, function (response) {
  backgroundColor = response.status;
});

if (tabs > 26)
  tabs = 26;

function setup() {
  var windowWidth = document.getElementById("my_canvas").offsetWidth;
  var windowHeight = document.getElementById("my_canvas").offsetHeight;
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("my_canvas");
  if (random() > 0.5) {
    rightSkew = 0.8 * skew;
  }
  else {
    leftSkew = skew;
  }
  leftScale1 = random(0.65, 0.75) - 6 * health - rightSkew;
  rightScale1 = random(0.65, 0.75) - 2 * health - leftSkew;
  leftScale2 = random(0.65, 0.8) - 4 * health - rightSkew;
  rightScale2 = random(0.65, 0.8) - 3 * health - leftSkew;
  leftScale3 = random(0.6, 0.7) - 5 * health - rightSkew;
  rightScale3 = random(0.7, 0.8) - 7 * health - leftSkew;
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  if (tabs < swayLimit)
    noLoop();

  setDate();
}

function draw() {
  if (tabs < 15)
    sway = 0.8 * cos(0.018 * frameCount) * sin(0.08 * frameCount) * sin(0.04 * frameCount);
  else {
    sway = 0.7 * cos(0.015 * frameCount) * sin(0.07 * frameCount) * sin(0.03 * frameCount);
  }

  background(backgroundColor)
  textSize(txtSize);
  textStyle(BOLD);
  noStroke();
  var w = textWidth(date);
  fill(backgroundColor);
  rect(10, 10, w, 12);
  fill(0);
  text(date, windowWidth / 3.8, 37);

  translate(windowWidth / 5, height);
  branch1(windowHeight / 4 - shrinkage);

}

function branch1(len) {
  stroke(82 + (windowHeight / 4 - shrinkage - len) * 0.1,
    51 + (windowHeight / 4 - shrinkage - len) * 0.1,
    51 + (windowHeight / 4 - shrinkage - len) * 0.1);
  strokeWeight(len / thinness);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 1) {
    push();
    rotate(0.4 + 0.04 * sway);
    branch2(len * rightScale1);
    pop();
    push();
    rotate(-0.4 + 0.04 * sway);
    branch3(len * leftScale1);
    pop();
  }
  else if (tabs < 6) {
    stroke(29, 161, 0);
    point(0, 0);
  }
}

function branch2(len) {
  stroke(82 + (windowHeight / 4 - shrinkage - len) * 0.1,
    51 + (windowHeight / 4 - shrinkage - len) * 0.1,
    51 + (windowHeight / 4 - shrinkage - len) * 0.1);
  strokeWeight(len / thinness);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 1) {
    push();
    rotate(0.6 + 0.04 * sway);
    branch1(len * rightScale2);
    pop();
    push();
    rotate(-0.6 + 0.04 * sway);
    branch3(len * leftScale2);
    pop();
  }
  else if (tabs < 16 ) {
    stroke(29, 161, 0);
    point(0, 0);
  }
}

function branch3(len) {
  stroke(82 + (windowHeight / 4 - shrinkage - len) * 0.1,
    51 + (windowHeight / 4 - shrinkage - len) * 0.1,
    51 + (windowHeight / 4 - shrinkage - len) * 0.1);
  strokeWeight(len / thinness);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 1) {
    push();
    rotate(0.5 + 0.04 * sway);
    branch1(len * rightScale3);
    pop();
    push();
    rotate(-0.5 + 0.04 * sway);
    branch2(len * leftScale3);
    pop();
  }
  else {
    stroke(r, g, b);
    point(0, 0);
  }
}


function setDate() {
  switch (month()) {
  case 1:
      thisMonth = "January";
      break;
  case 2:
      thisMonth = "February";
      break;
  case 3:
      thisMonth = "March";
      break;
  case 4:
      thisMonth = "April";
      break;
  case 5:
      thisMonth = "May";
      break;
  case 6:
      thisMonth = "June";
      break;
  case 7:
      thisMonth = "July";
      break;
  case 8:
      thisMonth = "August";
      break;
  case 9:
      thisMonth = "September";
      break;
  case 10:
      thisMonth = "October";
      break;
  case 11:
      thisMonth = "November";
      break;
  case 12:
      thisMonth = "December";
      break;
    default: console.log("invalid month returned by month() function");
  }


  thisYear = year();
  thisDay = day();
  thisHour = hour();
  if(thisHour > 12) {
    thisHour = thisHour - 12;
    ampm = "PM";
  }
  else if(thisHour = 12)
    ampm = "PM";
  else if(thisHour = 0)
    thisHour = 12;

  thisMinute = minute();
  if(thisMinute < 10)
    thisMinute = "0" + thisMinute;
  date = thisHour + ":" + thisMinute + " " + ampm + " " + thisMonth + " " + thisDay + ", " + thisYear;
}
