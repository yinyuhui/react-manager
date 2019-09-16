import React, { Component } from 'react'
import './index.less'
import dayjs from 'dayjs'
import axios from 'axios'

export default class Header extends Component {
    componentWillMount() {
        this.setState(() => ({
            userName: 'yyh',
            date: dayjs().format('YYYY-MM-DD')
        }))
        axios.get('http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=FK9mkfdQsloEngodbFl4FeY3').then(res => {
            console.log(res)
        })
    }
    
    render() {
        return (
            <div className="header"> 
                <p className="header-top flex flex-e">
                    <span>欢迎，{this.state.userName}</span>
                    <a href="#">退出</a>
                </p>
                <div className="header-bottom flex flex-b">
                    <p span="4" className="breadcrumb">首页</p>
                    <p span="20">
                        <span className="date">{this.state.date}</span>
                        <span className="weather">晴</span>
                    </p>
                </div>
            </div>
        )
    }
}
