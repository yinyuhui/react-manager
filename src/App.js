import React, { Component } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default class App extends Component {
    render() {
        return (
            <div>
                <ConfigProvider locale={zhCN}>
                    {this.props.children}
                </ConfigProvider>
            </div>
        )
    }
}
