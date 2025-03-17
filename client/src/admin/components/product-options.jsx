import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Axios from 'axios'
import Form from 'react-bootstrap/Form';

export const ProductOptions = ({id}) => {
  const serverUrl = 'http://localhost:3001'
  const deleteOptionUrl = serverUrl + '/api/delete-product-option'
  const insertOptionUrl = serverUrl + '/api/insert-product-option'
  const getOptionsUrl = serverUrl + '/api/get-options'

  const [options, setOptions] = useState(0)

  //get product attributes
  useEffect(() => {
    Axios.get(getOptionsUrl, {params: {productId: id}}).then((result) => {
    // console.log(result.data)
      setOptions(result.data)
            
    })
  }, [])

  const deleteAttribute = (id) => {
      
  }

  const handleOptionChange = (target) => {
    const url = target.checked ? insertOptionUrl : deleteOptionUrl

    Axios.post(url, {optionId: target.value, productId: id}).then((result) => {
    // console.log(result.data)
     // setOptions(result.data)
            
    })
  }

  const listItems = options.length > 0 ? options.map(item => (
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

