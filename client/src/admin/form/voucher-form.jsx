import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { format } from 'date-fns'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Calendar } from 'primereact/calendar'

const VoucherForm = ({id}) => {
    const serverUrl = 'http://localhost:3001'
    const insertVoucherUrl = serverUrl + '/api/insert-voucher'
    const updateVoucherUrl = serverUrl + '/api/update-voucher'
    const deleteVoucherUrl = serverUrl + '/api/delete-voucher'
    const getVoucherUrl = serverUrl + '/api/get-voucher'

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [num, setNum] = useState('')
    const [date, setDate] = useState('')
    const [code, setCode] = useState('')
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        if(params.voucherId) {
           Axios.get(getVoucherUrl, {params: {id: params.voucherId}}).then((result) => {
               setName(result.data[0].name)
               setDescription(result.data[0].description)
               setType(result.data[0].type)
               setAmount(result.data[0].value)
               setNum(result.data[0].num)
               setDate(result.data[0].date)
               setCode(result.data[0].code)
           }) 
        }
    }, [])

    const submitVoucher = () => {
        let url = params.voucherId ? updateVoucherUrl : insertVoucherUrl

        Axios.post(url, {
            id: params.brandId,
            name: name,
            description: description, 
            type: type,
            num: num,
            value: amount,
            date: date,
            code: code
        }).then((result) => {
            let message = id ? 'The voucher "' + name + '" was successfully modified' : 'The voucher "' + name + '" was successfully added'
            navigate("/admin/vouchers", {state: {voucher: message}})   
        })
    }

    const deleteVoucher = (id) => {
        Axios.get(deleteVoucherUrl, {params: {
            id: id 
        }}).then((result) => {
            let message = 'The voucher "' + name + '" was successfully deleted'
            navigate("/admin/vouchers", { state: { voucher: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteVoucher(itemId),
            reject: () => {}
        });
    }

    return (
        <>
                <Toast ref={ toast } />
                <ConfirmDialog />
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={ name } onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" cols={13} onChange={(e) => setDescription(e.target.value)} value={ description } />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                        <option value="value">value ($)</option>
                        <option value="percent">percent (%)</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Voucher amount</Form.Label>
                    <Form.Control type="text" value={ amount } onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Voucher code</Form.Label>
                    <Form.Control type="text" value={ code } onChange={(e) => setCode(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number of vouchers</Form.Label>
                    <Form.Control type="text" value={ num } onChange={(e) => setNum(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Expiry date</Form.Label>
                    <Calendar value={ date } onChange={(e) => setDate(format(e.value, "yyyy-MM-dd"))} dateFormat="yy/mm/dd" showIcon  />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Stack direction="horizontal" gap={3}>
                        <Button className="p-2" variant="primary" size="lg" onClick={() => { submitVoucher()}}> Save </Button>
                        <Button className="p-2" variant="secondary" size="lg" onClick={() => navigate('/admin/vouchers')}> Back </Button>
                        {id && (
                            <Button className="p-2 ms-auto" variant="danger" size="lg" onClick={(e) => confirm(e, id)}> Delete </Button>
                        )}
                    </Stack>
                </Form.Group>
        </>
    )
}

export default VoucherForm
