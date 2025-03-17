import React, { useState, useEffect } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { BrandForm } from '../form/brand-form' 

export const InsertBrand = (route) => {
    const serverUrl = 'http://localhost:3001'

    let navigate = useNavigate();
    let params = useParams()

    let pageTitle = params.brandId ? 'Edit Brand' : 'Insert Brand'

    return (
        <div className="">
            <div className="">
                <h1>{ pageTitle }</h1>
                <BrandForm id={ params.brandId } />
            </div>
        </div>
    )
}
