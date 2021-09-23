/*global chrome*/
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                //all pages allowed, if only certain pages are allowed to run, use following setting
                //pageUrl: { hostEquals: 'www.youtube.com' }
                new chrome.declarativeContent.PageStateMatcher({ pageUrl: {  }}),
            ],
            actions: [new window.chrome.declarativeContent.ShowPageAction()]
        }])
    })
})