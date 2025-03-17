import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Collapse from 'react-bootstrap/Collapse';
import { SelectItems } from '../components/select-items'
import { Toast } from 'primereact/toast'
import { useLocation } from 'react-router'

export const Vouchers = () => {
    const serverUrl = 'http://localhost:3001'
    const getVouchersUrl = serverUrl + '/api/get-vouchers'

    const [vouchersList, setVouchersList] = useState([])

    let navigate = useNavigate()
    let location = useLocation()

    const toast = useRef(null)

    const showSuccess = (message) => {
        toast.current.show({severity:'success', summary: 'Success', detail: message, life: 3000})
    }

    //display all categories
    useEffect(() => {
        if(location.state && location.state.voucher) {
            showSuccess(location.state.voucher)
        }

        Axios.get(getVouchersUrl).then((result) => {
            if(result.data.length > 0) {
              setVouchersList(result.data)
            }
        })
    }, [])

    return (
      <>
        <Toast ref={ toast } />
        <Stack gap={3}> 
          <div className="page-title">
            <h1>Vouchers</h1>
          </div>
          <Stack direction="horizontal" gap={3}>
            <Button className="p-2 ms-auto" variant="primary" size="bg" onClick={() => { navigate('/admin/insert-voucher')}}> Add new </Button>
          </Stack>
          <div className="list categories">
              <SelectItems  items={ vouchersList } setItems={ setVouchersList } type="voucher" />
          </div>
        </Stack>
      </>
      )
}
