import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import { CategorySelect } from '../components/category-select'
import { BrandSelect } from '../components/brand-select'
import { ProductFeatures } from '../components/product-features'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router"
import { Editor } from 'primereact/editor'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import Spinner from 'react-bootstrap/Spinner'
import { IconField } from "primereact/iconfield"
import { InputIcon } from "primereact/inputicon"
import 'primeicons/primeicons.css'


const ProductForm = ({product, id}) => { //implement product
    const serverUrl = 'http://localhost:3001'
    const insertProductUrl = serverUrl + '/api/insert-product'
    const generateDescriptionUrl = serverUrl + '/api/generate-description'

    const [category, setCategory] = useState(0)
    const [brand, setBrand] = useState(0)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [description, setDescription] = useState('')
    const [productAttribute, setProductAttribute] = useState('')
    const [qty, setQty] = useState('')
    const [visible, setVisible] = useState(true)
    const [spinner, setSpinner] = useState(false)

    let navigate = useNavigate();

    const submitProduct = () => {
        let url = id ? updateProductUrl : insertProductUrl

        Axios.post(url, {
            id: product.id,
            name: name,
            brand: brand,
            category: subcategory, 
            description: description,
            price: price,
            newPrice: newPrice,
            qty: qty
        }).then((result) => {
           if(!id) {
               navigate("/admin/edit-product/" + result.insertId);
           } else {
              //display alert 
           }
        })
    }

    useEffect(() =>{
            setName(product.name)
            setCategory(product.category_id)
            setBrand({name: product.brand, code: product.brand_id})
            setPrice(product.price)
            setNewPrice(product.new_price)
            setDescription(product.description)
            setQty(product.qty)
            setVisible(product.visible)
    }, [product])

    const generateDescription = async () => {
        setSpinner(true)

        Axios.post(generateDescriptionUrl, {title: name, brand: brand.code}).then((result) => {
            setSpinner(false)
            setDescription(result.data)
        })
    }

    return (
        <Stack gap={3}> 
                <div className="card flex justify-content-center">
                    <FloatLabel>
                        <InputText id="name" value={ name } onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Name</label>
                    </FloatLabel>
                </div>
                <CategorySelect stateChanger={ setCategory } type="children" />
                { id && (
                    <>
                    <div className="card flex justify-content-center">
                        <BrandSelect brand={ brand } stateChanger={ setBrand } />
                    </div>
                    <div className="card flex justify-content-center">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-dollar"> </InputIcon>
                            <InputText id="price" value={ price } onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                        </IconField>
                    </div>
                    <div className="card flex justify-content-center">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-dollar"> </InputIcon>
                            <InputText id="newPrice" value={ newPrice } onChange={(e) => setNewPrice(e.target.value)} placeholder="New price" />
                        </IconField>
                    </div>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <InputText id="qty" value={ qty } onChange={(e) => setQty(e.target.value)} />
                            <label htmlFor="qty">Quantity</label>
                        </FloatLabel>
                    </div>
                    <div className="card flex justify-content-center">
                        <Editor value={ description } placeholder="Product description" onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '320px' }} />
                        <Button variant="primary" onClick={() => generateDescription()} disabled={ spinner }>{ spinner ? <Spinner animation="border" style={{width: '20px', height:'20px'}} /> : 'Generate description' }</Button>
                    </div>
                    <div className="card flex justify-content-center">
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Visible in shop"
                            onChange={(e) => setVisible(e.target.checked)}
                            checked={ visible }
                        />
                    </div>
                    </>
                )}
                
                <Form.Group className="mb-3">
                    <Stack direction="horizontal" gap={3}>
                        <Button variant="primary" size="lg" onClick={() => { submitProduct()}}> Save </Button>
                        <Button variant="secondary" size="lg" onClick={() => navigate('/admin/products')}> Back </Button>
                        { 
                            id && 
                            <Button variant="danger" label="Delete" onClick={() => deleteProduct(product.id)}>Delete</Button>
                        }
                    </Stack>
                </Form.Group>
            </Stack>
  )
}

export default Productform