import React, { useState, useEffect } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { ProductOptionForm } from '../form/product-option-form' 

export const InsertProductOption = (route) => {
    
    let navigate = useNavigate();
    let params = useParams()

    let pageTitle = params.optionId ? 'Edit Product Option' : 'Insert Product Option'

    return (
        <div className="">
            <div className="">
                <h1>{ pageTitle }</h1>
                <ProductOptionForm id={ params.optionId } />
            </div>
        </div>
    )
}
