import React, { Component } from 'react'
import { Card } from 'antd'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import Chart from 'echarts-for-react'

export default class Pie extends Component {
    getOption = () => {
        return {
            title: {
                text: '饼图标题',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}: {c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 20,
                top: 'center',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ]
            },
            series: [{
                name: '统计',
                type: 'pie',
                data: [{
                    value: 300, 
                    name: '周一'
                }, {
                    value: 233, 
                    name: '周二' 
                }, {
                    value: 342,  
                    name: '周三' 
                }, {
                    value: 435,  
                    name: '周四' 
                }, {
                    value: 353,  
                    name: '周五' 
                }, {
                    value: 432,  
                    name: '周六' 
                }, {
                    value: 533,
                    name: '周日' 
                }],
            }]
        }
    }

    getOption2 = () => {
        let options = this.getOption()
        options.series.map(item => {
            item.radius = ['50%', '80%']
            return item
        })
        return {
            ...options,
            title: {
                text: '环形图标题',
                top: 'center',
                left: 'center'
            },
        }
    }
    getOption3 = () => {
        let options = this.getOption()
        return {
            ...options,
            roseType: 'radius',
            title: {
                text: '南丁格尔图标题',
            },
        }
    }

    render() {
        return (
            <div>
                <Card
                    title="基础饼图" 
                >
                    <Chart option={this.getOption()}></Chart>
                </Card>
                <Card
                    title="环形图" 
                >
                    <Chart option={this.getOption2()}></Chart>
                </Card>
                <Card
                    title="南丁格尔图" 
                >
                    <Chart option={this.getOption3()}></Chart>
                </Card>
            </div>
        )
    }
}
