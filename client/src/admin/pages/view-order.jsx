import React, { useState, useEffect } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'

export const ViewOrder = (route) => {
    const serverUrl = 'http://localhost:3001'
    const getOrderUrl = serverUrl + '/api/get-orders'

    const [order, setOrder] = useState([])

    let navigate = useNavigate();
    let params = useParams()

    useEffect(() => {
        if(params.orderId > 0) {
            Axios.get(getOrderUrl, {params: {id: params.orderId}}).then((result) => {
                console.log(result.data[0])
                setOrder(result.data[0])
           }) 
        }
    }, [])

    return (
        <div className="">
            <div className="">
                <h1>View order</h1>
            </div>
            <div className="">
                <h3>Billing information</h3>
            </div>
            <div>
                <Table striped bordered hover>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>Currency</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>Zip</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="">
                <h3>Shipping information</h3>
            </div>
            <div>
                <Table striped bordered hover>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Address line 2</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Carrier</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Shipping cost</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Estimated date of arrival</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Instructions</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Shipping method</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Zip</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                        <tr>
                            <td>Tracking number</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
