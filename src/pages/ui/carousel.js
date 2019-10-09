import React, { Component } from 'react'
import { Card, Carousel } from 'antd'

export default class Carousels extends Component {
    render() {
        return (
            <div>
                <Card title="文字背景轮播" >
                    <Carousel autoplay>
                        <h1>轮播图第一页</h1>
                        <h1>轮播图第二页</h1>
                        <h1>轮播图第三页</h1>
                        <h1>轮播图第四页</h1>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="carousel2" >
                    <Carousel autoplay >
                        <img src="/gallery/9.jpeg" alt="" />
                        <img src="/gallery/10.jpeg" alt="" />
                        <img src="/gallery/11.jpeg" alt="" />
                        <img src="/gallery/12.jpeg" alt="" />
                    </Carousel>
                </Card>
            </div>
        )
    }
}
