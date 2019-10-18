import React, { Component } from 'react'
import './index.less'

export default class Header extends Component {
    state = {
        userName: ''
    }
    async componentDidMount() {
        this.setState(() => ({
            userName: 'yyh',
            date: React.$dayjs().format('YYYY-MM-DD')
        }))
        
        const cityData = await React.$get('https://restapi.amap.com/v3/ip', {
            key: 'ee2e38f4a5f94ea4f1ffbcd746933100'
        }, false)

        const weatherData = await React.$get('https://restapi.amap.com/v3/weather/weatherInfo', {
            key: 'ee2e38f4a5f94ea4f1ffbcd746933100',
            city: cityData && cityData.adcode
        }, false)

        const weather = weatherData && weatherData.lives && weatherData.lives[0]

        this.setState(() => ({
            position: cityData ? `${cityData.province}-${cityData.city}` : '',
            weather: weather ? `${weather.weather} ${weather.temperature}℃` : '',
        }))
    }
    
    render() {
        const { common } = this.props
        return (
            <div className="header"> 
                <div className={common ? "common-header flex flex-b" : "flex flex-b"}>
                    {
                        common ? <div className="common-logo flex">
                            <img src="./assets/logo.png" alt="" />
                            <span>React MS</span>
                        </div> : <div></div>
                    }
                    <p className="header-top flex flex-e">
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </p>
                </div>
                
                {
                    common ? '' : <div className="header-bottom flex flex-b">
                        <p span="4" className="breadcrumb flex flex-c">首页</p>
                        <p span="20">
                            <span className="date">{this.state.date}</span>
                            <span className="weather">{this.state.position} {this.state.weather}</span>
                        </p>
                    </div>
                }
            </div>
        )
    }
}
