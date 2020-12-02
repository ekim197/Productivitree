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
        visitsPerDomain.forEach(value => {
            console.log(value.domain + " " + value.visitCount);
        });
    }
);