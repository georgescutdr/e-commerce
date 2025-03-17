import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Axios from 'axios'
import { Dropdown } from 'primereact/dropdown'

export const BrandSelect = ({brand, stateChanger}) => {
  const serverUrl = 'http://localhost:3001'
  const getBrandsUrl = serverUrl + '/api/get-brands'

  const [brands, setBrands] = useState([])

  //get product reviews
  useEffect(() => {
    Axios.get(getBrandsUrl).then((result) => {
       var data = result.data
       var brandsArray = []

      data.forEach((item) => {
          brandsArray.push({name: item.name, code: item.id})
      })
    
      setBrands(brandsArray)
    })
  }, [])

  return (
    <Dropdown value={ brand } onChange={(e) => stateChanger(e.value)} options={ brands } optionLabel="brand" 
                placeholder="Select a Brand" className="w-full md:w-14rem" />
  )
}

