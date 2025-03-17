import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import "primereact/resources/themes/lara-light-cyan/theme.css"

export const CategorySelect = ({type, category, stateChanger}) => {
  const serverUrl = 'http://localhost:3001'
  const getCategoriesUrl = serverUrl + '/api/get-categories'

  const [categories, setCategories] = useState([])

  //get categories
  useEffect(() => {
    Axios.get(getCategoriesUrl, {params: {type: type}}).then((result) => {
      setCategories(result.data)
            
    })
  }, [])

  const listItems = categories.length > 0 ? categories.map(item => (
    <option key={ item.id } value={ item.id } >
        { item.name }
    </option>
  )) : '';

  return (
    <Form.Select value={category} aria-label="Select Category" onChange={(e) => stateChanger(e.target.value)}>
      <option>Select category</option>
      { listItems }
    </Form.Select>
  )
}

