import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { FileUploadForm } from './file-upload-form'
import { ImageCard } from '../components/image-card'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'

const ShippingMethodForm = ({id}) => {
    const serverUrl = 'http://localhost:3001'
    const insertStatusUrl = serverUrl + '/api/insert-shipping-status'
    const updateStatusUrl = serverUrl + '/api/update-shipping-status'
    const deleteStatusUrl = serverUrl + '/api/delete-shipping-status'
    const getStatusUrl = serverUrl + '/api/get-shipping-status'

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        if(params.statusId) {
           Axios.get(getStatusUrl, {params: {id: params.statusId}}).then((result) => {
               setName(result.data[0].name)
               setDescription(result.data[0].description)
           }) 
        }
    }, [])

    const submitShippingStatus = () => {
        let url = params.shippingId ? updateShippingUrl : insertShippingUrl

        Axios.post(url, {
            id: params.shippingId,
            name: name,
            description: description 
        }).then((result) => {
           let message = 'The status with the name "' + name + '" was successfully ' + (id ?  'modified' : 'added')
           navigate("/admin/shipping-method", {state: {shipping: message}})
        })
    }

    const deleteShippingStatus = (id) => {
        Axios.get(deleteShippingUrl, {params: {
            id: id 
        }}).then((result) => {
            let message = 'The status with name "' + name + '" was successfully deleted'
            navigate("/admin/shipping-status", { state: { status: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteShippingStatus(itemId),
            reject: () => {}
        });
    }

    return (
        <>
                <Toast ref={ toast } />
                <ConfirmDialog />
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={ name } onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" cols={13} onChange={(e) => setDescription(e.target.value)} value={ description } />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Stack direction="horizontal" gap={3}>
                        <Button className="p-2" variant="primary" size="lg" onClick={() => { submitShippingStatus()}}> Save </Button>
                        <Button className="p-2" variant="secondary" size="lg" onClick={() => navigate('/admin/shipping-status')}> Back </Button>
                        <Button className="p-2 ms-auto" variant="danger" size="lg" onClick={(e) => confirm(e, id)}> Delete </Button>
                    </Stack>
                </Form.Group>
        </>
    )
}

export default ShippingMethodForm
