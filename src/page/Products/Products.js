import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import { Row, Col, Card, Avatar, Skeleton, Icon } from 'antd';
import 'antd/dist/antd.css';
import { addProduct, addProductToCart } from '../../redux/actions'
import { connect } from 'react-redux'
const { Meta } = Card;

function Products(props) {

    const [loading, setLoading] = useState(false)
    let product = props.cart.Cart;



    const add_product = (id) => {
        addproduct_check_numOfCart(id);
    }

    const addproduct_check_numOfCart = (id) => {
        if (product[id].count == 0) {
            let num = props.cart.Num_of_Products + 1
            console.log('num', num)

            props.addProduct(num)
        }
        product[id].count += 1
        console.log('product', product)
        console.log(props.cart)
        props.addProductToCart(product)

    }

    const delete_product = (id) => {

        if (product[id].count > 0) {
            product[id].count -= 1
            deleteproduct_check_numOfCart(id);

        }
    }

    const deleteproduct_check_numOfCart = (id) => {
        if (product[id].count == 0) {
            let num = props.cart.Num_of_Products - 1
            props.addProduct(num)
        }
    }

    console.log(props.cart.Cart[0].img.toString())

    //Add images
    const products_images = (img) => {
        let require_path;
        switch (img) {
            case '../../assets/images/bakery1.jpg': require_path = require('../../assets/images/bakery1.jpg'); break;
            case '../../assets/images/bakery2.jpg': require_path = require('../../assets/images/bakery2.jpg'); break;
            case '../../assets/images/bakery3.jpg': require_path = require('../../assets/images/bakery3.jpg'); break;
            default: break;
        }
        return require_path;
    }

    return (
        <MenuBar title="Products" >
            <Row>
                {props.cart.Cart.map((product) => {
                    return (
                        <Col span={8}>
                            <Card
                                cover={
                                    <img
                                        alt="example"
                                        src={products_images(product.img)}
                                        style={{ height: '150px' }}
                                    />
                                }
                                style={{ width: 300, margin: 'auto' }}
                                actions={[
                                    <Icon type="plus" key="edit" onClick={(e) => add_product(product.id)} />,
                                    <Icon type="minus" key="ellipsis" onClick={(e) => delete_product(product.id)} />,
                                    product.count,
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
                    )
                })}
                {/* <Col span={8}>
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
                            <Icon type="plus" key="edit" onClick={(e) => add_product('type2')} />,
                            <Icon type="minus" key="ellipsis" onClick={(e) => delete_product('type2')} />,
                            count.type2,
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
                            <Icon type="plus" key="edit" onClick={(e) => add_product('type3')} />,
                            <Icon type="minus" key="ellipsis" onClick={(e) => delete_product('type3')} />,
                            count.type3,
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Skeleton>
                    </Card>
                </Col> */}
            </Row>
        </MenuBar >
    )
}


const mapStateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    addProduct: Num_of_Products => dispatch(addProduct(Num_of_Products)),
    addProductToCart: product => dispatch(addProductToCart(product))
})


export default connect(mapStateToProps, mapDispatchToProps)(Products)