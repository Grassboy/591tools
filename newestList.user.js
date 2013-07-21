// ==UserScript==
// @name        591onlyNew
// @namespace   591
// @description Display the newest rent object data only
// @include     http://rent.591.com.tw/map-index.html*
// @match       http://rent.591.com.tw/map-index.html*
// @version     1
// @grant       none
// ==/UserScript==

unsafeWindow.loadScript = function(url) {
    var newRequest = document.createElement("script");
    newRequest.type = "text/javascript";
    newRequest.src = url;
    document.getElementsByTagName("head")[0].appendChild(newRequest);
}
unsafeWindow.loadScript("http://www.grassboy.tw/591tool/newestList.js");
