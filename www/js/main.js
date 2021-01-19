document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    window.open('http://site.com', '_self');
    cordova.InAppBrowser.open('http://site.com', '_self');
}