cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "id": "org.apache.cordova.plugin.cache.Cache",
        "file": "plugins/org.apache.cordova.plugin.cache/www/Cache.js",
        "pluginId": "org.apache.cordova.plugin.cache",
        "clobbers": [
            "cache"
        ]
    },
    {
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "pluginId": "phonegap-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "id": "phonegap-plugin-mobile-accessibility.mobile-accessibility",
        "file": "plugins/phonegap-plugin-mobile-accessibility/www/mobile-accessibility.js",
        "pluginId": "phonegap-plugin-mobile-accessibility",
        "clobbers": [
            "window.MobileAccessibility"
        ]
    },
    {
        "id": "phonegap-plugin-mobile-accessibility.MobileAccessibilityNotifications",
        "file": "plugins/phonegap-plugin-mobile-accessibility/www/MobileAccessibilityNotifications.js",
        "pluginId": "phonegap-plugin-mobile-accessibility",
        "clobbers": [
            "MobileAccessibilityNotifications"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-dialogs": "1.3.0",
    "cordova-plugin-network-information": "1.3.0",
    "cordova-plugin-splashscreen": "4.0.0",
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-x-socialsharing": "5.1.3",
    "cordova-sqlite-storage": "1.4.8",
    "org.apache.cordova.plugin.cache": "1.0.5",
    "phonegap-plugin-barcodescanner": "6.0.4",
    "phonegap-plugin-mobile-accessibility": "1.0.5-dev",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-device": "1.1.4-dev"
};
// BOTTOM OF METADATA
});