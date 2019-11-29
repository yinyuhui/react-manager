import './index.less'

import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="home-wrapper flex flex-c">
                <p className="flex">欢迎来到本网站，这是使用 React 打造的一个后台管理系统</p>
                <p className="flex">前一部分是 AntD 中常用组件，后一部分是后台管理系统页面</p>
                <div className="tech flex">
                    <p>技术栈</p>
                    <ul>
                        <p className="flex">前端框架 —— React 全家桶 </p>
                        <p className="flex">UI ——  AntD less</p>
                        <p>HTTP —— axios</p>
                        <p>版本控制工具 —— git</p>
                        <p>图表 —— Echarts</p>
                        <p>地图 —— 百度地图</p>
                    </ul>
                </div> 
                
            </div>
        )
    }
}
