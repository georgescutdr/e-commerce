import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BrandSelect } from '../components/brand-select'
import { CategorySelect } from '../components/category-select'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { Toast } from 'primereact/toast'
import { useLocation } from 'react-router'

export const ProductList = ({items}) => {
    const serverUrl = 'http://localhost:3001'
    const insertProductUrl = serverUrl + '/api/insert-product'
    const editProductUrl = serverUrl + '/api/edit-product'
    const deleteProductUrl = serverUrl + '/api/delete-product'
    const getProductsUrl = serverUrl + '/api/get-products'
    const getCategoriesUrl = serverUrl + '/api/get-categories'

    const [productsList, setProductsList] = useState([])
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])

    const toast = useRef(null)

    let navigate = useNavigate()
    let location = useLocation()

    const showSuccess = (message) => {
        toast.current.show({severity:'success', summary: 'Success', detail: message, life: 3000})
    }

    const deleteProduct = (product) => {
        Axios.post(deleteProductUrl, {
            id: id 
        }).then((result) => {
            toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'The product with the name "' + product.name + '" was deleted successfully', life: 3000 })
            
            const newProductsList = productsList.filter((item) => item.id !== product.id)
            setProductsList(newProductsList)
        })
    }

    const confirm = (event, item) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to delete the product with the name "' + item.name + '"?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteProduct(item),
            reject: () => {}
        });
    }

    const listProducts = items.length > 0 ? items.map(product => (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <a href={ '/admin/edit-product/' + product.id} >
                    <Card.Title>{ product.name }</Card.Title>
                </a>
                <Card.Text>
                { product.price }
                </Card.Text>
                <Button variant="secondary" href={ '/admin/edit-product/' + product.id }>Edit</Button>
                <Button variant="danger" onClick={() => confirm(product) }>Delete</Button>
            </Card.Body>
        </Card>
        )) : [];

    return (
      <>
        <Container fluid="md">
            { listProducts }
        </Container>
      </>
      )
}
