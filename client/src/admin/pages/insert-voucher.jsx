import React, { useState, useEffect } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { VoucherForm } from '../form/voucher-form' 
import { ItemsGrid } from '../components/items-grid' 
import { CategorySelect } from '../components/category-select'

export const InsertVoucher = (route) => {
    const serverUrl = 'http://localhost:3001'
    const getProductsUrl = serverUrl + '/api/get-products'

    let navigate = useNavigate();
    let params = useParams()

    const [category, setCategory] = useState(0)
    const [products, setProducts] = useState([])

    useEffect(() => {
        Axios.get(getProductsUrl, {params: {categoryId: category}}).then((result) => {
            setProducts(result.data)
        })
    }, [category])

    let pageTitle = params.voucherId ? 'Edit Voucher' : 'Insert Voucher'

    return (
        <div className="">
            <div className="">
                <h1>{ pageTitle }</h1>
                <VoucherForm id={ params.voucherId } />

                <h2>Choose the products for this voucher</h2>
                <CategorySelect stateChanger={setCategory} type="children" />
                <ItemsGrid items={products} rowItems={6} type="voucher" id={params.voucherId } cardType="checkbox" />
            </div>
        </div>
    )
}
