import React, { useState, useEffect } from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Fade from 'react-bootstrap/Fade'
import { CategorySelect } from './category-select'

export const SubcategorySelect = ({stateChanger}) => {
    const serverUrl = 'http://localhost:3001'
    const getSubcategoriesUrl = serverUrl + '/api/get-subcategories'

    const [subcategoryName, setSubcategoryName] = useState('')
    const [subcategoriesList, setSubcategoriesList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    const [category, setCategory] = useState(0)
    const [open, setOpen] = useState(false)

    const listSubcategories = subcategoriesList.map(subcategory => <option key={ subcategory.id } value={ subcategory.id }>{ subcategory.name }</option>)

    //get subcategories
    useEffect(() => {
        Axios.get(getSubcategoriesUrl, {params: {categoryId: category}}).then((result) => {
           // console.log(result.data)
            setSubcategoriesList(result.data)
            setOpen(true);
        })
    }, [category])

    return (
        <div className="">
            <div className="">
                <CategorySelect stateChanger={ setCategory }/>
                <Form.Group className="mb-3">
                    <Form.Label>Select Subcategory</Form.Label>
                    <Form.Select as="select" size="lg" className="subcategories-select" onChange={(e) => stateChanger(e.target.value)}>
                        {listSubcategories}
                    </Form.Select>
                </Form.Group>  
            </div>
        </div>
    )
}
