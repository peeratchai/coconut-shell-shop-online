import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import { Row, Col, Card, Avatar, Skeleton, Icon } from 'antd';
import 'antd/dist/antd.css';
import { addProduct, addProductToCart, addTotal } from '../../redux/actions'
import { connect } from 'react-redux'
const { Meta } = Card;

function Products(props) {

    const [loading, setLoading] = useState(false)

    let [product, setProduct] = useState(props.cart.Cart);

    const add_product = (id) => {
        if (product[id].count == 0) {
            let num = props.cart.Num_of_Products + 1
            console.log('num', num)
            props.addProduct(num)
        }
        let temp_product = product
        temp_product[id].count = temp_product[id].count + 1
        setProduct({
            ...product,
            [id]: temp_product[id]
        })
        let total = props.cart.Total + product[id].price
        props.addTotal(total)
        console.log('product', product)
    }


    const delete_product = (id) => {
        if (product[id].count > 0) {
            let temp_product = product
            temp_product[id].count = temp_product[id].count - 1
            setProduct({
                ...product,
                [id]: temp_product[id]
            })
            deleteproduct_check_numOfCart(id);
            let total = props.cart.Total - product[id].price
            props.addTotal(total)
        }
    }

    const deleteproduct_check_numOfCart = (id) => {
        if (product[id].count == 0) {
            let num = props.cart.Num_of_Products - 1
            props.addProduct(num)
        }
    }

    console.log(props.cart.Num_of_Products)

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
                                        title={product.name}
                                        description={product.detail}
                                    />
                                </Skeleton>
                            </Card>
                        </Col>
                    )
                })}

            </Row>
        </MenuBar >
    )
}


const mapStateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    addProduct: Num_of_Products => dispatch(addProduct(Num_of_Products)),
    addProductToCart: product => dispatch(addProductToCart(product)),
    addTotal: total => dispatch(addTotal(total))
})


export default connect(mapStateToProps, mapDispatchToProps)(Products)