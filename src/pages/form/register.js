import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Radio,
    InputNumber,
    Select,
    Switch,
    DatePicker,
    TimePicker,
    Upload,
    Icon,
    Checkbox,
    Button
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select
const { TextArea } = Input

class Register extends Component {
    state = {
        userImg: '',
        loading: false,
        nameLength: 0
    }

    normFile = e => {
        console.log('Upload event:', e)
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    checkName = (rule, value, callback) => {
        console.log('checkName')
        const name = value
        if (name) {
            console.log('if')
            if (/\s/.test(name)) {
                callback('输入存在空格,请检查')
                return
            }
            // 异步校验
            // const { AppManagementStore } = this.props
            // const { organizationId } = this.state
            // AppManagementStore.checkName(organizationId, name).then(() => {
            //     callback()
            // }).catch((error) => {
            //     if (error.response && error.response.status === 400) {
            //         callback('App名称已存在')
            //     }
            // })
        } else {
            console.log('else')
            callback('该字段是必填项')
        }
    }

    handleInput = e => {
        this.setState({
            nameLength: e.target.value.length
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { userImg } = this.state
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 4
                }
            }
        }
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem {...formItemLayout} label="用户名">
                            {getFieldDecorator('userName', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        // message: '请输入用户名',
                                        validator: this.checkName,
                                        validateTrigger: 'onBlur'
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="请输入用户名"
                                    onChange={this.handleInput}
                                    suffix={
                                        <p
                                            style={{
                                                color: 'rgba(0,0,0,0.25)'
                                            }}
                                        >
                                            {this.state.nameLength}/20
                                        </p>
                                    }
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码">
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码'
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="请输入密码"
                                    type="password"
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="性别">
                            {getFieldDecorator('sex', {
                                initialValue: '1'
                            })(
                                <RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="年龄">
                            {getFieldDecorator('age', {
                                initialValue: 18
                            })(<InputNumber />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="当前状态">
                            {getFieldDecorator('state', {
                                initialValue: '2'
                            })(
                                <Select>
                                    <Option value="1">咸鱼等翻身</Option>
                                    <Option value="2">正在拼搏中</Option>
                                    <Option value="3">修身养性享受生活</Option>
                                    <Option value="4">苦逼创业者</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="兴趣爱好">
                            {getFieldDecorator('interest', {
                                initialValue: ['2', '8']
                            })(
                                <Select mode="multiple">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">跑步</Option>
                                    <Option value="3">足球</Option>
                                    <Option value="4">篮球</Option>
                                    <Option value="5">爬山</Option>
                                    <Option value="6">攀岩</Option>
                                    <Option value="7">蹦极</Option>
                                    <Option value="8">桌球</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="是否已婚">
                            {getFieldDecorator('isMarried', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(<Switch />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="生日">
                            {getFieldDecorator('birthday', {
                                initialValue: moment('1995-11-06')
                            })(<DatePicker showTime format="YYYY-MM-DD" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="联系地址">
                            {getFieldDecorator('address', {
                                initialValue: ''
                            })(
                                <TextArea
                                    placeholder="请输入联系地址"
                                    autosize={{
                                        minRows: 3
                                    }}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="起床时间">
                            {getFieldDecorator('getUpTime', {
                                initialValue: moment('08:30:00', 'HH:mm:ss')
                            })(<TimePicker format="HH:mm:ss" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="头像">
                            {getFieldDecorator('userImg', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile
                            })(
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    onChange={this.handleChange}
                                >
                                    {userImg ? (
                                        <img
                                            src={userImg}
                                            alt="avatar"
                                            style={{ width: '100%' }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>
                                    同意
                                    <Button type="link" style={{ padding: 0 }}>
                                        注册协议
                                    </Button>
                                </Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" onClick={this.submit}>
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true })
            return
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    userImg: imageUrl,
                    loading: false
                })
            )
        }
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }

    submit = () => {
        const userInfo = this.props.form.getFieldsValue()
        console.log(userInfo)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }
}

export default Form.create()(Register)
