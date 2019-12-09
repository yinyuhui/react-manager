import React, { Component } from 'react'
import { Card } from 'antd'
import FilterForm from '../../components/FilterForm'
import moment from 'moment'

export default class BikeMap extends Component {
    state = {}
    initValue = {
        city: '',
        time: [moment().subtract(7, 'day'), moment()],
        status: ''
    }
    filterFormList = [
        {
            type: 'SELECT',
            label: '城市',
            code: 'city',
            initialValue: this.initValue.city,
            options: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '北京',
                    value: 'bj'
                },
                {
                    label: '上海',
                    value: 'sh'
                },
                {
                    label: '广州',
                    value: 'gz'
                },
                {
                    label: '深圳',
                    value: 'sz'
                },
                {
                    label: '武汉',
                    value: 'wh'
                }
            ],
            width: 120
        },
        {
            type: 'RANGE_PICKER',
            code: 'time',
            width: 240,
            initialValue: this.initValue.time
        },
        {
            type: 'SELECT',
            label: '订单状态',
            code: 'status',
            initialValue: this.initValue.status,
            options: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '进行中',
                    value: '1'
                },
                {
                    label: '行程结束',
                    value: '2'
                }
            ],
            width: 120
        }
    ]

    params = {
        page: 1
    }

    async getData(query = this.initValue) {
        query.startTime = moment(query.time[0]).valueOf()
        query.endTime = moment(query.time[1]).valueOf()
        query.time = null
        const res = await React.$get('map/bike', { ...this.params, ...query })
        this.setState({
            area: res.result.area,
            positions: res.result.position,
            total: res.result.total
        })
        this.renderMap()
    }

    renderMap() {
        this.map = new window.BMap.Map('bikeMap')
        this.map.addControl(
            new window.BMap.ScaleControl({
                anchor: window.BMAP_ANCHOR_TOP_RIGHT
            })
        )
        this.map.addControl(
            new window.BMap.NavigationControl({
                anchor: window.BMAP_ANCHOR_TOP_RIGHT
            })
        )
        this.drewMapEl()
    }

    drewMapEl() {
        const { area, positions } = this.state
        // 服务区
        const areaList = area.map(item => new window.BMap.Point(item.longitude, item.latitude))
        var polygon = new window.BMap.Polygon(areaList, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })

        const centerPoint = new window.BMap.Point(114.29533492773774, 30.510833519064715)
        this.map.centerAndZoom(centerPoint, 15)
        this.map.addOverlay(polygon)

        positions.forEach(point => {
            this.drewPoint(point)
        })
    }

    drewPoint = pointInfo => {
        var icon = new window.BMap.Icon(
            `/assets/bike_${pointInfo.status}.png`,
            new window.BMap.Size(26, 26),
            {
                anchor: new window.BMap.Size(12, 12),
                imageSize: new window.BMap.Size(26, 26)
            }
        )

        var point = new window.BMap.Point(pointInfo.longitude, pointInfo.latitude)
        var marker = new window.BMap.Marker(point, { icon })
        this.map.addOverlay(marker)
    }

    componentDidMount = () => {
        this.getData()
    }

    render() {
        const { total } = this.state
        return (
            <div>
                <Card>
                    <FilterForm
                        filterFormList={this.filterFormList}
                        getData={this.getData.bind(this)}
                    />
                </Card>
                <Card>
                    <p style={{ marginBottom: 10 }}>共 {total} 辆单车</p>
                    <div id="bikeMap" style={{ height: 600 }}></div>
                </Card>
            </div>
        )
    }
}
