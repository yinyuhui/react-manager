import React, { Component } from 'react'
import { Card, Table } from 'antd'

export default class Basic extends Component {
    state = {
        dataSource: []
    }
    componentDidMount() {
        const dataSource = [{
            userName: 'yyh',
            sex: '1',
            state: '1',
            interest: '1',
            birthday: '1995-11',
            address: '湖北武汉',
        }, {
            userName: 'lzd',
            sex: '1',
            state: '1',
            interest: '1',
            birthday: '1992-09',
            address: '湖北武汉',
        }]
        this.setState({
            dataSource
        })
    }
    render() {
        const { dataSource } = this.state

        const columns = [{
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        }, {
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
        }, {
            title: '联系地址',
            dataIndex: 'address',
            key: 'address',
        }]
        
        return (
            <div>
                <Card title="基础表格">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
