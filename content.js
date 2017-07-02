// content.js
var scrollInterval = null; 
var scrollDelta = 0.6;
var scrollAmount = 0;
var nightMode = false;
var originBackgroundColor = document.body.style.backgroundColor;
var originTextColor = document.body.style.color;
var originFontSize = document.body.style.fontSize;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "about" ) {
      chrome.runtime.sendMessage({"message": "open_about", "url": "https://github.com/chen0040/chrome-ebook-reader"});
    } else if(request.message === 'enable_scroll') {
        if(scrollInterval != null) {
            clearInterval(scrollInterval);
        }
        scrollInterval = setInterval(function() {
            scrollAmount += scrollDelta;
            if(scrollAmount < 1) {
                return;
            } 
            var y = $(window).scrollTop();  //your current y position on the page
            $(window).scrollTop(y + scrollAmount);
            scrollAmount = 0;
        }, 50);
    } else if(request.message === 'disable_scroll') {
        if(scrollInterval != null) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    } else if(request.message === 'set_scroll_delta') {
        scrollDelta = request.delta;
    } else if(request.message === 'get_scroll_delta') {
        chrome.runtime.sendMessage({"message": "return_get_scroll_delta", "delta": scrollDelta, "tab_id": request.tab_id});
    } else if(request.message === 'night_mode') {
        document.body.style.backgroundColor = "black";
        document.body.style.width='100%';
        document.body.style.color = "#ccffcc";
    } else if(request.message === 'day_mode') {
        document.body.style.backgroundColor = originBackgroundColor;
        document.body.style.color = originTextColor;
    } else if(request.message === 'font_size_xx_large') {
        document.body.style.fontSize = "xx-large";
    } else if(request.message === 'font_size_original') {
        document.body.style.fontSize = originFontSize;
    }
  }
);