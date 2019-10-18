import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'


export default class Common extends Component {
    render() {
        return (
            <div>
                <Header common={true}/>
                {this.props.children}
                <Footer />
            </div>
        )
    }
}
