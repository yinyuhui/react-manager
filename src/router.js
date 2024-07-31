import React, { Component, lazy, Suspense } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import menuList from './config/menuConfig'
const App = lazy(() => import('./App'))
const NotMatch = lazy(() => import('./pages/notMatch'))
const Login = lazy(() => import('./pages/login'))
const Admin = lazy(() => import('./Admin'))
const Common = lazy(() => import('./common'))
const OrderDetail = lazy(() => import('./pages/order/detail'))

export default class Router extends Component {
    render () {
        return (
            <HashRouter>
                <Suspense fallback={<div>Loading...</div>}>
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
                </Suspense>
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

