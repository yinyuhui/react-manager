import React, { Component } from 'react'
import { Card, Button, message } from 'antd'

export default class Messages extends Component {
    render() {
        return (
            <div>
                <Card title="全局提示框" >
                    <Button type="primary" onClick={this.showMessage('success')}>success</Button>
                    <Button type="primary" onClick={this.showMessage('info')}>info</Button>
                    <Button type="primary" onClick={this.showMessage('warning')}>warning</Button>
                    <Button type="primary" onClick={this.showMessage('warn')}>warn</Button>
                    <Button type="primary" onClick={this.showMessage('error')}>error</Button>
                    <Button type="primary" onClick={this.showMessage('loading')}>loading</Button>
                </Card>
            </div>
        )
    }

    showMessage = (type) => {
        return () => {
            message[type]('这是 message 的内容')
        }
    }
}
