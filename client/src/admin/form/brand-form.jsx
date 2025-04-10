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

const BrandForm = ({id}) => {
    const serverUrl = 'http://localhost:3001'
    const insertBrandUrl = serverUrl + '/api/insert-brand'
    const updateBrandUrl = serverUrl + '/api/update-brand'
    const deleteBrandUrl = serverUrl + '/api/delete-brand'
    const getBrandUrl = serverUrl + '/api/get-brand'

    const [brandName, setBrandName] = useState('')
    const [brandDescription, setBrandDescription] = useState('')
    const [imageName, setImageName] = useState('')
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        if(params.brandId) {
           Axios.get(getBrandUrl, {params: {id: params.brandId}}).then((result) => {
               setBrandName(result.data[0].name)
               setBrandDescription(result.data[0].description)
               setImageName(result.data[0].image_name)
           }) 
        }
    }, [])

    const submitBrand = () => {
        let url = params.brandId ? updateBrandUrl : insertBrandUrl

        Axios.post(url, {
            id: params.brandId,
            name: brandName,
            description: brandDescription 
        }).then((result) => {
           let message = id ? 'The brand "' + brandName + '" was successfully modified' : 'The brand "' + brandName + '" was successfully added'
           navigate("/admin/brands", {state: {brand: message}})
        })
    }

    const deleteBrand = (id) => {
        Axios.get(deleteBrandUrl, {params: {
            id: id 
        }}).then((result) => {
            let message = 'The brand "' + brandName + '" was successfully deleted'
            navigate("/admin/brands", { state: { brand: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteBrand(itemId),
            reject: () => {}
        });
    }

    let pageTitle = params.brandId ? 'Edit Brand' : 'Insert Brand'

    return (
        <>
                <Toast ref={ toast } />
                <ConfirmDialog />
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={ brandName } onChange={(e) => setBrandName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" cols={13} onChange={(e) => setBrandDescription(e.target.value)} value={ brandDescription } />
                </Form.Group>
                { id && (
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <FileUploadForm id={ id } multiple="" type="brand" setImageName={ setImageName } />
                        { imageName && <ImageCard id={ id } type="brand" imageName={ imageName } setImageName={ setImageName } /> }
                    </Form.Group>
                )}
                <Form.Group className="mb-3">
                    <Stack direction="horizontal" gap={3}>
                        <Button className="p-2" variant="primary" size="lg" onClick={() => { submitBrand()}}> Save </Button>
                        <Button className="p-2" variant="secondary" size="lg" onClick={() => navigate('/admin/brands')}> Back </Button>
                        <Button className="p-2 ms-auto" variant="danger" size="lg" onClick={(e) => confirm(e, id)}> Delete </Button>
                    </Stack>
                </Form.Group>
        </>
    )
}

export default BrandForm
