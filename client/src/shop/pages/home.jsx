import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { CarouselItems } from '../../components/carousel-items'


export const Home = () => {
    const serverUrl = 'http://localhost:3001'
    const getProductsUrl = serverUrl + '/api/get-products'
    const getProductPromotionsUrl = serverUrl + '/api/get-product-promotions'

    const [productsList, setProductsList] = useState([])
    const [promotions, setPromotions] = useState([])

    let navigate = useNavigate();

    //get all products
    useEffect(() => {
        //setFadeSpinner(true)
        Axios.get(getProductPromotionsUrl).then((result) => {
            setPromotions(result.data)
        })
    }, [])

    //get all products
    useEffect(() => {
        //setFadeSpinner(true)
        Axios.get(getProductsUrl).then((result) => {
            setProductsList(result.data)
        })
    }, [])

    return (
      <>
        <Stack gap={3}> 
            <CarouselItems items={ productsList } />
        </Stack>
      </>
    )
}
