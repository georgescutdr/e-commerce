import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Axios from 'axios'
import Form from 'react-bootstrap/Form';

export const ProductPromotions = ({id}) => {
  const serverUrl = 'http://localhost:3001'
  const deletePromotionUrl = serverUrl + '/api/delete-product-promotion'
  const insertPromotionUrl = serverUrl + '/api/insert-product-promotion'
  const getPromotionsUrl = serverUrl + '/api/get-promotions'

  const [promotions, setPromotions] = useState(0)

  //get product attributes
  useEffect(() => {
    Axios.get(getPromotionsUrl, {params: {productId: id}}).then((result) => {
    // console.log(result.data)
      setPromotions(result.data)
            
    })
  }, [])

  const handleOptionChange = (target) => {
    const url = target.checked ? insertPromotionUrl : deletePromotionUrl

    Axios.post(url, {promotionId: target.value, productId: id}).then((result) => {
    // console.log(result.data)
     // setOptions(result.data)
            
    })
  }

  const listItems = promotions.length > 0 ? promotions.map(item => (
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

