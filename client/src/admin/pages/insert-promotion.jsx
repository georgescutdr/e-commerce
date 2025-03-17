import React, { useState, useEffect } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { PromotionForm } from '../form/promotion-form' 
import { ItemsGrid } from '../components/items-grid' 
import { CategorySelect } from '../components/category-select'
import { FileUploadForm } from '../form/file-upload-form'
import { ImageCard } from '../components/image-card' 

export const InsertPromotion = (route) => {
    const serverUrl = 'http://localhost:3001'
    const getProductsUrl = serverUrl + '/api/get-products'

    let navigate = useNavigate();
    let params = useParams()

    const [category, setCategory] = useState(0)
    const [products, setProducts] = useState([])
    const [promotion, setPromotion] = useState({})

    useEffect(() => {
        Axios.get(getProductsUrl, {params: {categoryId: category}}).then((result) => {
            setProducts(result.data)
        })
    }, [category])

    let pageTitle = params.promotionId ? 'Edit Promotion' : 'Insert Promotion'

    return (
        <div className="">
            <div className="">
                <h1>{ pageTitle }</h1>
                <PromotionForm id={ params.promotionId } setPromotion={ setPromotion } />
                
                <h2>Choose the products for this promotion</h2>
                <CategorySelect stateChanger={setCategory} type="children" />
                <ItemsGrid items={products} rowItems={6} type="promotion" id={params.promotionId } cardType="checkbox" />
            </div>
        </div>
    )
}


