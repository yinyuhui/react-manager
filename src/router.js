import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import NotMatch from './pages/notMatch'
import Login from './pages/login'
import Admin from './Admin'
import Home from './pages/Home'
import Buttons from './pages/ui/buttons'
import Loadings from './pages/ui/loadings'
import Modals from './pages/ui/modals'
import Notifications from './pages/ui/notifications'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'

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
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/notifications" component={Notifications} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
                                <Route component={NotMatch} />
                            </Switch>
                        </Admin>
                    }></Route>
                </App>      
            </HashRouter>
        )
    }
}

