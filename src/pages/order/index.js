import React, { Component } from 'react'
import { pagination } from '../../utils'
import { Card, Button, Table, Form, Select, DatePicker, Modal, message }  from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker;

export default class Order extends Component {
    state = {
        selectedKey: [],
        showCloseModal: false,
        closeDetail: {}
    }

    params = {
        page: 1
    }

    componentDidMount = () => {
      this.getData()
    }

    async getData() {
        const FilterForm = this.FilterForm.props.form.getFieldsValue()
        FilterForm.startTime = moment(FilterForm.time[0]).valueOf()
        FilterForm.endTime = moment(FilterForm.time[1]).valueOf()
        FilterForm.time = null
        let res = await React.$get('order/list', {...this.params, ...FilterForm})
        this.setState({
            list: res.result.list,
            pagination: pagination(res, (current) => {
                this.params.page = current
                this.getData()
            })
        })
    }
    
    handleItemClick(record, index) {
        this.setState({
            selectedKey: [index],
            selectedItem: record
        })
    }

    async endOrder() {
        const res = await React.$get('/order/close/detail', {orderSn: this.state.selectedItem.orderSn})
        this.setState({
            closeDetail: res.result,
            showCloseModal: true,
        })
    }

    async ensureClose() {
        const res = await React.$get('/order/close', {orderSn: this.state.selectedItem.orderSn})
        res.result ? message.success('操作成功') : message.error('操作失败')
        this.setState({
            selectedKey: [],
            selectedItem: [],
            showCloseModal: false,
            closeDetail: {},
        })
        this.getData()
    }

    goDetail = () => {
        // window.location.href=`/#/common/order/detail`
        window.open=`/#/common/order/detail/${this.state.selectedItem.orderSn}`
        // window.location.href=`/#/common/order/detail/${this.state.selectedItem.orderSn}`
    }

    render() {
        const { list, pagination, selectedKey, showCloseModal, closeDetail } = this.state
        const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderSn',
            key: 'orderSn',
            width: 100,
            fixed: 'left'
        }, {
            title: '车辆编号',
            dataIndex: 'bikeSn',
            key: 'bikeSn',
            width: 100,
        }, {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            width: 100,
        }, {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 100,
        }, {
            title: '里程',
            dataIndex: 'distance',
            key: 'distance',
            width: 100,
        }, {
            title: '行驶时长',
            dataIndex: 'totalTime',
            key: 'totalTime',
            width: 100,
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 200,
            render: (status) => {
                const arr = ['进行中', '进行中（临时锁车）', '行程结束']
                return arr[status - 1]
            }
        }, {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            width: 220,
        }, {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: 220,
        }, {
            title: '订单金额',
            dataIndex: 'totalFee',
            key: 'totalFee',
            width: 100,
        }, {
            title: '实付金额',
            dataIndex: 'userPay',
            key: 'userPay',
            width: 100,
        }]
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedKey
        }
        const btnDisabled = selectedKey.length < 1
        return (
            <div>
                <Card>
                    <FilterForm 
                        getData={this.getData.bind(this)} 
                        wrappedComponentRef={FilterForm => {
                            this.FilterForm = FilterForm
                        }} 
                    />
                </Card>
                <Card>
                    <Button type="primary" disabled={btnDisabled} onClick={this.goDetail}>订单详情</Button>
                    <Button type="danger" disabled={btnDisabled} onClick={() => this.endOrder()}>结束订单</Button>
                    <Table
                        style={{marginTop: 20}}
                        bordered
                        columns={columns}
                        dataSource={list}
                        pagination={pagination}
                        scroll={{x: 1440}}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    return this.handleItemClick(record, index)
                                }
                            }
                        }}
                    >

                    </Table>
                </Card>
                <Modal 
                    visible={showCloseModal}
                    title="结束订单"
                    okText="确定"
                    cancelText="取消"
                    onOk={() => this.ensureClose()}
                    onCancel={() => this.setState({
                        showCloseModal: false
                    })}
                >
                    <div className="flex flex-s" style={{height: 50, paddingLeft: 20}}>
                        <span style={{width: 120, paddingRight: 10}} className="flex flex-e">车辆编号：</span>
                        <span>{closeDetail.bikeSn}</span>
                    </div>
                    <div className="flex flex-s" style={{height: 50, paddingLeft: 20}}>
                        <span style={{width: 120, paddingRight: 10}} className="flex flex-e">剩余电量：</span>
                        <span>{closeDetail.electric}%</span>
                    </div>
                    <div className="flex flex-s" style={{height: 50, paddingLeft: 20}}>
                        <span style={{width: 120, paddingRight: 10}} className="flex flex-e">行程开始时间：</span>
                        <span>{closeDetail.startTime}</span>
                    </div>
                    <div className="flex flex-s" style={{height: 50, paddingLeft: 20}}>
                        <span style={{width: 120, paddingRight: 10}} className="flex flex-e">当前位置：</span>
                        <span>{closeDetail.location}</span>
                    </div>
                </Modal>
            </div>
        )
    }
}

class FilterForm extends Component {
    render() {
        const { getData, form } = this.props
        const { getFieldDecorator, resetFields } = form
        return <Form layout="inline">
            <FormItem label="城市">
                {
                    getFieldDecorator('cityId', {
                        initialValue: '',
                    })(
                        <Select style={{width: 160}}>
                            <Option value="">全部城市</Option>
                            <Option value="bj">北京</Option>
                            <Option value="sh">上海</Option>
                            <Option value="gz">广州</Option>
                            <Option value="sz">深圳</Option>
                            <Option value="wh">武汉</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="订单时间">
                {
                    getFieldDecorator('time', {
                        initialValue: [moment().subtract(7, 'day'), moment()],
                    })(
                        <RangePicker format="YYYY-MM-DD" style={{width: 240}}/>
                    )
                }
            </FormItem>
            <FormItem label="订单状态">
                {
                    getFieldDecorator('status', {
                        initialValue: '',
                    })(
                        <Select style={{width: 160}}>
                            <Option value="">全部状态</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">进行中（临时锁车）</Option>
                            <Option value="3">行程结束</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem>
                <Button type="primary" onClick={getData}>查询</Button>
                <Button onClick={() => resetFields()}>重置</Button>
            </FormItem>
        </Form>
    }
}
FilterForm = Form.create()(FilterForm) 
