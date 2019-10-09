import React, { Component } from 'react'
import { Menu } from 'antd'
import menuList from '../../config/menuConfig'
import MenuItem from 'antd/lib/menu/MenuItem'
import { NavLink } from 'react-router-dom'
import './index.less'

const { SubMenu } = Menu

export default class NavLeft extends Component {
    state = {
        menuTreeNode: <div></div>
    }
    componentDidMount() {
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
                <NavLink to="/admin/home">
                    <div className="logo flex">
                        <img src="/assets/logo.png" alt="" />
                        <h1>React Manager</h1>
                    </div>
                </NavLink>
                <Menu theme="dark" mode="vertical" defaultSelectedKeys={[menuList[0].key]}>
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}
