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
  localStorage["sway"] = 0

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
    else if (request.method == "getSway")
    sendResponse({status: localStorage["sway"] });

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

/* 
 * Sources used: 
 * https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples?autodive=0%2F%2F
 * https://developer.chrome.com/extensions/history
 * 
 */

 /* 
  * NOTE: Something undefined will show up if you run it under a content script. Run it under a background script 
  * or something is probably the best idea.
  * 
  */

 function findVisitByDomain(visits, domain) {
  for (var i = 0; i < visits.length; ++i) {
      if (visits[i].domain === domain) {
          return visits[i];
      }
  }
  return undefined;
}

chrome.history.search({
      'text': '',               
      'maxResults': 2147483647               // ensures getting all results
  },
  // this callback is going to store all the results into an array
  function (historyItems) {

      // object array that is intended to store unique domains and their respective visit counts
      var visitsPerDomain = [];   

      for (var i = 0; i < historyItems.length; ++i) {
          var historyItem = historyItems[i];
          var url = new URL(historyItem.url);
          var domain = url.hostname;      // get the domain of the given url
          var existingDomain = findVisitByDomain(visitsPerDomain, domain);
          
          // if the domain being scanned does not exist (i.e., we come across a new domain), then add it
          if (!existingDomain) {
              visitsPerDomain.push({
                  "domain": domain,
                  "visitCount": historyItem.visitCount
              })
          } 
          // otherwise, increment by the number of visits
          else {
              existingDomain.visitCount += historyItem.visitCount;
          }
      }
      visitsPerDomain.sort(function (a, b) {
          return b.visitCount - a.visitCount;
      });
      var finalHistory = [];
      if (visitsPerDomain.length > 15) {
          finalHistory = visitsPerDomain.slice(0,16);
      }
      else {
          finalHistory = visitsPerDomain;
      }
      finalHistory.forEach(value => {
          console.log(value.domain + " " + value.visitCount);
      });
  }
);