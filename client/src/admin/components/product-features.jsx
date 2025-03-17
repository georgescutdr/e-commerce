import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ProductForm } from '../form/product-form'
import { ProductAttributes } from './product-attributes'
import { ProductReviews } from './product-reviews'
import { ProductOptions } from './product-options'
import { ProductVouchers } from './product-vouchers'
import { ProductPromotions } from './product-promotions'
import { ProductImages } from './product-images'
import { parseAttributes, parseOptions, parseImages, parsePromotions } from '../../utils'
//import { ProductImageUpload } from './product-image-upload'

export const ProductFeatures = ({id}) => {
  const serverUrl = 'http://localhost:3001'
  const getProductUrl = serverUrl + '/api/get-product-all'

  const [product, setProduct] = useState({})
  const [attributes, setAttributes] = useState([])
  const [options, setOptions] = useState([])
  const [reviews, setReviews] = useState([])
  const [images, setImages] = useState([])
  const [promotions, setPromotions] = useState([])

  useEffect(() => {
    Axios.get(getProductUrl, {params: {id: id}}).then((result) => {
      console.log(result.data)

      const imgs = parseImages(result.data[0].images)
      const attr = parseAttributes(result.data[0].attributes)
      const opt = parseOptions(result.data[0].options)
      const promos = parsePromotions(result.data[0].promotions)

      setImages(imgs)
      setAttributes(attr)
      setOptions(opt)
      setPromotions(promos)
      setProduct(result.data[0])
    })
  }, [])

  return (
    <Tabs
      defaultActiveKey="images"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="general" title="General">
        <h3>General</h3>
        <ProductForm product={ product } id={ product.id } />
      </Tab>
      <Tab eventKey="attributes" title="Attributes">
        <h3>Attributes</h3>
        <ProductAttributes items={ attributes } setItems={ setAttributes } id={ id } product={ product } />
      </Tab>
      <Tab eventKey="options" title="Options">
        <h3>Options</h3>
        <ProductOptions items={ options } id={ id } />
      </Tab>
      <Tab eventKey="reviews" title="Reviews">
        <h3>Reviews</h3>
        <ProductReviews id={ id } />
      </Tab>
      <Tab eventKey="images" title="Images">
        <h3>Images</h3>
        <ProductImages items={ images } productId={ id } />
      </Tab>
      <Tab eventKey="promotions" title="Promotions">
        <h3>Promotions</h3>
        <ProductPromotions items={ promotions } id={ id } />
      </Tab>
      <Tab eventKey="vouchers" title="Vouchers">
        <h3>Vouchers</h3>
        <ProductVouchers id={ id } />
      </Tab>
    </Tabs>  
  )
}

