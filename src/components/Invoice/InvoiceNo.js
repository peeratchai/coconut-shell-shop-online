import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment/moment.js'

const styles = StyleSheet.create({
    invoiceNoContainer: {
        marginTop: 36,
        width: '100%',
    },
    title: {
        fontSize: 18,
    },
    invoiceTitleLeft: {
        float: 'left',
        width: '50%',
    },
    invoiceTitleRight: {
        position: 'absolute',
        right: 0,
        textAlign: 'right',
        width: '50%',
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    }

});


const InvoiceNo = ({ invoice }) => (
    <Fragment>
        <View style={styles.invoiceNoContainer} style={{ borderColor: 'black', borderBottomWidth: 1, }}>
            <View style={styles.invoiceTitleLeft}>
                <View>
                    <Text style={styles.title}>Bakery Home</Text>
                </View>
                <View>
                    <Text>
                        Address : 1518 Pracharat 1 Road,Wongsawang, Bangsue, Bangkok 10800 Thailand.
                    </Text>
                </View>

            </View >
            <View style={styles.invoiceTitleRight}>
                <View>
                    <Text style={styles.title}>Tax invoice/ Receipt</Text>
                </View>
                <View>
                    <Text>
                        Copy
                    </Text>
                </View>
            </View >
        </View>

        <View style={styles.invoiceNoContainer} style={{ marginTop: '10px', fontSize: 10 }}>
            <View style={styles.invoiceTitleLeft}>
                <View>
                    <Text>Customer No : C001</Text>
                </View>
                <View>
                    <Text>Customer Name : BBK Co., Ltd.</Text>
                </View>
                <View>
                    <Text>
                        Customer Address : 99 Moo 7, Tambon Thalingchun, Amphoe Mueang Saraburi, Saraburi 18000.
                    </Text>
                </View>
                <View>
                    <Text>
                        Phone : 0811448167, Fax : -
                    </Text>
                </View>

            </View >
            <View style={styles.invoiceTitleRight}>
                <View>
                    <Text>Document No : C001</Text>
                </View>
                <View>
                    <Text>Date : {moment().format("DD MMM YYYY")}</Text>
                </View>
                <View>
                    <Text>
                        Due date : {moment().add(7, 'day').format('DD MMM YYYY')}
                    </Text>
                </View>
            </View >
        </View>
        {/* <Text >Invoice No: {invoice.invoice_no}</Text> */}

    </Fragment>
);

export default InvoiceNo