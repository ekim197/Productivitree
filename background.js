function getAllStats(callback) {
  chrome.windows.getAll({populate: true}, function (window_list) {
    callback(window_list);
  });
}

function displayResults(window_list) {
  allWindowsTabCount = 0;
  windowCount = 0;
  for(var i=0; i<window_list.length; i++) { 
    allWindowsTabCount += window_list[i].tabs.length;
  } 
  localStorage["windowsCount"] = window_list.length;
  localStorage["allWindowsTabsCount"] = allWindowsTabCount;
  localStorage["health"] = 0 + 0.002*allWindowsTabCount

  console.log(localStorage["health"])

  localStorage["angle1"] = 0.5
  localStorage["angle2"] = 0.6
  localStorage["angle3"] = 0.4

  localStorage["leftScale1"] = 0.5  
  localStorage["rightScale1"] = 0.5 
  localStorage["leftScale2"] = 0.5  
  localStorage["rightScale2"] = 0.5 
  localStorage["leftScale3"] = 0.5  
  localStorage["rightScale3"] = 0.5 

  localStorage["skew"] = 0.4 * (allWindowsTabCount/26)
  localStorage["leftSkew"] = 0
  localStorage["rightSkew"] = 0

  localStorage["level"] = 0;
  localStorage["branchProb"] = 0.8
  localStorage["shrinkage"] = 0
  localStorage["thinness"] = 6 + allWindowsTabCount
  localStorage["r"] = 0
  localStorage["g"] = 0
  localStorage["b"] = 0
}




  chrome.tabs.onCreated.addListener(function(tab) {
    getAllStats(displayResults);
  });


  chrome.tabs.onRemoved.addListener(function(tab) {
    getAllStats(displayResults);
  });


  chrome.windows.onCreated.addListener(function(tab) {
    getAllStats(displayResults);
  });


  chrome.windows.onRemoved.addListener(function(tab) {
    getAllStats(displayResults);
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getTabs")
      sendResponse({status: localStorage["allWindowsTabsCount"] });
    else if (request.method == "getHealth")
    sendResponse({status: localStorage["health"] });
    else if (request.method == "getAngle1")
    sendResponse({status: localStorage["angle1"] });
    else if (request.method == "getAngle2")
    sendResponse({status: localStorage["angle2"] });
    else if (request.method == "getAngle3")
    sendResponse({status: localStorage["angle3"] });

    else if (request.method == "getLeftScale1")
    sendResponse({status: localStorage["leftScale1"] });
    else if (request.method == "getRightScale1")
    sendResponse({status: localStorage["rightScale1"] });
    else if (request.method == "getLeftScale2")
    sendResponse({status: localStorage["leftScale2"] });
    else if (request.method == "getRightScale2")
    sendResponse({status: localStorage["rightScale2"] });
    else if (request.method == "getLeftScale3")
    sendResponse({status: localStorage["leftScale3"] });
    else if (request.method == "getRightScale3")
    sendResponse({status: localStorage["rightScale3"] });

    else if (request.method == "getSkew")
    sendResponse({status: localStorage["skew"] });
    else if (request.method == "getLeftSkew")
    sendResponse({status: localStorage["leftSkew"] });
    else if (request.method == "getRightSkew")
    sendResponse({status: localStorage["rightSkew"] });

    else if (request.method == "getlevel")
    sendResponse({status: localStorage["level"] });
    else if (request.method == "getbranchprob")
    sendResponse({status: localStorage["branchProb"] });
    else if (request.method == "getshrinkage")
    sendResponse({status: localStorage["shrinkage"] });
    else if (request.method == "getthinness")
    sendResponse({status: localStorage["thinness"] });

    else if (request.method == "getR")
    sendResponse({status: localStorage["r"] });
    else if (request.method == "getG")
    sendResponse({status: localStorage["g"] });
    else if (request.method == "getB")
    sendResponse({status: localStorage["b"] });
    else
      sendResponse({}); 
});