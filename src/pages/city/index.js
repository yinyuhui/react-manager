import React, { Component } from 'react'
import { Card, Table, Form, Select, Button, Modal, message } from 'antd'
import { pagination } from '../../utils'
const FormItem = Form.Item
const { Option } = Select

export default class City extends Component {
    state = {
        dataSource: [],
        showSetCity: false, // 开通城市管理弹框
    }

    params = {
        page: 1
    }

    componentDidMount = () => {
      this.getData()
    }

    async getData(query={}) {
        const data = await React.$get('city/list', {...this.params, ...query})
        this.setState({
            dataSource: data.result.list,
            pagination: pagination(data, (current)=> {
                this.params.page = current
                this.getData()
            })
        })
    }

    // 开通城市
    setCity = () => {
        this.setState({
            showSetCity: true
        })
    }

    async submit() {
        const cityForm = this.cityForm.props.form.getFieldsValue()
        const res = await React.$post('city/open', cityForm)
        
        this.setState({
            showSetCity: false
        })
        this.cityForm.props.form.resetFields()
        res.result ? message.success('操作成功') : message.error('操作失败')
        this.getData()
    }

    render() {
        const { dataSource, pagination, showSetCity } = this.state
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'cityId',
                key: 'cityId',
            }, {
                title: '城市名称',
                dataIndex: 'cityName',
                key: 'cityName',
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                key: 'mode',
                render: (mode) => {
                    let arr = ['指定停车点模式', '禁停区模式']
                    return arr[mode - 1]
                }
            }, {
                title: '营运模式',
                dataIndex: 'opMode',
                key: 'opMode',
                render: (opMode) => {
                    let arr = ['自营', '加盟']
                    return arr[opMode - 1]
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchiseeName',
                key: 'franchiseeName',
            }, {
                title: '城市管理员',
                dataIndex: 'cityAdmin',
                key: 'cityAdmin',
                render: (cityAdmin) => {
                    return cityAdmin.map(admin => {
                        return admin.adminName
                    }).join(',')
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'openTime',
                key: 'openTime',
            }, {
                title: '操作时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
            }, {
                title: '操作人',
                dataIndex: 'userName',
                key: 'userName',
        }]
        return (
            <div>
                <Card>
                    <FilterForm getData={this.getData.bind(this)} />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.setCity}>开通城市</Button>
                    <Table 
                        style={{marginTop: 20}}
                        bordered={true}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={pagination}
                    />
                </Card>
                <Modal
                    title="开通城市"
                    visible={showSetCity}
                    onOk={() => this.submit()}
                    onCancel={() => this.setState({showSetCity: false})}
                    okText="确定"
                    cancelText="取消"
                >
                    <OpenCityForm wrappedComponentRef={(cityForm) => {this.cityForm = cityForm}} />
                </Modal>
            </div>
        )
    }
}

class FilterForm extends Component {
    query = () => {
        let queryForm = this.props.form.getFieldsValue()
        this.props.getData(queryForm)
    }
    resetForm = () => {
        this.props.form.resetFields()
    }
    
    render() {
        const { getFieldDecorator } = this.props.form
        return <Form layout="inline">
            <FormItem label="城市">
                {
                    getFieldDecorator('cityId', {
                        initialValue: '',
                    })(
                        <Select style={{width: 100}}>
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
            <FormItem label="用车模式">
                {
                    getFieldDecorator('mode', {
                        initialValue: '',
                    })(
                        <Select style={{width: 150}}>
                            <Option value="">全部用车模式</Option>
                            <Option value="1">指定停车点模式</Option>
                            <Option value="2">禁停区模式</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="运营模式">
                {
                    getFieldDecorator('opMode', {
                        initialValue: '',
                    })(
                        <Select style={{width: 150}}>
                            <Option value="">全部运营模式</Option>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="加盟商授权状态">
                {
                    getFieldDecorator('authStatus', {
                        initialValue: '',
                    })(
                        <Select style={{width: 100}}>
                            <Option value="">全部状态</Option>
                            <Option value="1">已授权</Option>
                            <Option value="2">未授权</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem>
                <Button type="primary" onClick={this.query}>查询</Button>
                <Button onClick={this.resetForm}>重置</Button>
            </FormItem>
        </Form>
    }
}
FilterForm = Form.create()(FilterForm) 

class OpenCityForm extends Component {
    render() {
        const formItemStyle = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }
        }
        const { getFieldDecorator } = this.props.form
        return <Form>
            <FormItem label="开通城市" {...formItemStyle}>
                {
                    getFieldDecorator('cityId', {
                        initialValue: 'bj'
                    })(
                        <Select>
                            <Option value="bj">北京</Option>
                            <Option value="sh">上海</Option>
                            <Option value="gz">广州</Option>
                            <Option value="sz">深圳</Option>
                            <Option value="wh">武汉</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="用车模式" {...formItemStyle}>
                {
                    getFieldDecorator('mode', {
                        initialValue: '1'
                    })(
                        <Select>
                            <Option value="1">指定停车点模式</Option>
                            <Option value="2">禁停区模式</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="运营模式" {...formItemStyle}>
                {
                    getFieldDecorator('opMode', {
                        initialValue: '1'
                    })(
                        <Select>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                    )
                }
            </FormItem>
        </Form>
    }
}
OpenCityForm = Form.create()(OpenCityForm) 
