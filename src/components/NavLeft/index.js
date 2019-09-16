import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import './index.less'
import MenuItem from 'antd/lib/menu/MenuItem'

const { SubMenu } = Menu

export default class NavLeft extends Component {
    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuList)
        console.log(menuTreeNode)
        this.setState(() => ({
            menuTreeNode
        }))
    }

    renderMenu = (menuList) => {
        return menuList.map(item => {
            console.log(item.label)
            if(item.children) {
                return (
                    <SubMenu title={item.label} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <MenuItem key={item.key} >{item.label}</MenuItem>
        })
    }
    
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo.png" alt="" />
                    <h1>React Manager</h1>
                </div>
                <Menu theme="dark" mode="vertical">
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}
