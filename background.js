var x
chrome.tabs.query({windowType:'normal'}, function(tabs) {
    console.log('Number of open tabs in all normal browser windows:',tabs.length);
    x = tabs.length
}); 


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.message == "I need tabs") {
    sendResponse({message : x})
  }
})


