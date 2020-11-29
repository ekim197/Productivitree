


    var tabs;
    var health;
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
    
    var level;
    var branchProb;
    var shrinkage;
    var thinness;
    var r;
    var g;
    var b;
    
    chrome.runtime.sendMessage({method: "getTabs"}, function(response) {
        tabs = response.status;
      }); 
    
      chrome.runtime.sendMessage({method: "getHealth"}, function(response) {
    
        health = response.status;
      });
      chrome.runtime.sendMessage({method: "getAngle1"}, function(response) {
    
        angle1 = response.status;
      });
      chrome.runtime.sendMessage({method: "getAngle2"}, function(response) {
    
        angle2 = response.status;
      });
      chrome.runtime.sendMessage({method: "getAngle3"}, function(response) {
    
        angle3 = response.status;
      });
    
    
      chrome.runtime.sendMessage({method: "getLeftScale1"}, function(response) {
    
        leftScale1 = response.status;
      });
      chrome.runtime.sendMessage({method: "getRightScale1"}, function(response) {
    
        rightScale1 = response.status;
      });
      chrome.runtime.sendMessage({method: "getLeftScale2"}, function(response) {
    
        leftScale2 = response.status;
      });
      chrome.runtime.sendMessage({method: "getRightScale2"}, function(response) {
    
        rightScale2 = response.status;
      });
      chrome.runtime.sendMessage({method: "getLeftScale3"}, function(response) {
    
        leftScale3 = response.status;
      });
      chrome.runtime.sendMessage({method: "getRightScale3"}, function(response) {
    
        rightScale3 = response.status;
    
      });
      chrome.runtime.sendMessage({method: "getSkew"}, function(response) {
    
        skew = response.status;
      });
      chrome.runtime.sendMessage({method: "getLeftSkew"}, function(response) {
    
        leftSkew = response.status;
      });
      chrome.runtime.sendMessage({method: "getRightSkew"}, function(response) {
    
        rightSkew = response.status;
      });
    
    
    
      chrome.runtime.sendMessage({method: "getlevel"}, function(response) {
    
        level = response.status;
      });
      chrome.runtime.sendMessage({method: "getbranchprob"}, function(response) {
    
        branchProb = response.status;
      });
       /*chrome.runtime.sendMessage({method: "getr"}, function(response) {
        r = response.status;
      }); */
      chrome.runtime.sendMessage({method: "getshrinkage"}, function(response) {
    
        shrinkage = response.status;
      });
      chrome.runtime.sendMessage({method: "getthinness"}, function(response) {
    
        thinness = response.status;
    
      });
      chrome.runtime.sendMessage({method: "getR"}, function(response) {
    
        r = response.status;
      });
      chrome.runtime.sendMessage({method: "getG"}, function(response) {
    
        g = response.status;
      });
      chrome.runtime.sendMessage({method: "getB"}, function(response) {
    
        b = response.status;
      });
    /*
    async function getTabs() {
        tabs = localStorage["allWindowsTabCount"]
    }
    */
    if(tabs > 26)             //concern
      tabs = 26;
    
     
      function setup() {
        var windowWidth = document.getElementById("my_canvas").offsetWidth;
        var windowHeight = document.getElementById("my_canvas").offsetHeight;
        var myCanvas = createCanvas(windowWidth, windowHeight);
        myCanvas.parent("my_canvas");
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
      /*
        console.log(tabs);
        console.log(health);
        console.log(angle1);
        console.log(angle2);
        console.log(angle3);
        console.log(leftScale1);
        console.log(rightScale1);
        console.log(leftScale2);
        console.log(rightScale2);
        console.log(leftScale3);
        console.log(rightScale3);
        console.log(level);
        console.log(branchProb);
        console.log(r);
        console.log(g);
        console.log(b);
        console.log(shrinkage);
        console.log(thinness);  */
    
    
    function draw() {
      //resizeCanvas(windowWidth, windowHeight);
      background(255, 204, 200);
    //  fill('green');
    //  rect(0, 0.88*height, windowWidth, height);
    /*  stroke('green');
      strokeWeight(0.12*windowHeight);
      line(0,windowHeight*0.94,windowWidth,windowHeight*0.94); */
      translate(windowWidth/5, height);
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
    