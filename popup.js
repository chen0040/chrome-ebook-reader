// popup.js
window.onload = function() {
    document.getElementById("btnAbout").onclick = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "about"});
          });
    };
    document.getElementById("btnEnableScroll").onclick = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "enable_scroll"});
          });
    };
    document.getElementById("btnDisableScroll").onclick = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "disable_scroll"});
          });
    };
    document.getElementById("btnIncScroll").onclick = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            var delta = parseFloat($('#txtScrollDelta').val());
            delta += 0.1;
            $('#txtScrollDelta').val(delta);
            chrome.tabs.sendMessage(activeTab.id, {"message": "set_scroll_delta", "delta": delta});
          });
    };
    document.getElementById("btnDecScroll").onclick = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            var delta = parseFloat($('#txtScrollDelta').val());
            if(delta > 0.1) {
                delta -= 0.1;
            }
            $('#txtScrollDelta').val(delta);
            chrome.tabs.sendMessage(activeTab.id, {"message": "set_scroll_delta", "delta": delta});
          });
    };
    document.getElementById("btnNightMode").onclick = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "night_mode"});
          });
    };
    document.getElementById("btnDayMode").onclick = function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "day_mode"});
          });
    };
    
    
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "return_get_scroll_delta" ) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                if(activeTab.id === request.tab_id){
                    $('#txtScrollDelta').val(request.delta);
                }
            });
        }
      }
    );
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "get_scroll_delta", "tab_id": activeTab.id});
    });
    
    
}