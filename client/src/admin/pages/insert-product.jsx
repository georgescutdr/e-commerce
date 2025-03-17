import React, { useState, useEffect } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Stack from 'react-bootstrap/Stack';
import { ProductFeatures } from '../components/product-features'
import { ProductForm } from '../form/product-form'

export const InsertProduct = () => {
    
    let navigate = useNavigate();
    let params = useParams()

    let pageTitle = params.productId ? 'Edit Product' : 'Insert Product'

    //product options

    return (
        <>
            <h1>{ pageTitle }</h1>
            { params.productId ? <ProductFeatures id={params.productId} /> : <ProductForm /> }
        </>
    )
}
