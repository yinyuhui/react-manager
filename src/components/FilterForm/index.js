// filterFormList 表单项
// type - 表单类型(可扩展) (SELECT - 下拉  INPUT - 输入框  RANGE_PICKER - 时间区间  CHECKBOX - 多选框)
// options - 下拉列表  label - 展示  value - 值 
// label - 表单 label  code - 该项对应的 code 用于取值  format - 时间控件需要
// width  initialValue  placeholder  

import React, { Component } from 'react'
import { Button, Form, DatePicker, Select, Input, Checkbox}  from 'antd'
import moment from 'moment'
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
            const { type, label = '', code, width = 150, initialValue = '', placeholder = '' } = item 
            let formItem = null
            switch(type) {
                case 'SELECT': 
                    const { options = [] } = item 
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
                    const { format = 'YYYY-MM-DD' } = item
                    formItem =  <FormItem label={label} key={code}>
                        {
                            getFieldDecorator(code, {
                                initialValue: initialValue || [moment().subtract(7, 'day'), moment()]
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
                                <Checkbox style={{ width }} />
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