import React, { Component } from 'react'
import { Button, Form, DatePicker, Select, Input, Checkbox}  from 'antd'
const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker;

class FilterForm extends Component {
    getFormList = () => {
        const { form, filterFormList = [] } = this.props
        if(filterFormList.length === 0) {
            console.error('filterFormList 需传入')
            return null
        }
        const { getFieldDecorator } = form
        return filterFormList.map(item => {
            const { type, label, code, width, initialValue = '', placeholder = '' } = item 
            let formItem = null
            switch(type) {
                case 'SELECT': 
                    const { options } = item 
                    formItem = <FormItem label={label} key={code}>
                        {   
                            getFieldDecorator(code, {
                                initialValue
                            })(
                                <Select style={{ width }} >
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
                    break;
                case 'INPUT': 
                    formItem = <FormItem label={label} key={code}>
                        {   
                            getFieldDecorator(code, {
                                initialValue
                            })(
                                <Input type="text" placeholder={placeholder} style={{ width }} />
                            )
                        }
                    </FormItem>
                    break;
                case 'RANGE_PICKER':
                    const { format } = item
                    formItem =  <FormItem label={label} key={code}>
                        {
                            getFieldDecorator(code, {
                                initialValue
                            })(
                                <RangePicker format={format} style={{ width }} />
                            )
                        }
                    </FormItem>
                    break;
                case 'CHECKBOX':
                    formItem = <FormItem label={label} key={code}>
                        {
                            getFieldDecorator(code, {
                                valuePropName: 'checked',
                                initialValue
                            })(
                                <Checkbox format={format} style={{ width }} />
                            )
                        }
                    </FormItem>    
                    break;
                default: 
            }
            return formItem
        })
    }

    getData = () => {
        let fieldsValue = this.props.form.getFieldsValue()
        if(!this.props.getData) {
            console.error('使用 filterForm 时，页面请求列表的方法需传入为 getData')
            return
        }
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