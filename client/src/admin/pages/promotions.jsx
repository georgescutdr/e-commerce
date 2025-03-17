import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Collapse from 'react-bootstrap/Collapse'
import { SelectItems } from '../components/select-items'
import { Toast } from 'primereact/toast'
import { useLocation } from 'react-router'

export const Promotions = () => {
    const serverUrl = 'http://localhost:3001'
    const getPromotionsUrl = serverUrl + '/api/get-promotions'

    const [promotionsList, setPromotionsList] = useState([])

    let navigate = useNavigate()
    let location = useLocation()

    const toast = useRef(null)

    const showSuccess = (message) => {
        toast.current.show({severity:'success', summary: 'Success', detail: message, life: 3000})
    }

    useEffect(() => {
        if(location.state && location.state.promotion) {
            showSuccess(location.state.promotion)
        }

        Axios.get(getPromotionsUrl).then((result) => {
            if(result.data.length > 0) {
              setPromotionsList(result.data)
            }
        })
    }, [])

    return (
      <>
        <Toast ref={ toast } />
        <Stack gap={3}> 
          <div className="page-title">
            <h1>Promotions</h1>
          </div>
          <Stack direction="horizontal" gap={3}>
            <Button className="p-2 ms-auto" variant="primary" size="bg" onClick={() => { navigate('/admin/insert-promotion')}}> Add new </Button>
          </Stack>
          <div className="list categories">
              <SelectItems  items={ promotionsList } setItems={ setPromotionsList } type="promotion" />
          </div>
        </Stack>
      </>
      )
}
