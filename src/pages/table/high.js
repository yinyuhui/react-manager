import React, { Component } from 'react'
import { Card, Table, Badge, Button, Modal, message } from 'antd'
import { pagination } from '../../utils'

const stateList = ['咸鱼等翻身', '正在拼搏中', '修身养性享受生活', '苦逼创业者']
const interestList = ['游泳', '跑步', '足球', '篮球', '爬山', '攀岩', '蹦极', '桌球']


const columns = [{
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: 100,
    }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: 100,
        render: sex => sex === 1 ? '男' : '女'
    }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        width: 150,
        render: state => stateList[state - 1]
    }, {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest',
        width: 100,
        render: interest => interestList[interest - 1]
    }, {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
        width: 150,
    }, {
        title: '联系地址',
        dataIndex: 'address',
        key: 'address',
        width: 180,
}]

const columns1 = [{
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: 100,
        fixed: 'left'
    }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: 100,
        render: sex => sex === 1 ? '男' : '女'
    }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        width: 150,
        render: state => stateList[state - 1]
    }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state1',
        width: 150,
        render: state => stateList[state - 1]
    }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state2',
        width: 150,
        render: state => stateList[state - 1]
    }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state3',
        width: 150,
        render: state => stateList[state - 1]
    }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state4',
        width: 150,
        render: state => stateList[state - 1]
    }, {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest',
        width: 100,
        render: interest => interestList[interest - 1]
    }, {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest1',
        width: 100,
        render: interest => interestList[interest - 1]
    }, {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest2',
        width: 100,
        render: interest => interestList[interest - 1]
    }, {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest3',
        width: 100,
        render: interest => interestList[interest - 1]
    }, {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest4',
        width: 100,
        render: interest => interestList[interest - 1]
    }, {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest5',
        width: 100,
        render: interest => interestList[interest - 1]
    }, {
        title: '爱好',
        dataIndex: 'interest',
        key: 'interest6',
        width: 100,
        render: interest => interestList[interest - 1]
    }, {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
        width: 150,
    }, {
        title: '联系地址',
        dataIndex: 'address',
        key: 'address',
        width: 200,
        fixed: 'right',
}]



export default class High extends Component {
    

    state = {
        dataSource: [],
    }

    params = {
        page: 1
    }

    componentDidMount() {
        this.getListData()
    }

    async getListData(showLoading = true) {
        const data = await React.$get('/table/high', this.params, showLoading)
        let _this = this
        this.setState({
            dataSource: data.result.list,
            pagination: pagination(data, (current) => {
                _this.params.page = current
                this.getListData()
            })
        })
    }

    handleSort = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }

    deleteItem(item) {
        console.log(item)
        Modal.confirm({
            title: '确定删除',
            content: `确定删除 ${item.key} 这条数据吗？`,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                message.success('操作成功')
                this.getListData(false)
            },
            onCancel: () => {
                message.info('取消删除')
            }
        })
    }
     
    render() {
        const { dataSource, sortOrder } = this.state
        const columns2 = [{
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: sex => sex === 1 ? '男' : '女'
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder,
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: state => stateList[state - 1]
        }, {
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
            render: interest => interestList[interest - 1]
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
        }, {
            title: '联系地址',
            dataIndex: 'address',
            key: 'address',
        }]

        const columns3 = [{
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: sex => sex === 1 ? '男' : '女'
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: state => stateList[state - 1]
        }, {
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
            render: interest => {
                const interestArr = {
                    0: <Badge status="success" text="游泳" />,
                    1: <Badge status="error" text="跑步" />,
                    2: <Badge status="error" text="足球" />,
                    3: <Badge status="processing" text="篮球" />,
                    4: <Badge status="warning" text="爬山" />,
                    5: <Badge status="success" text="攀岩" />,
                    6: <Badge status="default" text="蹦极" />,
                    7: <Badge status="success" text="桌球" />,
                }
                return interestArr[interest - 1]
            }
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
        }, {
            title: '联系地址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作',
            key: 'operation',
            render: (text, item) => <Button type="link" onClick={() => this.deleteItem(item)}>删除</Button>
        }]
        
        return (
            <div>
                <Card title="头部固定">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="头部和左侧固定">
                    <Table 
                        bordered
                        columns={columns1}
                        dataSource={dataSource}
                        pagination={false}
                        scroll={{ y: 240, x: 2002 }}
                    />
                </Card>
                <Card title="排序">
                    <Table 
                        bordered
                        columns={columns2}
                        dataSource={dataSource}
                        pagination={false}
                        onChange={this.handleSort}
                    />
                </Card>
                <Card title="操作">
                    <Table 
                        bordered
                        columns={columns3}
                        dataSource={dataSource}
                        pagination={false}
                        onChange={this.handleSort}
                    />
                </Card>
            </div>
        )
    }
}
