import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Axios from 'axios'
import { Dropdown } from 'primereact/dropdown'

export const ShippingTable = ({order}) => {

  return (
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
                            <td>{ order.shipping_address }</td>
                        </tr>
                        <tr>
                            <td>Address line 2</td>
                            <td>{ order.shipping_address_line2 }</td>
                        </tr>
                        <tr>
                            <td>Carrier</td>
                            <td>{ order.shipping_carrier }</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{ order.shipping_city }</td>
                        </tr>
                        <tr>
                            <td>Shipping cost</td>
                            <td>{ order.shipping_cost }</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{ order.shipping_country }</td>
                        </tr>
                        <tr>
                            <td>Estimated date of arrival</td>
                            <td>{ order.expected_delivery_date }</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{ order.shipping_email }</td>
                        </tr>
                        <tr>
                            <td>Instructions</td>
                            <td>{ order.shipping_instructions }</td>
                        </tr>
                        <tr>
                            <td>Shipping method</td>
                            <td>{ order.shipping_method_id }</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{ order.shipping_phone }</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{ order.shipping_state }</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{ order.status }</td>
                        </tr>
                        <tr>
                            <td>Zip</td>
                            <td>{ order.shipping_zip }</td>
                        </tr>
                        <tr>
                            <td>Tracking number</td>
                            <td>{ order.shipping_name }</td>
                        </tr>
                    </tbody>
                </Table>    
  )
}

