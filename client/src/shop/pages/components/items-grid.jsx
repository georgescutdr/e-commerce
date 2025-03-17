import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ProductCard } from './product-card'


export const ItemsGrid = ({items, rowItems, params}) => { // type = db table
    const serverUrl = 'http://localhost:3001'

    const [fadeSpinner, setFadeSpinner] = useState(false)

    let navigate = useNavigate();

    const numberOfRows = parseInt(Math.ceil(items.length / rowItems))

    const gridItems = numberOfRows > 0 ? Array(numberOfRows).fill().map((_, rowIndex) => (
        <Row key={rowIndex} xs="2" sm="4" lg="6">
         {
           items.slice(rowIndex * rowItems, (rowIndex * rowItems) + rowItems).map((item, colIndex) => (
            <Col xs="12" sm="4" key={colIndex}>
                <ProductCard item={ item } params={ params } />
            </Col>
          ))}
        </Row>
    )) : ''

    return (
        <div className="select items list">
            <Fade in={fadeSpinner}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Fade>
            <Container>
                { gridItems }
            </Container>
        </div>
    )
}
