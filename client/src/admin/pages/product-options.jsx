import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { SelectItems } from '../components/select-items'
import { Toast } from 'primereact/toast'
import { useLocation } from 'react-router'

export const ProductOptions = () => {
    const serverUrl = 'http://localhost:3001'
    const insertCategoryUrl = serverUrl + '/api/insert-category'
    const getProductOptionsUrl = serverUrl + '/api/get-options'

    const [optionsList, setOptionsList] = useState([])
    
    const toast = useRef(null)

    let navigate = useNavigate()
    let location = useLocation()

    const showSuccess = (message) => {
        toast.current.show({severity:'success', summary: 'Success', detail: message, life: 3000})
    }

    useEffect(() => {
        //setFadeSpinner(true)
        if(location.state && location.state.option) {
            showSuccess(location.state.option)
        }

        Axios.get(getProductOptionsUrl).then((result) => {
            setOptionsList(result.data)
        })
    }, [])

    return (
          <>
            <Toast ref={ toast } />
            <Stack gap={3}> 
                <div className="page-title">
                  <h1>Product options</h1>
                </div>
                <Stack direction="horizontal" gap={3}>
                  <Button className="p-2 ms-auto" variant="primary" size="bg" onClick={() => { navigate('/admin/insert-product-option')}}> Add new </Button>
                </Stack>
                <div className="list categories">
                    <SelectItems  items={ optionsList } setItems={ setOptionsList } type="option" />
                </div>
            </Stack>
        </>
    )
}
