import React, { useState, useEffect } from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';

export const CarouselItems = (items) => {
    const serverUrl = 'http://localhost:3001'
    const getCategoriesUrl = serverUrl + '/api/get-categories'

    const [categoriesList, setCategoriesList] = useState([])
    const [categoryId, setCategoryId] = useState(0)

    const listItems = items.length > 0 ? items.map(item => (
            <Carousel.Item>
                <Carousel.Caption>
                    <h3>{ item.name }</h3>
                    <p>{ item.description }</p>
                </Carousel.Caption>
            </Carousel.Item>
        )) : '';

    return (
        <Carousel>
            { listItems }
        </Carousel>
    )
}
