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
      sendResponse({status: localStorage["allWindowsTabsCount"]});
    else
      sendResponse({}); // snub them.
});