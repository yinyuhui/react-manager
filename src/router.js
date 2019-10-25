import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import menuList from './config/menuConfig'
import App from './App'
import NotMatch from './pages/notMatch'
import Login from './pages/login'
import Admin from './Admin'
import Common from './common'
import OrderDetail from './pages/order/detail'

export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/admin" render={() => 
                            <Admin>
                                <Switch>
                                    {
                                        menuList.map(level1 => {
                                            if(level1.children) {
                                                const modules = level1.modules || []
                                                return this.getMenuList(modules).map(item => <Route 
                                                    path={`${level1.key}/${item.lower}`} 
                                                    key={`${level1.key}/${item.lower}`} 
                                                    component={modules[item.upper]} 
                                                />)
                                            }
                                            else {
                                                return <Route 
                                                    path={`${level1.key}`} 
                                                    key={`${level1.key}`} 
                                                    component={level1.modules} 
                                                />
                                            }
                                        })
                                    }
                                    <Route component={NotMatch} />
                                </Switch>
                            </Admin>
                        }></Route>
                        <Route path="/common" render={() => 
                            <Common>
                                <Switch>
                                    <Route 
                                        path="/common/order/detail/:orderSn" 
                                        component={OrderDetail} 
                                    />
                                    {/* <Route component={NotMatch} /> */}
                                </Switch>
                            </Common>
                        }></Route>

                        {/* 如果是初次进入网站 默认是根目录 此时重定向到首页 */}
                        <Redirect path="/" to="/admin/home" />
                    </Switch>
                </App>  
                <div className="my-loading">
                    <p>加载中，请稍候...</p>
                </div>    
            </HashRouter>
        )
    }

    getMenuList = (key) => {
        let menuList = Object.keys(key).map(item => {
            return {
                lower: item.toLocaleLowerCase(),
                upper: item
            }
        })
        return menuList
    }
}

