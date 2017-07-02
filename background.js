// background.js

// Called when the user clicks on the browser action.
/*
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});
*/

// Called when the content.js sends the message "open_about"
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_about" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);