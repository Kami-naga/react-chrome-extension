import React from 'react'
import { Button } from 'antd'
import './home.styl'

function Home(props) {

    const logout = () => {
        props.history.push('/login')
    }

    return (
        <div className="P-home">
            <h1>Home</h1>
            <p>
                <Button
                    type="primary"
                    size="large"
                    onClick={logout}
                >Log out</Button>
            </p>
        </div>
    )
}

export default Home