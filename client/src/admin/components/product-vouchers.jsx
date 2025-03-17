import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Axios from 'axios'
import Form from 'react-bootstrap/Form';

export const ProductVouchers = ({id}) => {
  const serverUrl = 'http://localhost:3001'
  const deleteVoucherUrl = serverUrl + '/api/delete-product-voucher'
  const insertVoucherUrl = serverUrl + '/api/insert-product-voucher'
  const getVouchersUrl = serverUrl + '/api/get-vouchers'

  const [vouchers, setVouchers] = useState(0)

  //get product attributes
  useEffect(() => {
    Axios.get(getVouchersUrl, {params: {productId: id}}).then((result) => {
    // console.log(result.data)
      setVouchers(result.data)
            
    })
  }, [])

  const handleOptionChange = (target) => {
    const url = target.checked ? insertVoucherUrl : deleteVoucherUrl

    Axios.post(url, {voucherId: target.value, productId: id}).then((result) => {
    // console.log(result.data)
     // setOptions(result.data)
            
    })
  }

  const listItems = vouchers.length > 0 ? vouchers.map(item => (
    <tr key={ item.id }>
        <td>{ item.name }</td>
        <td>
          <Form.Check type="switch" id="custom-switch" value={ item.id } onChange={(e) => handleOptionChange(e.target)} />
        </td>
    </tr>
  )) : '';

  return (
    <Table striped bordered hover>
      <thead>
      </thead>
      <tbody>
        { listItems }
      </tbody>
    </Table>
  )
}

