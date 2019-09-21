import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './Admin'
import Buttons from './pages/ui/buttons'
import NotMatch from './pages/notMatch'
import Login from './pages/login'

export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" render={() => 
                        <Admin>
                            <Switch>
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

