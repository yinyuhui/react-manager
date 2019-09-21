import React, { Component } from 'react'
import { Card, Button, Radio } from 'antd'
import './ui.less'


export default class Buttons extends Component {
    state = {
        loading: true,
        buttonSize: 'default'
    }
    render() {
        return (
            <div>
                <Card title="基础按钮">
                    <Button type="primary">primary</Button>
                    <Button>button</Button>
                    <Button type="dashed">dashed</Button>
                    <Button type="danger">danger</Button>
                    <Button disabled>disabled</Button>
                </Card>
                <Card title="图形按钮">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">加载</Button>
                </Card>
                <Card title="Loading 按钮">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" loading={this.state.loading} shape="circle"></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.closeLoading}>关闭 Loading</Button>
                    <Button type="primary" onClick={this.showLoading}>展示 Loading</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸">
                    <Radio.Group value={this.state.buttonSize} onChange={this.changeButtonSize}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button size={this.state.buttonSize} type="primary">{this.state.buttonSize}</Button>
                </Card>
            </div>
        )
    }

    closeLoading = () => {
        this.setState(() => ({
            loading: false
        }))
    }

    showLoading = () => {
        this.setState(() => ({
            loading: true
        }))
    }

    changeButtonSize = (e) => {
        this.setState(() => ({
            buttonSize: e.target.value
        }))
    }
}
