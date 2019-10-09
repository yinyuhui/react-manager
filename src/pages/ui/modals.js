import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'

export default class Modals extends Component {
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    }
    render() {
        return (
            <div>
                <Card title="基础模态框">
                    <Button type="primary" onClick={this.openModal('showModal1')}>Open</Button>
                    <Button type="primary" onClick={this.openModal('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={this.openModal('showModal3')}>顶部 20px 弹框</Button>
                    <Button type="primary" onClick={this.openModal('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框">
                    <Button type="primary" onClick={this.showModal('confirm')}>confirm</Button>
                    <Button type="primary" onClick={this.showModal('info')}>info</Button>
                    <Button type="primary" onClick={this.showModal('success')}>success</Button>
                    <Button type="primary" onClick={this.showModal('warning')}>warning</Button>
                </Card>
                <Modal title="Modal" visible={this.state.showModal1} onCancel={this.closeModal}>
                    <p>这是一个基础 Modal 框</p>
                </Modal>
                <Modal 
                    title="Modal" 
                    visible={this.state.showModal2} 
                    onCancel={this.closeModal}
                    okText="下一步"
                    cancelText="上一步"
                >
                    <p>这是一个自定义页脚 Modal 框</p>
                </Modal>
                <Modal 
                    title="Modal" 
                    visible={this.state.showModal3} 
                    onCancel={this.closeModal}
                    style={{ top: 20 }}>
                    <p>这是一个距离顶部 20px Modal 框</p>
                </Modal>
                <Modal 
                    title="Modal" 
                    visible={this.state.showModal4} 
                    onCancel={this.closeModal}
                    centered>
                    <p>这是一个水平垂直居中 Modal 框</p>
                </Modal>
            </div>
        )
    }
    openModal = (key) => {
        return () => {
            this.setState(() => ({
                [key]: true
            }))
        }
    }

    closeModal = () => {
        for(let item of [1, 2, 3, 4]) {
            this.setState(() => ({
                [`showModal${item}`]: false
            }))
        }
    }

    showModal = (type) => {
        return () => {
            Modal[type](({
                title: '确定？',
                content: '确定删除本条内容吗？',
                onOk() {
                    console.log('Ok')
                },
                onCancel() {
                    console.log('cancel')
                }
            }))
        }
    }
}
