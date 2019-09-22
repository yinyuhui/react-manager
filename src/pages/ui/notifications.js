import React, { Component } from 'react'
import { Card, notification, Button } from 'antd'

export default class Notifications extends Component {
    render() {
        return (
            <div>
                <Card title="通知提醒框">
                    <Button onClick={this.openNotification('success')} type="primary">Success</Button>
                    <Button onClick={this.openNotification('info')} type="primary">Info</Button>
                    <Button onClick={this.openNotification('warning')} type="primary">Warning</Button>
                    <Button onClick={this.openNotification('error')} type="danger">error</Button>
                </Card>

                <Card title="通知提醒框 - 方向控制">
                    <Button onClick={this.openNotification('success', 'topLeft')} type="primary">Success topLeft</Button>
                    <Button onClick={this.openNotification('info', 'topRight')} type="primary">Info topRight</Button>
                    <Button onClick={this.openNotification('warning', 'bottomLeft')} type="primary">Warning bottomLeft</Button>
                    <Button onClick={this.openNotification('error', 'bottomRight')} type="danger">error bottomRight</Button>
                </Card>
            </div>
        )
    }

    openNotification = (type, direction = 'topRight') => {
        return () => {
            notification[type]({
                message: '标题',
                description: '这是通知内容',
                placement: direction
            })
        }
    }
}
