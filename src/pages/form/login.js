import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd'
const FormItem = Form.Item

class Login extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card title="内联登录表单">
                    <Form layout="inline">
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: 'yyh',
                                    rules: [{
                                        required: true,
                                        message: '请输入用户名'
                                    },{
                                        min: 4,
                                        max: 8,
                                        message: '长度为4-8'
                                    }, {
                                        pattern: /^[a-z0-9]+$/i,
                                        message: '用户名只能由字母和数字组成'
                                    }]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                            
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '123456',
                                    rules: [{
                                        required: true,
                                        message: '请输入密码'
                                    }]
                                })(
                                    <Input placeholder="请输入密码" type="password" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.login}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="纵向登录表单">
                    <Form style={{ width: 260 }}>
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }

    login = () => {
        const userInfo = this.props.form.getFieldsValue()
        console.log(userInfo)

        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log(`验证通过，用户名 ${values.userName}，密码 ${values.password}`)
            }
        })
    }
}

export default Form.create()(Login)
