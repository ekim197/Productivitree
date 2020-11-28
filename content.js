// this function will take in an array of visits for each domain and check it against some random domain
// I have yet to implement how to get the most popular domains
function findWebsiteVisit(visits, domain) {
    for (var i = 0; i < visits.length; i++) {
        if (visits[i] === domain) {
            return visits[i];
        }
    }    
    return undefined;
}

// Searches the history for the last visit time of each page matching the query
// based on searches in last 24 hrs

chrome.history.search( {
    'text': '',         // retrieves every object in history
    'maxResults': 0     // if it's 0, it means we can store all the results
},
// this callback function returns array of all the history results
function(historyItems) {
    var visitperDomain = [];    
    
    for (var i = 0; i < historyItems.length; i++) {
        var historyItem = historyItems[i];
        var url = new URL(historyItem.url);
        var domain = url.hostname || historyItem.protocol;
        var existingDomain = findWebsiteVisit(visitperDomain, domain);
        if (!existingDomain) {
            visitperDomain.push( {
                "domain": domain,
                "visitCount": historyItem.visitCount
            })
        }
        else {
            existingDomain.visitCount += historyItem.visitCount; 
        }
    }
    visitperDomain.sort(function (a,b) {
        return b.visitCount - a.visitCount;
    });
    for (var i = 0; i < visitperDomain.length; i++) {
        console.log(visitperDomain[i].domain + " " + visitperDomain[i].visitCount);
    }
});

