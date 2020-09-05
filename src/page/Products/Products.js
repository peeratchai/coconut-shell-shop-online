import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import { Row, Col, Card, Avatar, Skeleton, Icon } from 'antd';
import 'antd/dist/antd.css';

const { Meta } = Card;

export default function Products() {

    const [loading, setLoading] = useState(false)
    let [count1, setcount1] = useState(0)
    let [count2, setcount2] = useState(0)
    let [count3, setcount3] = useState(0)

    const addproduct = (e) => {
        setcount1(++count1);
    }


    return (
        <MenuBar>
            <Row>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src={require('../../assets/images/bakery1.jpg')}
                                style={{ height: '150px' }}
                            />
                        }
                        style={{ width: 300, margin: 'auto' }}
                        actions={[
                            <Icon type="plus" key="edit" onClick={(e) => addproduct(e)} />,
                            <Icon type="minus" key="ellipsis" />,
                            count1,
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src={require('../../assets/images/bakery2.jpg')}
                                style={{ height: '150px' }}

                            />
                        }
                        style={{ width: 300, margin: 'auto' }}
                        actions={[
                            <Icon type="plus" key="edit" />,
                            <Icon type="minus" key="ellipsis" />,
                            count2,
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src={require('../../assets/images/bakery3.jpg')}
                                style={{ height: '150px' }}

                            />
                        }
                        style={{ width: 300, margin: 'auto' }}
                        actions={[
                            <Icon type="plus" key="edit" />,
                            <Icon type="minus" key="ellipsis" />,
                            count3,
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col>
            </Row>
        </MenuBar >
    )
}