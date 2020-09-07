import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import { Row, Col, Card, Avatar, Skeleton, List, Icon } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { addProduct } from '../../redux/actions'
import { products_list } from '../../contents/Contents'

const { Meta } = Card;

function Carts({ dispatch }) {

    const [initLoading, setInitLoading] = React.useState(false);
    let [numOfCart, setNumOfCart] = React.useState(0);
    let [count, setcount] = useState({
        type1: 0,
        type2: 0,
        type3: 0
    })

    const list = products_list

    const add_product = (type) => {

        addproduct_check_numOfCart(type);

        setcount({
            ...count,
            [type]: count[type] += 1,
        })
    }

    const addproduct_check_numOfCart = (type) => {
        if (count[type] == 0) {
            let num = numOfCart + 1
            setNumOfCart(num)
            dispatch(addProduct(num))
        }
    }

    const delete_product = (type) => {

        if (count[type] > 0) {
            setcount({
                ...count,
                [type]: count[type] -= 1,
            })
            deleteproduct_check_numOfCart(type);

        }
    }

    const deleteproduct_check_numOfCart = (type) => {
        if (count[type] == 0) {
            console.log(count[type])
            let num = numOfCart - 1
            setNumOfCart(num)
            dispatch(addProduct(num))
        }
    }


    return (
        <MenuBar title="Cart">
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<Icon type="plus" key="edit" onClick={(e) => add_product('type1')} />,
                        <Icon type="minus" key="ellipsis" onClick={(e) => delete_product('type1')} />]}
                    >
                        <Skeleton avatar title={false} loading={false} active>
                            <List.Item.Meta
                                avatar={
                                    <img width={100} alt="logo" src={require('../../assets/images/bakery1.jpg')} />
                                }
                                title={<a href="">item.name</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div>total : {item.count}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </MenuBar >
    )
}


const mapStateToProps = state => ({
    cart: state.cart
})


export default connect(mapStateToProps)(Carts)