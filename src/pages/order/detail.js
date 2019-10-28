import React, { Component } from 'react'
import { Card } from 'antd'
import './index.less'

export default class OrderDetail extends Component {
    state = {
        basicInfo: {},
        travelingTrack: {},
    }

    basicInfo = [{
        label: '用车模式',
        prop: 'mode',
    }, {
        label: '订单编号',
        prop: 'orderSn',
    }, {
        label: '车辆编号',
        prop: 'bikeSn',
    }, {
        label: '用户姓名',
        prop: 'userName',
    }, {
        label: '手机号码',
        prop: 'mobile',
    }]

    travelingTrack = [{
        label: '行程起点',
        prop: 'startPoint',
    }, {
        label: '行程终点',
        prop: 'endPoint',
    }, {
        label: '行驶里程',
        prop: 'totalDistance',
    }]

    async componentDidMount() {
        const { orderSn } = this.props.match.params
        if(orderSn) {
            const data = await React.$get('/order/detail', { orderSn })
            this.setState({
                basicInfo: data.result.basicInfo,
                travelingTrack: data.result.travelingTrack,
            })
            this.renderMap()
        }
        
    }

    renderMap = () => {
        this.map = new window.BMap.Map('orderDetailMap')
        this.map.centerAndZoom('武汉', 11)
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
    }

    // 绘制行驶路线
    drewBikeRoute = (list) => {
        // this.map.add
    }

    render() {
        const { basicInfo, travelingTrack } = this.state
        const modeList = ['指定停车点模式', '禁停区模式']
        return (
            <Card>
                <div id='orderDetailMap'>orderDetailMap</div>
                <div className="order-info">
                    <div className="title">基础信息</div>
                    <div className="list">
                        <ul>
                            {
                                this.basicInfo.map(item => <li 
                                    className="flex"
                                    key={item.prop}
                                >
                                    <span className="label">{item.label}</span>
                                    <span className="value">{item.prop === 'mode' ? modeList[basicInfo[item.prop] - 1] : basicInfo[item.prop]}</span>
                                </li>)
                            }
                            
                        </ul>
                    </div>
                    <div className="title traveling-title">行驶轨迹</div>
                    <div className="list">
                        <ul>
                            {
                                this.travelingTrack.map(item => <li 
                                    className="flex"
                                    key={item.prop}
                                >
                                    <span className="label">{item.label}</span>
                                    <span className="value">{travelingTrack[item.prop]}</span>
                                </li>)
                            }
                            
                        </ul>
                    </div>
                </div>
            </Card>
        )
    }
}
