import React, { Component } from 'react'
import './index.less'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <p className="flex flex-c">版权所有 &copy; 2019 veinyin@gmail.com</p> 
                <p className="flex flex-c">技术支持：尹玉慧</p>
            </div>
        )
    }
}
