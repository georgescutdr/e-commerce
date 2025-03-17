import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import Stack from 'react-bootstrap/Stack'
import { SelectItems } from '../components/select-items'
import { useLocation } from 'react-router'
import { Toast } from 'primereact/toast'

export const Categories = () => {
    const serverUrl = 'http://localhost:3001'
    const insertCategoryUrl = serverUrl + '/api/insert-category'
    const getCategoriesUrl = serverUrl + '/api/get-categories'

    const [categoriesList, setCategoriesList] = useState([])

    let navigate = useNavigate()
    let location = useLocation()

    const toast = useRef(null)

    const showSuccess = (message) => {
        toast.current.show({severity:'success', summary: 'Success', detail: message, life: 3000})
    }

    //display all categories
    useEffect(() => {
        //setFadeSpinner(true)
        if(location.state && location.state.category) {
            showSuccess(location.state.category)
        }

        Axios.get(getCategoriesUrl, {params: {type: 'all'}}).then((result) => {
            setCategoriesList(result.data)
        })
    }, [])

    return (
      <>
        <Toast ref={ toast } />
        <Stack gap={3}> 
            <div className="page-title">
                <h1>Categories</h1>
            </div>
            <Stack direction="horizontal" gap={3}>
                <Button className="p-2 ms-auto add-btn" label="Add" icon="pi pi-plus" onClick={() => { navigate('/admin/insert-category')}}/>
            </Stack>
            <div className="list categories">
                <SelectItems items={ categoriesList } setItems={ setCategoriesList } type="category" />
            </div>
        </Stack>
      </>
    )
}
