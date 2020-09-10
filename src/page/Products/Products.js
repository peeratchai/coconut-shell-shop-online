import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import { Row, Col, Card, InputNumber, Skeleton, Icon } from 'antd';
import 'antd/dist/antd.css';
import { addProduct, addProductToCart, addTotal } from '../../redux/actions'
import { connect } from 'react-redux'
import return_image from '../../services/image'
import './Products.css'
const { Meta } = Card;

function Products(props) {

    const [loading, setLoading] = useState(false)

    let [product, setProduct] = useState(props.cart.Cart);

    const onchange_product_count = (id, value) => {
        if (value >= 0) {
            let product_count = value;
            console.log(value)
            console.log(product[id].count)

            let sum_price_of_product = 0;
            let dif_count = 0;
            if (product_count == 0 && product[id].count > 0) {
                let num = props.cart.Num_of_Products - 1
                props.addProduct(num)
            }
            if (product_count > 0 && product[id].count == 0) {
                let num = props.cart.Num_of_Products + 1
                props.addProduct(num)
            }

            if (product_count > product[id].count) {
                dif_count = product_count - product[id].count
                sum_price_of_product = product[id].price * dif_count
                let total = props.cart.Total + sum_price_of_product
                console.log(total)
                props.addTotal(total)
            } else {
                dif_count = product[id].count - product_count
                sum_price_of_product = product[id].price * dif_count
                let total = props.cart.Total - sum_price_of_product
                console.log(total)
                props.addTotal(total)
            }
            let temp_product = product
            temp_product[id].count = product_count
            setProduct({
                ...product,
                [id]: temp_product[id]
            })
        }
    }

    const add_product = (id) => {
        if (product[id].count == 0) {
            let num = props.cart.Num_of_Products + 1
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

    // console.log(props.cart.Num_of_Products)

    return (
        <MenuBar title="Products" >
            <Row>
                {props.cart.Cart.map((product) => {
                    let description = <div>{product.detail}<br />ราคา :{product.price}</div>
                    return (
                        <Col span={8} style={{ marginBottom: "25px" }}>
                            <Card
                                cover={
                                    <img
                                        alt="example"
                                        src={return_image(product.name)}
                                        style={{ height: '150px' }}
                                    />
                                }
                                style={{ width: 300, margin: 'auto' }}
                                actions={[
                                    <Icon id={product.id_name_eng} type="plus" key="edit" onClick={() => add_product(product.id)} />,
                                    <Icon type="minus" key="ellipsis" onClick={() => delete_product(product.id)} />,
                                    <InputNumber value={product.count} min={0} onChange={(value) => onchange_product_count(product.id, value)} />,
                                ]}
                            >
                                <Skeleton loading={loading} avatar active>
                                    <Meta
                                        title={product.name}
                                        description={description}
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