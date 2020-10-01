import React, { useState, useEffect, Fragment } from 'react';
import { db } from '../../config/config';
import 'antd/dist/antd.css';
import { Table, Spin } from 'antd';
import MenuBar from '../../components/MenuBar/MenuBar'
import { connect } from 'react-redux'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function History(props) {

    const [initLoading, setInitLoading] = useState(true);
    let [data_table_sub1, setData_table_sub1] = useState([]);
    let [numOfCart, setNumOfCart] = useState(0);

    useEffect(() => {
        let itemsRef = db.ref('/Orders/');
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val()
            // console.log("data" + JSON.stringify(data))

            let temp_data = [];
            data && data.map((data) => {
                // console.log(data.cart.create_date)
            })
            let data_table_sub1 = [];
            let data_table_sub2 = [];
            let date;
            let datetime = [];
            let date_array = [];
            let dateTime_array = [];
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

            dateTime_array = data.reduce((r, a) => {
                date = a.cart.create_date.split(",");
                datetime = a.cart.create_date;
                (r[date[0]] = r[date[0]] || []).push(datetime)
                return r
            }, []);

            console.log('dateTime_array', dateTime_array)

            date_array = date_array.filter((val, id, array) => array.indexOf(val) == id);
            const columns = [
                { title: "No", dataIndex: "no", key: "no" },
                { title: "Product Name", dataIndex: "name", key: "name" },
                { title: "QTY", dataIndex: "qty", key: "qty" },
            ];

            let temp_data_source = [];
            date_array && date_array.map((date) => {
                let count_date = 1;
                data_table_sub2[date] = temp_data[date].map((data) => {
                    temp_data_source = [];
                    let count = 1;
                    Object.keys(data).map((productName) => {
                        if (productName != 'create_date' && productName != 'total') {
                            temp_data_source.push({ no: count, name: productName, qty: data[productName] })
                            count++;
                        }
                    })
                    console.log('temp_data_source->', temp_data_source)

                    return (
                        <Panel header={count_date + " : " + dateTime_array[date][count_date - 1]} key={count_date++}>
                            <div style={{ width: '100%', position: 'relative' }}>
                                <Table
                                    columns={columns}
                                    dataSource={temp_data_source}
                                    pagination={false}
                                />
                                <div style={{ padding: '20px', position: 'relative', textAlign: 'right' }}>Total : {data.total} baht</div>
                            </div>
                        </Panel>
                    )
                })
            })

            let index = 1;
            if (date_array) {
                for (let i = date_array.length - 1; i >= 0; i--) {
                    data_table_sub1.push(
                        <Panel header={date_array[i]} key={index++}>
                            <Collapse>
                                {data_table_sub2[date_array[i]]}
                            </Collapse>
                        </Panel>
                    )
                }
            }



            setData_table_sub1(data_table_sub1)
            setInitLoading(false)
        });
    }, [])

    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        { title: "Product Name", dataIndex: "name", key: "name" },
        { title: "QTY", dataIndex: "qty", key: "qty" },
    ];

    const data = [
        {
            no: 1,
            name: "John Brown",
            qty: 32,

        },
        {
            no: 2,
            name: "Jim Green",
            qty: 42,
        },
        {
            no: 3,
            name: "Joe Black",
            qty: 32,
        }
    ];
    function callback(key) {
        console.log(key);
    }

    const text = `
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
      `;
    return (
        <MenuBar title="History">
            <Spin tip="Loading..." spinning={initLoading} style={{ marginTop: 60 }}>
                <Collapse onChange={callback}>
                    {data_table_sub1}
                </Collapse>
            </Spin>
        </MenuBar >
    )
}


const mapStateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(History)