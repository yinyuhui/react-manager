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
                area: data.result.area,
                track: data.result.track,
            })
            this.renderMap()
        }
    }

    renderMap = () => {
        this.map = new window.BMap.Map('orderDetailMap')
        // this.map.centerAndZoom('武汉', 11)
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
        this.drewMapEl()
    }

    // 绘制地图内容
    drewMapEl = () => {
        const { track, area } = this.state

        // 起终点
        const startPointPos = track[0]
        const endPointPos = track[track.length - 1]

        // 行驶路线中心
        const centerLng = (startPointPos.longitude + endPointPos.longitude) / 2
        const centerLat = (startPointPos.latitude + endPointPos.latitude) / 2
        const centerPos = new window.BMap.Point(centerLng, centerLat)
        this.map.centerAndZoom(centerPos, 15)

        // 服务区
        const areaList = area.map(item => (new window.BMap.Point(item.longitude, item.latitude)))
        var polygon = new window.BMap.Polygon(areaList, {
            strokeColor: "#CE0000", 
            strokeWeight: 4, 
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })

        // 行驶路线
        const trackList = track.map(item => (new window.BMap.Point(item.longitude, item.latitude)))
        var polyline = new window.BMap.Polyline(trackList, {
            strokeColor: "#1869AD", 
            strokeWeight: 3, 
            strokeOpacity: 1
        })
        
        this.map.addOverlay(polygon)
        this.map.addOverlay(polyline)
        this.drewPoint(startPointPos, 'start')
        this.drewPoint(endPointPos, 'end')
    }

    drewPoint = (pointPos, type) => {
        var icon = new window.BMap.Icon(`/assets/${type}_point.png`, new window.BMap.Size(26, 34), {    
            anchor: new window.BMap.Size(12, 34),    
        })

        var point = new window.BMap.Point(pointPos.longitude, pointPos.latitude)
        var marker = new window.BMap.Marker(point, { icon })       
        this.map.addOverlay(marker)
    }

    render() {
        const { basicInfo, travelingTrack } = this.state
        const modeList = ['指定停车点模式', '禁停区模式']
        return (
            <Card style={{ marginBottom: 30 }}>
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
