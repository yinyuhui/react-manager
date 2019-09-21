import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import Home from './components/Home'


export default class Admin extends Component {
    render() {
        return (
            <div>
                <Row className="container">
                    <Col span={4} className="nav-left">
                        <NavLeft />
                        
                    </Col>
                    <Col span={20} className="main">
                        <Header />
                        <div className="main-content">
                            {this.props.children}
                        </div>
                        <Footer />
                    </Col>
                </Row>
            </div>
        )
    }
}
