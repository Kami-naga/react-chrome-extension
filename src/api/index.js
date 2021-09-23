import axios from 'axios'
import '@/mock'

// server address
let API_DOMAIN = 'http://test.com/api/'

export const API_CODE = {
    // API request OK
    OK: 200,
    // API request OK，data error
    ERR_DATA: 403,
    // API request OK ，but no data
    ERR_NO_DATA: 301,
    // API request OK，login error
    ERR_LOGOUT: 401
}

// API request error exception
export const API_FAILED = 'network connection failed. Please try again later'

// write your API requests here
export const apiReqs = {
    // login
    signIn: (config) => {
        config.url = API_DOMAIN + 'login'
        config.method = 'post'
        fetch(config)
    },
    // get data
    getData: (config) => {
        config.url = API_DOMAIN + 'getData'
        config.method = 'get'
        fetch(config)
    }
}

// send  requests
function fetch(config) {
    if (process.env.REACT_APP_DEBUG === 'true') {
        // debug mode, just send the request
        apiRequest(config)
    } else {
        // normal mode，let background script send the request
        sendRequestToBackground(config)
    }
}

/*
 * API request props（with verification info）
 * config.this: [required] component scope(For some logics like page redirect)
 * config.method: [required]request method
 * config.url: [required]request url
 * config.data: request data
 * config.formData: if send as a formData（for file uploading）
 * config.success(res): request succeeded
 * config.fail(err): callback(request fail)
 * config.done(): callback(request done)
 */
export function apiRequest(config) {
    //default data = {}
    if (config.data === undefined) {
        config.data = {}
    }

    // default method = post
    config.method = config.method || 'post'

    // Access-Token. It can be retrieved from localstorage(based on business requirements)
    //here just let it be ''
    let headers = {
        'Access-Token': ''
    }

    let data = null
    // compatible handling of file uploading,
    // if config.formData==true，send the request in multipart/form-data way
    if (config.formData) {
        headers['Content-Type'] = 'multipart/form-data'
        data = new FormData()
        Object.keys(config.data).forEach(function (key) {
            data.append(key, config.data[key])
        });
    } else {
        data = config.data
    }

    // prepare all data for the request
    let axiosConfig = {
        method: config.method,
        url: config.url,
        headers
    }
    if (config.method === 'get') {
        axiosConfig.params = data
    } else {
        axiosConfig.data = data
    }

    // send the request
    axios(axiosConfig).then((res) => {
        let result = res.data
        // callback here if request done
        config.done && config.done()
        // callback here if request succeeded
        config.success && config.success(result)
    }).catch(() => {
        // callback here if request done
        config.done && config.done()
        // callback here if request failed
        config.fail && config.fail(API_FAILED)

    })
}

// let background script do it(only background can do it because of CORS problem)
function sendRequestToBackground(config) {
    config.apiType = 'background'
    if (window.chrome && window.chrome.runtime) {
        window.chrome && window.chrome.runtime.sendMessage({
            contentRequest: 'apiRequest',
            config: config,
        }, (result) => {
            // get the return data (result) from sendResponse func in background script
            config.done && config.done()
            if (result.result === 'succ') {
                config.success && config.success(result)
            } else {
                config.fail && config.fail(result.msg)
            }
        })
    } else {
        console.log('cannot find chrome API')
    }
}