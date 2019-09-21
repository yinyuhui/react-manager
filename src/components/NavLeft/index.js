import React, { Component } from 'react'
import { Menu } from 'antd'
import menuList from '../../config/menuConfig'
import './index.less'
import MenuItem from 'antd/lib/menu/MenuItem'
import { NavLink } from 'react-router-dom'

const { SubMenu } = Menu

export default class NavLeft extends Component {
    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuList)
        this.setState(() => ({
            menuTreeNode
        }))
    }

    renderMenu = (menuList) => {
        return menuList.map(item => {
            if(item.children) {
                return (
                    <SubMenu title={item.label} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <MenuItem key={item.key} >
                <NavLink to={item.key}>
                    {item.label}
                </NavLink>
            </MenuItem>
        })
    }
    
    render() {
        return (
            <div>
                <div className="logo flex">
                    <img src="/assets/logo.png" alt="" />
                    <h1>React Manager</h1>
                </div>
                <Menu theme="dark" mode="vertical" defaultSelectedKeys={[menuList[0].key]}>
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}
