import React, { Component } from 'react'
import { Button, Form, DatePicker, Select, Input, Checkbox}  from 'antd'
const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker;

class FilterForm extends Component {
    getFormList = () => {
        const { form, filterFormList } = this.props
        const { getFieldDecorator } = form
        {
            return filterFormList.map(item => {
                const { type, label, code, width, initialValue, placeholder = '' } = item 
                switch(type) {
                    case 'SELECT': 
                        const { options } = item 
                        return <FormItem label={label}>
                            {   
                                getFieldDecorator([code], {
                                    initialValue
                                })(
                                    <Select style={{ width }} key={code} >
                                        {
                                            options.map(option => {
                                                const { value, label } = option
                                                return <Option 
                                                    value={value}
                                                    key={'key' + value}
                                                >{label}</Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                    case 'INPUT': 
                        return <FormItem label={label}>
                            {   
                                getFieldDecorator([code], {
                                    initialValue
                                })(
                                    <Input type="text" placeholder={placeholder} style={{ width }} key={code} />
                                )
                            }
                        </FormItem>
                    case 'RANGE_PICKER':
                        const { format } = item
                        return <FormItem label={label}>
                            {
                                getFieldDecorator([code], {
                                    initialValue
                                })(
                                    <RangePicker format={format} style={{ width }} key={code} />
                                )
                            }
                        </FormItem>
                    case 'CHECKBOX':
                        return <FormItem label={label}>
                            {
                                getFieldDecorator([code], {
                                    valuePropName: 'checked',
                                    initialValue
                                })(
                                    <Checkbox format={format} style={{ width }} key={code} />
                                )
                            }
                        </FormItem>    
                }
            })
        }
    }

    getData = () => {
        let fieldsValue = this.props.form.getFieldsValue()
        this.props.getData(fieldsValue)
    }

    render() {
        const { resetFields } = this.props.form
        return <Form layout="inline">
            { this.getFormList() }
            <FormItem >
                <Button type="primary" onClick={this.getData}>查询</Button>
                <Button onClick={() => resetFields()}>重置</Button>
            </FormItem>
        </Form>
    }
}

export default Form.create()(FilterForm) 