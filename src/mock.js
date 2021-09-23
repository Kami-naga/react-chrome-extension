import Mock from 'mockjs'

//mock the backend server here
let domain = 'http://test.com/api/'


Mock.mock(domain + 'login', {
    code: 200,
    msg: 'OK',
    data: {
        nickname: 'cute turtle',
        accessToken: 'cute-turtle',
    }
})

//since the parameters passed in the get request are not fixed, so use regex
Mock.mock(/getData/, 'get', {
    code: 200,
    msg: '数据提交成功',
    data: {}
})