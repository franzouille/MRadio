
function registerCallback(registrationId) {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        return;
    }

    // Send the registration token to your application server.
    console.log(registrationId);
    chrome.storage.local.set({registered: true});
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.get("registered", function(result) {
        // If already registered, bail out.
        if (result["registered"])
            return;

        // Up to 100 senders are allowed.
        var senderIds = [gcmProjectNumber];
        chrome.gcm.register(senderIds, registerCallback);
    });
});

chrome.gcm.onMessage.addListener(function(message) {
    // A message is an object with a data property that
    // consists of key-value pairs.
});