import React, { Component } from 'react'
import { Card, Button, Modal, message } from 'antd'
import FilterForm from '../../components/FilterForm'
import ITable from '../../components/ITable'
import moment from 'moment'
import { getList, updateTableSelected } from '../../utils'

export default class Order extends Component {
    state = {
        selectedKey: [],
        showCloseModal: false,
        closeDetail: {}
    }

    params = {
        limit: 10,
        offset: 0
    }

    filterFormInitValues = {
        cityId: '',
        time: [moment().subtract(7, 'day'), moment()],
        status: ''
    }

    filterFormList = [
        {
            type: 'SELECT',
            code: 'cityId',
            label: '城市',
            initialValue: this.filterFormInitValues.cityId,
            width: 150,
            options: [
                {
                    value: '',
                    label: '全部城市'
                },
                {
                    value: 'bj',
                    label: '北京'
                },
                {
                    value: 'sh',
                    label: '上海'
                },
                {
                    value: 'gz',
                    label: '广州'
                },
                {
                    value: 'sz',
                    label: '深圳'
                },
                {
                    value: 'wh',
                    label: '武汉'
                }
            ]
        },
        {
            type: 'RANGE_PICKER',
            code: 'time',
            label: '订单时间',
            initialValue: this.filterFormInitValues.time,
            width: 230
        },
        {
            type: 'SELECT',
            code: 'status',
            label: '订单状态',
            initialValue: this.filterFormInitValues.status,
            width: 180,
            options: [
                {
                    value: '',
                    label: '全部状态'
                },
                {
                    value: '1',
                    label: '进行中'
                },
                {
                    value: '2',
                    label: '进行中（临时锁车）'
                },
                {
                    value: '3',
                    label: '行程结束'
                }
            ]
        }
    ]

    componentDidMount = () => {
        this.getData()
    }

    getData(FilterForm = this.filterFormInitValues) {
        FilterForm.startTime = FilterForm.time
            ? moment(FilterForm.time[0]).valueOf()
            : FilterForm.startTime
        FilterForm.endTime = FilterForm.time
            ? moment(FilterForm.time[1] || moment()).valueOf()
            : FilterForm.endTime
        FilterForm.time = null
        getList(this, 'order/list', { ...this.params, ...FilterForm })
    }

    async endOrder() {
        const res = await React.$get('/order/close/detail', {
            orderSn: this.state.selectedItem[0].orderSn
        })
        this.setState({
            closeDetail: res.result,
            showCloseModal: true
        })
    }

    async ensureClose() {
        const res = await React.$get('/order/close', {
            orderSn: this.state.selectedItem[0].orderSn
        })
        res.result ? message.success('操作成功') : message.error('操作失败')
        this.setState({
            selectedKey: [],
            selectedItem: [],
            showCloseModal: false,
            closeDetail: {}
        })
        this.getData()
    }

    goDetail = () => {
        let host = window.location.host.replace('http://')
        window.open(`http://${host}/#/common/order/detail/${this.state.selectedItem[0].orderSn}`)
    }

    render() {
        const {
            list,
            pagination,
            selectedKey,
            selectedItem,
            showCloseModal,
            closeDetail
        } = this.state
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'orderSn',
                width: 100,
                fixed: 'left'
            },
            {
                title: '车辆编号',
                dataIndex: 'bikeSn',
                width: 100
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 100
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                width: 100
            },
            {
                title: '里程',
                dataIndex: 'distance',
                width: 100
            },
            {
                title: '行驶时长',
                dataIndex: 'totalTime',
                width: 100
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 200,
                render: status => {
                    const arr = ['进行中', '进行中（临时锁车）', '行程结束']
                    return arr[status - 1]
                }
            },
            {
                title: '开始时间',
                dataIndex: 'startTime',
                width: 220
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                width: 220
            },
            {
                title: '订单金额',
                dataIndex: 'totalFee',
                width: 100
            },
            {
                title: '实付金额',
                dataIndex: 'userPay',
                width: 100
            }
        ]
        const btnDisabled = selectedKey.length < 1
        return (
            <div>
                <Card>
                    <FilterForm
                        filterFormList={this.filterFormList}
                        getData={this.getData.bind(this)}
                    />
                </Card>
                <Card>
                    <Button type="primary" disabled={btnDisabled} onClick={this.goDetail}>
                        订单详情
                    </Button>
                    <Button type="danger" disabled={btnDisabled} onClick={() => this.endOrder()}>
                        结束订单
                    </Button>
                    <ITable
                        columns={columns}
                        dataSource={list}
                        pagination={pagination}
                        scroll={{ x: 1440 }}
                        selectionType="radio"
                        selectedRowKeys={selectedKey}
                        selectedItems={selectedItem}
                        updateSelected={updateTableSelected.bind(this)}
                        rowKey="key"
                    />
                </Card>
                <Modal
                    visible={showCloseModal}
                    title="结束订单"
                    okText="确定"
                    cancelText="取消"
                    onOk={() => this.ensureClose()}
                    onCancel={() =>
                        this.setState({
                            showCloseModal: false
                        })
                    }
                >
                    <div className="flex flex-s" style={{ height: 50, paddingLeft: 20 }}>
                        <span style={{ width: 120, paddingRight: 10 }} className="flex flex-e">
                            车辆编号：
                        </span>
                        <span>{closeDetail.bikeSn}</span>
                    </div>
                    <div className="flex flex-s" style={{ height: 50, paddingLeft: 20 }}>
                        <span style={{ width: 120, paddingRight: 10 }} className="flex flex-e">
                            剩余电量：
                        </span>
                        <span>{closeDetail.electric}%</span>
                    </div>
                    <div className="flex flex-s" style={{ height: 50, paddingLeft: 20 }}>
                        <span style={{ width: 120, paddingRight: 10 }} className="flex flex-e">
                            行程开始时间：
                        </span>
                        <span>{closeDetail.startTime}</span>
                    </div>
                    <div className="flex flex-s" style={{ height: 50, paddingLeft: 20 }}>
                        <span style={{ width: 120, paddingRight: 10 }} className="flex flex-e">
                            当前位置：
                        </span>
                        <span>{closeDetail.location}</span>
                    </div>
                </Modal>
            </div>
        )
    }
}
