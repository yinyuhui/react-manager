import React, { Component } from 'react'
import { Card } from 'antd'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import Chart from 'echarts-for-react'

export default class Bar extends Component {
    getOption = () => {
        return {
            color: ['#539092','#b17781','#77b179'],
            title: {
                text: '柱状图标题',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['a', 'b', 'c']
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ]
            },
            yAxis: {
                type: 'value',
            },
            series: {
                name: 'y轴值',
                type: 'bar',
                data: [300, 233, 342, 435, 253, 432, 533],
            },
        }
    }

    getOption2 = () => {
        return {
            ...this.getOption(),
            series: [{
                name: 'a',
                type: 'bar',
                data: [342, 432, 243, 332, 134, 252, 242],
            }, {
                name: 'b',
                type: 'bar',
                data: [300, 233, 342, 435, 253, 432, 533],
            }, {
                name: 'c',
                type: 'bar',
                data: [632, 352, 346, 632, 245, 324, 246],
            }],
        }
    }

    render() {
        return (
            <div>
                <Card
                    title="基础柱状图" 
                >
                    <Chart option={this.getOption()}></Chart>
                </Card>
                <Card
                    title="多条柱状图" 
                >
                    <Chart option={this.getOption2()}></Chart>
                </Card>
            </div>
        )
    }
}
