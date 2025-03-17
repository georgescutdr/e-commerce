import React, { useState, useEffect } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BrandSelect } from '../components/brand-select'
import { CategorySelect } from '../components/category-select'
import { ItemsGrid } from '../components/items-grid'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

export const ProductsPage = () => {
    const serverUrl = 'http://localhost:3001'
    const insertProductUrl = serverUrl + '/api/insert-product'
    const editProductUrl = serverUrl + '/api/edit-product'
    const deleteProductUrl = serverUrl + '/api/delete-product'
    const getProductsUrl = serverUrl + '/api/get-products'
    const getCategoriesUrl = serverUrl + '/api/get-categories'

    const [productsList, setProductsList] = useState([])
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])

    let navigate = useNavigate();

    //get all products
    useEffect(() => {
        Axios.get(getProductsUrl, {params: {categoryId: category}}).then((result) => {
            console.log(result.data)
            setProductsList(result.data)
        })
    }, [category])

    return (
      <>
        <div className="">
          <h1>Products</h1>
        </div>
        <Button variant="primary" size="bg" onClick={() => { navigate('/admin/insert-product')}}> Add new </Button>
        <CategorySelect stateChanger={ setCategory }/>
        <BrandSelect stateChanger={ setBrand }/>
        <div className="">
          <ItemsGrid items={ productsList } rowItems={6} cardType="buttons" />
        </div>
      </>
      )
}
