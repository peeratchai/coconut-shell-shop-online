import React, { useState, useEffect, Fragment } from 'react';
import { db } from '../../config/config';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import MenuBar from '../../components/MenuBar/MenuBar'
import { connect } from 'react-redux'


function History(props) {

    const [initLoading, setInitLoading] = useState(false);
    let [numOfCart, setNumOfCart] = useState(0);

    useEffect(() => {
        let itemsRef = db.ref('/Orders/');
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val()
            console.log("data" + JSON.stringify(data))

            let temp_data = [];
            data && data.map((data) => {
                console.log(data.cart.create_date)

            })

            let date;
            let date_array = [];
            temp_data = data.reduce((r, a) => {
                date = a.cart.create_date.split(",");
                (r[date[0]] = r[date[0]] || []).push(a.cart)
                return r
            }, []);
            date_array = data.reduce((r, a) => {
                date = a.cart.create_date.split(",");
                r.push(date[0])
                return r
            }, []);

            date_array = date_array.filter((val, id, array) => array.indexOf(val) == id);

            console.log(temp_data)
            console.log(date_array)

        });
    }, [])


    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Age", dataIndex: "age", key: "age" },
        { title: "Address", dataIndex: "address", key: "address" },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () => <a>Delete</a>
        }
    ];

    const columns2 = [
        { title: "No", dataIndex: "no", key: "name" },
        { title: "Product Name", dataIndex: "name", key: "age" },
        { title: "Qty", dataIndex: "qty", key: "address" },
        { title: "Price", dataIndex: "price", key: "address" },
    ];

    const data2 = [
        {
            key: 1,
            no: 1,
            name: "John Brown",
            qty: 32,
            price: 333,
        },
        {
            key: 2,
            no: 2,
            name: "John Brown",
            qty: 44,
            price: 333,
        },
        {
            key: 3,
            no: 3,
            name: "John Brown",
            qty: 5,
            price: 333,
        },
    ];


    const data = [
        {
            key: 1,
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            description: <div><Table
                columns={columns2}
                dataSource={data2}
                pagination={false}
            /><div style={{ textAlign: 'right', padding: '10px', right: '20px' }}>totle: 5</div></div>
        },
        {
            key: 2,
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            description:
                "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park."
        },
        {
            key: 3,
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            description:
                "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park."
        }
    ];

    return (
        <MenuBar title="Cart">
            <Table
                columns={columns}
                expandedRowRender={(record) => (
                    <p style={{ margin: 0 }}>{record.description}</p>
                )}
                dataSource={data}
            />,
        </MenuBar >
    )
}


const mapStateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(History)