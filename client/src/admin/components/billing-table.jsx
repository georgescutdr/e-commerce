import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Axios from 'axios'
import { Dropdown } from 'primereact/dropdown'

export const BillingTable = ({billing}) => {

  return (
    <Table striped bordered hover>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{ order.billing_name }</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{ order.billing_email }</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{ order.billing_phone }</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{ order.billing_address }</td>
                        </tr>
                        <tr>
                            <td>Zip</td>
                            <td>{ order.billing_zip }</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{ order.billing_city }</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{ order.billing_state }</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{ order.billing_country }</td>
                        </tr>
                        <tr>
                            <td>Currency</td>
                            <td>{ order.billing_currency }</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{ order.billing_date }</td>
                        </tr>
                    </tbody>
                </Table>    
  )
}

