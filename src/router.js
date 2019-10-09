import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import menuList from './config/menuConfig'
import App from './App'
import NotMatch from './pages/notMatch'
import Login from './pages/login'
import Admin from './Admin'


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
                        <Redirect path="/" to="/admin/home" />
                    </Switch>
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

