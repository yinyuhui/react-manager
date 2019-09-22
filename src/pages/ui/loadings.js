import React, { Component } from 'react'
import { Card, Icon, Spin, Alert } from 'antd'

export default class Loadings extends Component {
    render() {
        const icon = <Icon type="loading" />
        return (
            <div>
                <Card title="Spin 用法">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />

                    {/* 这样是静态展示的 不会动 */}
                    <Spin indicator={icon} />
                </Card>

                <Card title="内容遮罩">
                    <Spin>
                        <Alert
                            message="React"
                            description="这是 AntD Alert 组件 info 示例"
                            type="info"
                        />
                    </Spin>
                    <Spin tip="加载中">
                        <Alert
                            message="React"
                            description="这是 AntD Alert 组件 warning 示例"
                            type="warning"
                        />
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert
                            message="React"
                            description="这是 AntD Alert 组件 success 示例"
                            type="success"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
