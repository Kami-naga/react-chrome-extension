import { apiRequest } from '@/api'

//do not delete following global chrome
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // get the msg from content-script，function type params are not allowed in request
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const { contentRequest } = request
        // receive the API request from content
        if (contentRequest === 'apiRequest') {
            let { config } = request
            // callback when API request succeeded
            config.success = (data) => {
                data.result = 'succ'
                sendResponse(data)
            }
            // callback when API request failed
            config.fail = (msg) => {
                sendResponse({
                    result: 'fail',
                    msg
                })
            }
            // send the request
            apiRequest(config)
        }
    })
    return true
})