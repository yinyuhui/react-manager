import React, { Component } from 'react'
import { Card, Tabs, Icon } from 'antd'
const { TabPane } = Tabs

export default class tabs extends Component {
    constructor(props) {
        super(props)
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
        this.state = {
            panes,
            activeKey: panes[0].key
        }
        this.newTabIndex = 0

    } 
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
                    <Tabs 
                        onChange={this.onChange} 
                        type="editable-card"
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}
                    >
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
    

    onTabChange = (activeKey) => {
        console.log(activeKey)
    }

    onChange = (activeKey) => {
        this.setState(() => ({
            activeKey
        }))
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };
    
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };
    
}
