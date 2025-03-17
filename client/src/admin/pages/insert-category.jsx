import React, { useState, useEffect } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { CategoryForm } from '../form/category-form' 

export const InsertCategory = (route) => {
    const serverUrl = 'http://localhost:3001'
    const insertCategoryUrl = serverUrl + '/api/insert-category'
    const updateCategoryUrl = serverUrl + '/api/update-category'
    const deleteCategoryUrl = serverUrl + '/api/delete-category'
    const getCategoryUrl = serverUrl + '/api/get-category'

    let navigate = useNavigate();
    let params = useParams()

    let pageTitle = params.categoryId ? 'Edit Category' : 'Insert Category'

    return (
        <div className="">
            <div className="">
                <h1>{ pageTitle }</h1>
                <CategoryForm id={ params.categoryId } />
            </div>
        </div>
    )
}
