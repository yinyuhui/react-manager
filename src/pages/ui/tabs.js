import React, { Component } from 'react'
import { Card, Tabs, Icon } from 'antd'
const { TabPane } = Tabs

export default class tabs extends Component {
    render() {
        return (
            <div>
                <Card title="tabs 页签">
                    <Tabs defaultActiveKey="tab1" onChange={this.onTabChange}>
                        <TabPane key="tab1" tab="tab1">tab1</TabPane>
                        <TabPane key="tab2" tab="tab2">tab2</TabPane>
                        <TabPane key="tab3" tab="tab3" disabled>tab3</TabPane>
                    </Tabs>
                </Card>
                <Card title="tabs 页签 带图标">
                    <Tabs defaultActiveKey="tab1" onChange={this.onTabChange}>
                        <TabPane key="tab1" tab={<span><Icon type="left" />tab 1</span>}>tab1</TabPane>
                        <TabPane key="tab2" tab={<span><Icon type="edit" />tab 2</span>}>tab2</TabPane>
                        <TabPane key="tab3" tab={<span><Icon type="delete" />tab 3</span>}>tab3</TabPane>
                    </Tabs>
                </Card>
                <Card title="tabs 页签 可关闭新增">
                    <Tabs defaultActiveKey="tab1" onChange={this.onTabChange}>
                        {this.state.panes.map(pane => <TabPane
                            key={pane.key} 
                            tab={pane.title} 
                        >
                            {pane.content}
                        </TabPane>)}
                    </Tabs>
                </Card>
            </div>
        )
    }

    state = {
        panes: []
    }

    componentDidMount = () => {
        const panes = [{
            title: 'tab1',
            content: 'tab1',
            key: 'tab1',
        },{
            title: 'tab2',
            content: 'tab2',
            key: 'tab2',
        },{
            title: 'tab3',
            content: 'tab3',
            key: 'tab3',
        }]
        this.setState(() => ({
            panes
        }))
    };
    

    onTabChange = (key) => {
        console.log(key)
    }
}
