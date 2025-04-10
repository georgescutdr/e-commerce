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
    const insertShippingUrl = serverUrl + '/api/insert-brand'
    const updateShippingUrl = serverUrl + '/api/update-brand'
    const deleteShippingUrl = serverUrl + '/api/delete-brand'
    const getShippingUrl = serverUrl + '/api/get-brand'

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        if(params.brandId) {
           Axios.get(getBrandUrl, {params: {id: params.brandId}}).then((result) => {
               setName(result.data[0].name)
               setDescription(result.data[0].description)
               setPrice(result.data[0].image_name)
           }) 
        }
    }, [])

    const submitShippingMethod = () => {
        let url = params.shippingId ? updateShippingUrl : insertShippingUrl

        Axios.post(url, {
            id: params.shippingId,
            name: name,
            description: description 
        }).then((result) => {
           let message = id ? 'The shipping method "' + name + '" was successfully modified' : 'The shipping method "' + name + '" was successfully added'
           navigate("/admin/shipping-method", {state: {shipping: message}})
        })
    }

    const deleteShippingMethod = (id) => {
        Axios.get(deleteShippingUrl, {params: {
            id: id 
        }}).then((result) => {
            let message = 'The shipping method "' + name + '" was successfully deleted'
            navigate("/admin/shipping-method", { state: { shipping: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteShippingMethod(itemId),
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
                        <Button className="p-2" variant="primary" size="lg" onClick={() => { submitShippingMethod()}}> Save </Button>
                        <Button className="p-2" variant="secondary" size="lg" onClick={() => navigate('/admin/shipping-method')}> Back </Button>
                        <Button className="p-2 ms-auto" variant="danger" size="lg" onClick={(e) => confirm(e, id)}> Delete </Button>
                    </Stack>
                </Form.Group>
        </>
    )
}

export default ShippingMethodForm
