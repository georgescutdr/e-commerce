import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
import { Breadcrumbs } from './components/breadcrumb'
import { CategoryCard } from './components/category-card' 

export const Category = () => {
    const serverUrl = 'http://localhost:3001'
    const getCategoriesUrl = serverUrl + '/api/get-categories'
    const getCategoryUrl = serverUrl + '/api/get-category'

    const [category, setCategory] = useState(0)
    const [categories, setCategories] = useState([])

    let navigate = useNavigate();
    let params = useParams()

    const listSubcategories = categories.length ? categories.map((subcategory, index) => (
        <Row key={ subcategory.id }>
            <Col>
                <a href={ '/browse/' + category.slug + '/' + subcategory.slug }>
                    <CategoryCard category={ subcategory }/>
                </a>
            </Col>
        </Row>
    )) : []

    //get category
    useEffect(() => {
        Axios.get(getCategoryUrl, {params: {slug: params.category}}).then((result) => {
            setCategory(result.data[0])
        })
    }, [])

    //get subcategories
   useEffect(() => {
        Axios.get(getCategoriesUrl, {params: {parentId: category.id}}).then((result) => {
            setCategories(result.data)
        })
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
                    { listSubcategories }
                </Container>
            </div>
        </div>
    )
}
