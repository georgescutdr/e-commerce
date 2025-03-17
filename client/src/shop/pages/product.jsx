import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
//import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Fade from 'react-bootstrap/Fade'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ProductImages } from './components/product-images'
import { ProductAttributes } from './components/product-attributes'
import { ProductOptions } from './components/product-options'
import { ProductReviewsWidget } from './components/product-reviews-widget'
import { ProductReviews } from './components/product-reviews'
import { ProductPrice } from './components/product-price'
import { ProductPromotions } from './components/product-promotions'
import { Breadcrumbs } from './components/breadcrumb'
import { computePrice } from '../../utils'
import { Button } from 'primereact/button'
import { Rating } from 'primereact/rating'
import { parseAttributes, parseOptions, parseImages, parsePromotions } from '../../utils'

export const Product = () => {
    const serverUrl = 'http://localhost:3001'
    const getProductUrl = serverUrl + '/api/get-product-all'

    const [product, setProduct] = useState(0)
    const [options, setOptions] = useState([])
    const [attributes, setAttributes] = useState([])
    const [images, setImages] = useState([])
    const [promotions, setPromotions] = useState([])
    const [newPrice, setNewPrice] = useState(0)
    const [breadcrumb, setBreadcrumb] = useState({})
    const [rating, setRating] = useState(0)

    let navigate = useNavigate();
    let params = useParams()

    let productId=0

    //get product
    useEffect(() => {
        Axios.get(getProductUrl, {params: {slug: params.product}}).then((result) => {
            console.log(result.data[0])
            let productObj = result.data[0]

            const imgs = parseImages(result.data[0].images)
            const attr = parseAttributes(result.data[0].attributes)
            const opt = parseOptions(result.data[0].options)
            const promos = parsePromotions(result.data[0].promotions)

            //compute new price according to promotions
            let price = computePrice(result.data[0].price, promos)

            setImages(imgs)
            setAttributes(attr)
            setOptions(opt)
            setPromotions(promos)
            setProduct(result.data[0])
            setRating(result.data[0].rating)
            setNewPrice(price)
            setBreadcrumb({
                category: params.category, 
                subcategory: params.subcategory, 
                brand: result.data[0].brand
            })
        })
    }, [])

    return (
        <Stack gap={3}>
            <div className="p-2">
                <Breadcrumbs params={ breadcrumb } />
            </div>
            <div className="p-2">
                <h1>{ product.brand + ', ' + product.name }</h1>
            </div>
            <div className="p-2">
                <Stack direction="horizontal" gap={3}>
                    <div className="p-2">
                        <ProductImages images={ images } productId={ product.id } />
                    </div>
                    <div className="p-2">
                        <Stack gap={3}>
                            <div className="p-2">
                                <Rating value={ rating } readOnly cancel={false} />
                            </div>
                            <div className="p-2">
                                { product.description }
                            </div>
                            <div className="p-2">
                                <ProductOptions productOptions={ options } />
                            </div>
                        </Stack>
                    </div>
                    <div className="p-2">
                        <Stack gap={3}>
                            <div className="p-2">
                                <ProductPrice price={ product.price } newPrice={ 70 } />
                            </div>
                            <div className="p-2">
                                <ProductPromotions promotions={ promotions } />
                            </div>
                            <div className="p-2">
                                <Button label="Order now" />
                             </div>
                        </Stack>
                    </div>
                </Stack>
            </div>
            <div className="p-2">
                <ProductAttributes attributes={ attributes } />
            </div>
            <div className="p-2">
               <ProductReviews productId={ product.id } />
            </div>
        </Stack>
    )
}
