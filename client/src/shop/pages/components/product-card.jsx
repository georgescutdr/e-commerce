import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button'
import { Card } from 'primereact/card'
import { ProductPrice } from './product-price'
import { AddToCartBtn } from './add-to-cart-btn'
import '../../shop.css'

export const ProductCard = ({item, params}) => {
    const serverUrl = 'http://localhost:3001'

    let navigate = useNavigate();

    const productUrl = '/browse/' + params.category + '/' + params.subcategory + '/' + item.slug

    const promotion = '-30%'

    const header = (
        <>
            <img alt="Card" src={ '/uploads/product/' + item.id + '/' + item.thumb } />
            {promotion && (
                <div class="card-promotion">
                    { promotion }
                </div>
            )}
        </>

    )

    const footer = (
        <>
            <AddToCartBtn id={ item.id } />
        </>
    )

    const title = (
        <a href={ productUrl }>{ item.name }</a>
    )

    return (
        <Card 
            title={ title } 
            subTitle={<ProductPrice price={ item.price } 
            newPrice={ item.new_price }/>} 
            footer={ footer } 
            header={ header } 
            className="md:w-25rem product-card"
            >
            <p className="m-0">
            </p>
        </Card>
    )
}
