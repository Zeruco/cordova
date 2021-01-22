/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
//document.addEventListener('deviceready', onDeviceReady, false);
//cordova.InAppBrowser.open('http://site.com', '_blank', 'location=no');
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.splashscreen.show();

    let ref = cordova.InAppBrowser.open('http://site.com', '_blank', 'location=no, hidden=yes');
    ref.hide();
    ref.addEventListener('loadstop', function (){
        ref.show();
        navigator.splashscreen.hide();
    });
    ref.addEventListener('loaderror', function (){
        navigator.splashscreen.hide();
    })
    oneSignal();
}
// Add to index.js or the first page that loads with your app.
function oneSignal(){
    window.plugins.OneSignal.setLogLevel({logLevel: 6, visualLevel: 0});

    let notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
    // Set your iOS Settings
    let iosSettings = {};
    iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

    window.plugins.OneSignal
        .startInit("b7cbae25-5a5c-4a1f-9b16-858ba74f6d82")
        .handleNotificationOpened(notificationOpenedCallback)
        .iOSSettings(iosSettings)
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();

    // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    });
}
