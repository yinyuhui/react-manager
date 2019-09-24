import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import NotMatch from './pages/notMatch'
import Login from './pages/login'
import Admin from './Admin'
import Home from './pages/Home'
import * as UI from './pages/ui'


export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() => 
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
<<<<<<< HEAD
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/notifications" component={Notifications} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
=======
                                {
                                    this.getMenuList(UI).map(item => {
                                        return (
                                            <Route 
                                                path={`/admin/ui/${item.lower}`} 
                                                key={`/admin/ui/${item.lower}`} 
                                                component={UI[item.upper]} />
                                        )
                                    })
                                }
>>>>>>> 路由优化
                                <Route component={NotMatch} />
                            </Switch>
                        </Admin>
                    }></Route>
                </App>      
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

