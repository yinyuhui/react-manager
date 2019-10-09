import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
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
                    <Redirect path="/" to="/admin/home" />
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={() => 
                        <Admin>
                            <Switch>
                                {/* 首页 */}
                                <Route path="/admin/home" component={Home} />

                                {/* UI */}
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

