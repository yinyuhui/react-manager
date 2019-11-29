import React, { Component } from 'react'
import { Card } from 'antd'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import Chart from 'echarts-for-react'

export default class Line extends Component {
    getOption = () => {
        return {
            color: ['#539092','#b17781','#77b179'],
            title: {
                text: '折线图标题',
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                right: 60,
                top: 20,
                data: ['a', 'b']
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ]
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                name: 'a',
                type: 'line',
                data: [300, 233, 342, 435, 253, 432, 533],
            }]
        }
    }

    getOption2 = () => {
        let options = this.getOption()
        options.series.push({
            name: 'b',
            type: 'line',
            data: [342, 432, 243, 332, 134, 252, 242]
        })
        return {
            ...options,
            title: {
                text: '多条折线图标题',
            },
        }
    }
    getOption3 = () => {
        let options = this.getOption()
        options.xAxis.boundaryGap = false
        options.series[0].areaStyle = {}
        return {
            ...options,
            title: {
                text: '填充折线图标题',
            },
        }
    }

    render() {
        return (
            <div>
                <Card
                    title="基础折线图" 
                >
                    <Chart option={this.getOption()}></Chart>
                </Card>
                <Card
                    title="多条折线图" 
                >
                    <Chart option={this.getOption2()}></Chart>
                </Card>
                <Card
                    title="填充折线图" 
                >
                    <Chart option={this.getOption3()}></Chart>
                </Card>
            </div>
        )
    }
}
