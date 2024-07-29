import React, { Component } from 'react'
import { Card, Button, Form, Select, Input, Modal, Radio } from 'antd'
import ITable from '../../components/ITable'
import moment from 'moment'
import { getList, updateTableSelected } from '../../utils'
const FormItem = Form.Item
const { Option } = Select
const RadioGroup = Radio.Group
const roleList = ['管理人员', '财务专员', '客服专员', '市场专员', '开发人员']

export default class Permission extends Component {
    state = {
        showModal: false
    }

    params = {
        limit: 10,
        offset: 0
    }

    getData = () => {
        getList(this, 'permission/list', this.params)
    }

    componentDidMount () {
        this.getData()
    }

    createRole = () => {
        this.setState({
            showModal: true,
            type: 'createRole'
        })
    }

    submit = async () => {
        const formData = this.roleForm.props.form.getFieldsValue()
        console.log(formData)
        switch (this.state.type) {
            case 'createRole':
                await React.$post('/permission/add-role', formData)
                this.getData()
                break
            default:
        }
        this.cancel()
        this.getData()
    }

    cancel = () => {
        this.setState({ showModal: false, type: '' })
        this.roleForm.props.form.resetFields()
    }

    render () {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            },
            {
                title: '角色名称',
                dataIndex: 'roleName',
                render: role => roleList[role]
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                render: status => (status === 1 ? '启用' : '停用')
            },
            {
                title: '授权时间',
                dataIndex: 'authorizeTime',
                render: time => moment(time).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '授权人',
                dataIndex: 'authorizeUserName'
            }
        ]

        const { list, pagination, selectedKey = [], selectedItem, showModal } = this.state
        const disabled = selectedKey.length === 0

        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.createRole}>
                        创建角色
                    </Button>
                    <Button type="primary" disabled={disabled}>
                        设置权限
                    </Button>
                    <Button type="primary" disabled={disabled}>
                        用户授权
                    </Button>
                    <ITable
                        rowKey="id"
                        columns={columns}
                        dataSource={list}
                        pagination={pagination}
                        updateSelected={updateTableSelected.bind(this)}
                        selectionType="radio"
                        selectedRowKeys={selectedKey}
                        selectedItems={selectedItem}
                    />
                </Card>
                <Modal visible={showModal} onCancel={this.cancel} onOk={this.submit}>
                    <RoleForm wrappedComponentRef={roleForm => (this.roleForm = roleForm)} />
                </Modal>
            </div>
        )
    }
}

class RoleForm extends Component {
    render () {
        const { selectedItem } = this.props
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 16
            }
        }
        return (
            <Form>
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator('RoleName', {
                        rules: [
                            {
                                required: true,
                                message: '请输入角色名称'
                            }
                        ]
                    })(<Input placeholder="请输入角色名称" />)}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: 1
                    })(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={2}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create()(RoleForm)
