import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './Admin'
import NotMatch from './pages/notMatch'
import Login from './pages/login'
import Buttons from './pages/ui/buttons'
import Home from './pages/Home'

export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" render={() => 
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route component={NotMatch} />
                            </Switch>
                        </Admin>
                    }></Route>
                </App>      
            </HashRouter>
        )
    }
}

