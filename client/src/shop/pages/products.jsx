import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Fade from 'react-bootstrap/Fade'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ItemsGrid } from './components/items-grid'
import { Breadcrumbs } from './components/breadcrumb'

export const Products = () => {
    const serverUrl = 'http://localhost:3001'
    const getProductsUrl = serverUrl + '/api/get-products'
    const getCategoryUrl = serverUrl + '/api/get-category'

    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])

    let navigate = useNavigate();
    let params = useParams()

    //get subcategory
    useEffect(() => {
        Axios.get(getCategoryUrl, {params: {slug: params.subcategory}}).then((result) => {
            setCategory(result.data[0])
        })
    }, [])

    //get products
    useEffect(() => {
        if(category) {
            Axios.get(getProductsUrl, {params: {categoryId: category.id}}).then((result) => {
                console.log(result)
                setProducts(result.data)
            })
        }
    }, [category])

    return (
        <div className="">
            <Breadcrumbs params={ params } />
            <div className="">
                <h1>{ category.name }</h1>
                <div className="description">
                    { category.description }
                </div>
                <Container fluid="md">
                    <ItemsGrid items={ products } rowItems="6" params={ params } />
                </Container>
            </div>
        </div>
    )
}
