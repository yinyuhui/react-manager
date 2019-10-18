import React, { Component } from 'react'

export default class OrderDetail extends Component {
    render() {
        const { id } = this.props.match.params
        console.log(id)
        return (
            <div>
                OrderDetail
            </div>
        )
    }
}
