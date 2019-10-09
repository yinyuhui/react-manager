import React, { Component } from 'react'
import { Card, Row, Col, Modal } from 'antd'

export default class Gallery extends Component {
    state = {
        showLargeImage: false
    }

    render() {
        let imgs = []
        let arr = []
        for(let i = 0; i < 32; i++) {
            arr.push({
                img: `/gallery/${i + 1}.jpeg`,
                title: 'title ' + (i + 1),
                desc: 'description ' + (i + 1)
            })
            if((i + 1) % 8 === 0) {
                imgs.push(arr)
                arr = []
            }
        }

        const imageList = imgs.map(list => list.map(item => 
            <Card
                cover={<img src={item.img} onClick={() => this.showLargeImage(item.img)} />}
            >
                <Card.Meta title={item.title} description={item.desc} />
            </Card>
        ))

        return (
            <div>
                <Row gutter={16} >
                    {
                        imageList.map((list, index) => 
                            <Col key={index} span={6}>
                                { list }
                            </Col>  
                        )
                    }
                </Row>

                <Modal 
                    title="大图展示"
                    style={{ width: 360 }}
                    visible={this.state.showLargeImage}
                    centered
                    footer={null}	
                    onCancel={() => this.setState({showLargeImage: false})}
                >
                    <img src={this.state.imgSrc} style={{ width: '100%' }} />
                </Modal>
            </div>
        )
    }

    showLargeImage = (imgSrc) => {
        this.setState({
            imgSrc,
            showLargeImage: true
        })
    }
}
