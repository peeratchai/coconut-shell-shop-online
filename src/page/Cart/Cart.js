import React, { useState, useEffect, Fragment } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import { Row, Col, Card, Button, Skeleton, List, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { addProduct, addProductToCart, addTotal } from '../../redux/actions'
import { PDFViewer } from '@react-pdf/renderer'
import Invoice from '../../components/Invoice/Invoice'
import invoice2 from '../../contents/Invoice.json'
import moment from 'moment/moment.js'

const { Meta } = Card;

function Carts(props) {

    const [initLoading, setInitLoading] = useState(false);
    let [numOfCart, setNumOfCart] = useState(0);
    let [total, setTotal] = useState(props.cart.Total);
    let [product, setProduct] = useState(props.cart.Cart);
    let [visible, setVisible] = useState(false);
    let [invoice, setInvoice] = useState({
        id: "5f586c859f42da3cb8adb6bc",
        invoice_no: "1",
        trans_date: moment().format("DD MMM YYYY").toString(),
        items: []
    })

    // useEffect(() => {

    //     let total = 0;
    //     for (let i = 0; i < props.cart.Cart.length; i++) {
    //         total += props.cart.Cart[i].price * props.cart.Cart[i].count
    //         console.log(props.cart.Cart[i].price)

    //     }
    //     setTotal(total)
    // })

    console.log(invoice)
    console.log(invoice2)

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

        setTotal(total + product[id].price)
        props.addTotal(total + product[id].price)
        // console.log('product', product)
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

    const showModal = () => {
        setVisible(true)

        let cart = props.cart.Cart
        let temp_invoice_data = [];
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].count > 0) {
                temp_invoice_data[i] = {
                    sno: i + 1,
                    desc: cart[i].name,
                    qty: cart[i].count,
                    rate: cart[i].price
                }
            }
        }

        console.log(temp_invoice_data)

        setInvoice({
            ...invoice,
            items: temp_invoice_data
        })
    };

    const handleOk = () => {
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false)
    };


    return (
        <MenuBar title="Cart">
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={props.cart.Cart}
                renderItem={product => (
                    product.count > 0 ?
                        <List.Item
                            actions={[
                                <Icon type="plus" key="edit" onClick={(e) => add_product(product.id)} />,
                                <Icon type="minus" key="ellipsis" onClick={(e) => delete_product(product.id)} />
                            ]}
                        >
                            <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta
                                    avatar={
                                        <img width={100} alt="logo" src={products_images(product.img)} />
                                    }
                                    title={<a href="">{product.name}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                                <div>total : {product.count}</div>
                            </Skeleton>
                        </List.Item>
                        :
                        <div>

                        </div>
                )}
            >
                {
                    props.cart.Num_of_Products == 0 &&
                    <List.Item>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            No record.
                        </div>
                    </List.Item>
                }
                <List.Item>
                    <Skeleton avatar title={false} loading={false} active>
                        <List.Item.Meta />
                        <div style={{ marginRight: '20px' }}>total : {props.cart.Total} baht</div>
                        {
                            props.cart.Num_of_Products > 0 &&
                            <Button type="primary" onClick={() => showModal()}>
                                Order
                            </Button>
                        }
                    </Skeleton>
                </List.Item>
            </List>
            <Modal
                title="Your Order"
                visible={visible}
                onOk={() => handleOk()}
                onCancel={() => handleCancel()}
                width={'60vw'}
            >
                <Fragment >
                    <PDFViewer width="100%" height="600" className="app" >
                        <Invoice invoice={invoice} />
                    </PDFViewer>
                </Fragment>
            </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Carts)