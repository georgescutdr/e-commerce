import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Collapse from 'react-bootstrap/Collapse'
import { SelectItems } from '../components/select-items'
import { useLocation } from 'react-router'
import { Toast } from 'primereact/toast'

export const Brands = () => {
    const serverUrl = 'http://localhost:3001'
    const insertCategoryUrl = serverUrl + '/api/insert-brand'
    const deleteCategoryUrl = serverUrl + '/api/delete-brand'
    const getBrandsUrl = serverUrl + '/api/get-brands'

    const [brandName, setBrandName] = useState('')
    const [brandsList, setBrandsList] = useState([])
    const [fadeItems, setFadeItems] = useState(false)
    const [fadeSpinner, setFadeSpinner] = useState(false)

    let navigate = useNavigate()
    let location = useLocation()

    const toast = useRef(null)

    const showSuccess = (message) => {
        toast.current.show({severity:'success', summary: 'Success', detail: message, life: 3000})
    }

    //display all categories
    useEffect(() => {
        //setFadeSpinner(true)

        if(location.state && location.state.brand) {
            showSuccess(location.state.brand)
        }

        Axios.get(getBrandsUrl).then((result) => {
            if(result.data.length > 0) {
              setBrandsList(result.data)
            }
            setFadeItems(true);
            setFadeSpinner(false)
        })
    }, [])

    return (
      <>
        <Toast ref={ toast } />
        <Stack gap={3}> 
            <div className="page-title">
              <h1>Brands</h1>
            </div>
            <Stack direction="horizontal" gap={3}>
              <Button className="p-2 ms-auto" variant="primary" size="bg" onClick={() => { navigate('/admin/insert-brand')}}> Insert Brand </Button>
            </Stack>
            <div className="list categories">
                <SelectItems  items={ brandsList } setItems={ setBrandsList } type="brand" />
            </div>
        </Stack>
      </>
      )
}
