import React from 'react'
import { Button, Input } from 'antd'
import carrot from './turtle.svg'
import './login.styl'

function Login(props) {

    const login = () => {
       props.history.push('/home')
    }

    return (
        <div className="P-login">
            <img src={carrot} alt="" className="carrot" />
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
                <Button type="primary" size="large" onClick={login}>登录</Button>
            </div>
        </div>
    );
}

export default Login