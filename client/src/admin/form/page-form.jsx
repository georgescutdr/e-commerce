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

const PageForm = ({id}) => {
    const serverUrl = 'http://localhost:3001'
    const insertPageUrl = serverUrl + '/api/insert-page'
    const updatePageUrl = serverUrl + '/api/update-page'
    const deletePageUrl = serverUrl + '/api/delete-page'
    const getPageUrl = serverUrl + '/api/get-page'

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [slug, setSlug] = useState('')
    const [order, setOrder] = useState(0)
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        if(params.statusId) {
           Axios.get(getPageUrl, {params: {id: params.pageId}}).then((result) => {
               setName(result.data[0].name)
               setDescription(result.data[0].description)
               setSlug(result.data[0].slug)
               setOrder(result.data[0].order)
           }) 
        }
    }, [])

    const submitPage = () => {
        let url = params.pageId ? updatePageUrl : insertPageUrl

        Axios.post(url, {
            id: params.pageId,
            name: name,
            description: description,
            slug: slug,
            order: order 
        }).then((result) => {
           let message = 'The page with the title "' + name + '" was successfully ' + (id ?  'modified' : 'added')
           navigate("/admin/pages", {state: {page: message}})
        })
    }

    const deletePage = (id) => {
        Axios.get(deletePageUrl, {params: {
            id: id 
        }}).then((result) => {
            let message = 'The page with title "' + name + '" was successfully deleted'
            navigate("/admin/pages", { state: { page: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deletePage(itemId),
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
                    <Form.Label>Slug</Form.Label>
                    <Form.Control type="text" value={ slug } onChange={(e) => setSlug(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Order</Form.Label>
                    <Form.Control type="text" value={ order } onChange={(e) => setOrder(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Stack direction="horizontal" gap={3}>
                        <Button className="p-2" variant="primary" size="lg" onClick={() => { submitPage()}}> Save </Button>
                        <Button className="p-2" variant="secondary" size="lg" onClick={() => navigate('/admin/pages')}> Back </Button>
                        <Button className="p-2 ms-auto" variant="danger" size="lg" onClick={(e) => confirm(e, id)}> Delete </Button>
                    </Stack>
                </Form.Group>
        </>
    )
}

export default PageForm
