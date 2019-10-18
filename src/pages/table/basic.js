import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { pagination } from '../../utils'

const dataSource = [{
        key: 1,
        userName: 'yyh',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '1995-11',
        address: '湖北武汉',
    }, {
        key: 2,
        userName: 'lzd',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '1992-09',
        address: '湖北武汉',
}]

const stateList = ['咸鱼等翻身', '正在拼搏中', '修身养性享受生活', '苦逼创业者']
const interestList = ['游泳', '跑步', '足球', '篮球', '爬山', '攀岩', '蹦极', '桌球']

const columns = [{
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

export default class Basic extends Component {
    state = {
        dataSource: [],
        dataSource1: [],
        checkedKeys: [],
        checkedRows: [],
    }

    params = {
        page: 1
    }
    
    componentDidMount() {
        this.setState({
            dataSource
        })
        this.getListData()
    }

    async getListData() {
        const data = await React.$get('/table/basic', this.params)
        this.setState({
            dataSource1: data.result.list,
            checkedKeys: [],
            checkedRows: [],
            pagination: pagination(data, (current) => {
                this.params.page = current
                this.getListData()
            })
        })
    }

    // 单选 行点击
    handleRowClick(record, index) {
        this.setState({
            selectedRecord: record,
            selectedKey: [index]
        }, () => {
            console.log(this.state.selectedRecord)
        })
    }

    // 多选 行点击
    handleCheckRowClick(record, index) {
        let checkedKeys = this.state.checkedKeys || []
        let checkedRows = this.state.checkedRows || []
        let i = checkedKeys.indexOf(index)

        // 不存在则存入 否则取出 
        let keys = checkedKeys
        let items = checkedRows
        if(i === -1) {
            keys.push(index)
            items.push(record)
        }
        else {
            keys.splice(i, 1)
            items.splice(i, 1)
        }
        this.setState({
            checkedKeys: keys,
            checkedRows: items
        }, () => {
            console.log(this.state.checkedRows)
        })
    }

    // 多选 删除按钮
    delete = () => {
        Modal.confirm({
            title: '删除提示',
            content: `将要删除的 key 为${this.state.checkedKeys}, 确认删除？`,
            cancelText: '取消',
            okText: '确定',
            onOk: () => {
                message.success('删除成功')
                this.getListData()
            },
            onCancel: () => {
                message.info('取消删除')
            }
        })
    }

    render() {
        const { dataSource, dataSource1, selectedKey, checkedKeys, pagination } = this.state
        const disableDelete = checkedKeys.length === 0
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedKey
        }
        const rowCheck = {
            type: 'checkbox',
            selectedRowKeys: checkedKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    checkedKeys: selectedRowKeys,
                    checkedRows: selectedRows
                }, () => {
                    console.log(this.state.checkedRows)
                })
            }
        }
        
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
                <Card title="动态获取数据表格">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={dataSource1}
                        pagination={false}
                    />
                </Card>
                <Card title="首列单选按钮">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={dataSource1}
                        pagination={false}
                        rowSelection = { rowSelection }
                        onRow = {
                            (record, index) => {
                                return {
                                    onClick: () => {
                                        return this.handleRowClick(record, index)
                                    }
                                }
                            }
                            
                        }
                    />
                </Card>
                <Card title="首列多选按钮">
                    <Button type="danger" onClick={this.delete} disabled={disableDelete} style={{marginBottom: 16}}>删除</Button>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={dataSource1}
                        pagination={false}
                        rowSelection = { rowCheck }
                        onRow = {
                            (record, index) => {
                                return {
                                    onClick: () => {
                                        return this.handleCheckRowClick(record, index)
                                    }
                                }
                            }
                        }
                    />
                </Card>
                <Card title="分页表格">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={dataSource1}
                        pagination={pagination}
                    />
                </Card>
            </div>
        )
    }
}
