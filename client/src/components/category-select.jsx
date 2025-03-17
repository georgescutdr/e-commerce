import React, { useState, useEffect } from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export const CategorySelect = ({stateChanger}) => {
    const serverUrl = 'http://localhost:3001'
    const getCategoriesUrl = serverUrl + '/api/get-categories'

    const [categoriesList, setCategoriesList] = useState([])
    const [categoryId, setCategoryId] = useState(0)

    const listCategories = categoriesList.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>)

    //get categories
    useEffect(() => {
        Axios.get(getCategoriesUrl).then((result) => {
           // console.log(result.data)
            setCategoriesList(result.data)
        })
    }, [])

    return (
        <div className="">
            <div className="">
                <Form.Group className="mb-3">
                    <Form.Label>Select Category</Form.Label>
                    <Form.Select as="select" size="lg" className="categories-select" onChange={(e) => stateChanger(e.target.value)}>
                        {listCategories}
                    </Form.Select>
                </Form.Group>
            </div>
        </div>
    )
}
