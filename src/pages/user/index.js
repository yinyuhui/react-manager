import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input, Radio, Select, DatePicker } from 'antd'
import FilterForm from '../../components/FilterForm'
import ITable from '../../components/ITable'
import { getList, updateTableSelected } from '../../utils'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select
const { TextArea } = Input

const stateList = ['咸鱼等翻身', '正在拼搏中', '修身养性享受生活', '苦逼创业者']
const interestList = ['游泳', '跑步', '足球', '篮球', '爬山', '攀岩', '蹦极', '桌球']

export default class User extends Component {
    state = {
        selectedKey: [],
        selectedItem: [],
        modalVisible: false,
    }

    params = {
        page: 1
    }

    filterFormInitValue = {
        userName: '',
        userMobile: '',
        userDate: [moment().subtract(1, 'month'), moment()],
    }

    filterFormList = [{
        type: 'INPUT',
        code: 'userName',
        label: '用户名',
        width: 160,
        initialValue: this.filterFormInitValue.userName,
        placeholder: '请输入用户名'
    }, {
        type: 'INPUT',
        code: 'userMobile',
        label: '手机号',
        width: 160,
        initialValue: this.filterFormInitValue.userMobile,
        placeholder: '请输入手机号'
    }, {
        type: 'RANGE_PICKER',
        code: 'userDate',
        label: '入职时间',
        width: 240,
        initialValue: this.filterFormInitValue.userDate,
        format: 'YYYY-MM-DD',
    }]

    getData = (query = this.filterFormInitValue) => {
        query.startTime = query.userDate ? moment(query.userDate[0]).valueOf() : query.startTime
        query.endTime = query.userDate ? moment(query.userDate[1]).valueOf() : query.endTime
        query.userDate = null
        getList(this, 'user/list', {...this.params, ...query})
        this.setState({
            selectedKey: [],
            selectedItem: [],
            type: 'add'
        })
    }

    // 按钮点击事件
    handleUser = (type) => {
        let title = ''
        let modalVisible = true
        const selectedItem = this.state.selectedItem[0]
        switch(type) {
            case 'add':
                title = '新增'
                break
            case 'edit':
                title = '编辑'
                break
            case 'detail':
                title = '查看'
                modalVisible = true
                break
            case 'delete':
                modalVisible = false
                Modal.confirm({
                    centered: true,
                    okText: '确认',
                    cancelText: '取消',
                    title: '确认删除',
                    content: `确认删除这一项么？ID - ${selectedItem.id}, 姓名 - ${selectedItem.userName}`,
                    onOk: () => {
                        React.$post('user/delete', {
                            id: selectedItem.id
                        }).then(() => {
                            this.getData()
                        })
                    },
                })
                break
            default:
        }
        this.setState({
            title,
            type,
            modalVisible,
        })
    }

    closeModal = () => { 
        this.userForm.props.form.resetFields()
        this.setState({ modalVisible: false }) 
    }

    // 弹框确认
    handleModalSubmit = () => {
        this.userForm.props.form.validateFields((err, values) => {
            if(!err) {
                let selectedItem = this.state.selectedItem[0]
                switch(this.state.type) {
                    case 'add': 
                        React.$post('user/add', values).then(() => {
                            this.getData()
                        })
                        break;
                    case 'edit': 
                        React.$post('user/edit', {
                            id: selectedItem.id,
                            ...values
                        }).then(() => {
                            this.getData()
                        })
                        break
                    default: 
                }
                this.setState({
                    modalVisible: false
                })
                this.userForm.props.form.resetFields()
            }
        })
    }

    componentDidMount = () => {
      this.getData()
    }
    
    render() {
        const { 
            list = [], pagination, selectedKey = [], selectedItem = [],
            title = '', modalVisible = false, type = 'add', 
        } = this.state
        const btnDisabled = selectedKey.length < 1
        
        const columns = [
            {
            title: '员工ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: sex => sex === 1 ? '男' : '女'
        }, {
            title: '兴趣爱好',
            dataIndex: 'interest',
            key: 'interest',
            render: interest => interestList[interest - 1]
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: state => stateList[state - 1]
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            rowKey: 'birthday'
        }, {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '入职时间',
            dataIndex: 'time',
            key: 'time',
        }]

        let footer = {}
        if(type === 'detail') {
            footer = { footer: null }
        }
        return (
            <div>
                <Card>
                    <FilterForm 
                        filterFormList={this.filterFormList} 
                        getData={this.getData.bind(this)}
                    />
                </Card>
                <Card>
                    <Button type="primary" icon="user-add" onClick={() => this.handleUser('add')}>新增</Button>
                    <Button type="primary" icon="edit" disabled={btnDisabled} onClick={() => this.handleUser('edit')}>编辑</Button>
                    <Button type="primary" icon="user" disabled={btnDisabled} onClick={() => this.handleUser('detail')}>查看</Button>
                    <Button type="danger" icon="user-delete" disabled={btnDisabled} onClick={() => this.handleUser('delete')}>删除</Button>
                    <ITable
                        style={{marginTop: 20}}
                        columns={columns}
                        dataSource={list}
                        pagination={pagination}
                        selectionType="radio"
                        selectedRowKeys={selectedKey}
                        selectedItems={selectedItem}
                        updateSelected = {updateTableSelected.bind(this)}
                        rowKey="id"
                    />
                </Card>
                <Modal 
                    title={title}
                    visible={modalVisible}
                    onOk={this.handleModalSubmit}
                    onCancel={this.closeModal}
                    okText="确定"
                    cancelText="取消"
                    {...footer}
                >
                    <UserForm 
                        type={type} 
                        selectedItem={selectedItem} 
                        wrappedComponentRef={ userForm => this.userForm = userForm } />
                </Modal>
            </div>
        )
    }
}

class UserForm extends Component {
    render() {
        const { type, selectedItem, } = this.props
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { 
                xs: 24,
                sm: 4
            },
            wrapperCol: { 
                xs: 24,
                sm: 16 
            },
        }
        return <Form>
            <FormItem label="姓名" {...formItemLayout}>
                {
                    type === 'detail' ? selectedItem[0].userName : 
                    getFieldDecorator('userName', {
                        initialValue: type === 'add' ? '' : selectedItem[0].userName,
                        rules: [{
                            required: true,
                            message: '请输入姓名'
                        }]
                    })(
                        <Input placeholder="请输入姓名" />
                    )
                }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
                {
                    type === 'detail' ? (selectedItem[0].sex === 1 ? '男' : '女') : 
                    getFieldDecorator('sex', {
                        initialValue: type === 'add' ? 1 : selectedItem[0].sex 
                    })(
                        <RadioGroup >
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                    )
                }
            </FormItem>
            <FormItem label="状态" {...formItemLayout}>
                {
                    type === 'detail' ? stateList[selectedItem[0].state - 1] : 
                    getFieldDecorator('state', {
                        initialValue: type === 'add' ? 3 : selectedItem[0].state 
                    })(
                        <Select >
                            {
                                stateList.map((item, index) => {
                                    return <Option value={index + 1} key={item}>{item}</Option>
                                })
                            }
                        </Select>
                    )
                }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
                {
                    type === 'detail' ? moment(selectedItem[0].birthday).format('YYYY-MM-DD') : 
                    getFieldDecorator('birthday', {
                        initialValue: type === 'add' ? moment() : moment(selectedItem[0].birthday)
                    })(
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD"
                        />
                    )
                }
            </FormItem>
            <FormItem label="地址" {...formItemLayout}>
                {
                    type === 'detail' ? selectedItem[0].address : 
                    getFieldDecorator('address', {
                        initialValue: type === 'add' ? '' : selectedItem[0].address,
                        rules: [{
                            required: true,
                            message: '请输入地址'
                        }]
                    })(
                        <TextArea 
                            placeholder="请输入地址" 
                            autosize= {{
                                minRows: 3
                            }} 
                        />
                    )
                }
            </FormItem>
        </Form>
    }
}

UserForm = Form.create()(UserForm)