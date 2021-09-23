import React from 'react'
import { Button, Input } from 'antd'
import turtle from './turtle.svg'
import './login.styl'
import { apiReqs } from '@/api'

function Login(props) {

    const login = () => {
        apiReqs.signIn({
            success: (res) => {
                console.log(res)
                alert(res.data.nickname)
                props.history.push('/home')
            },
            fail: (res) => {
                alert(res)
            }
        })
    }

    return (
        <div className="P-login">
            <img src={turtle} alt="" className="turtle" />
            <div className="login-con">
                <div className="ipt-con">
                    <Input
                        placeholder="account here"
                        size="large"
                    />
                </div>
                <div className="ipt-con">
                    <Input.Password
                        placeholder="pw pls"
                        size="large"
                    />
                </div>
                <Button type="primary" size="large" onClick={login}>login</Button>
            </div>
        </div>
    );
}

export default Login
