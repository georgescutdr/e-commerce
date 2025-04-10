import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'

const OptionForm = ({id}) => {
    const serverUrl = 'http://localhost:3001'
    const insertOptionUrl = serverUrl + '/api/insert-option'
    const getOptionUrl = serverUrl + '/api/get-option'
    const updateOptionUrl = serverUrl + '/api/update-option'
    const deleteOptionUrl = serverUrl + '/api/delete-option'

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()

    useEffect(() => {
        if(id > 0) {
           Axios.get(getOptionUrl, {params: {id: id}}).then((result) => {
               setName(result.data[0].name)
               setDescription(result.data[0].description)
           }) 
        }
    }, [])

    const submitProductOption = () => {
        let url = id > 0 ? updateOptionUrl : insertOptionUrl

        Axios.post(url, {
            id: id,
            name: name,
            description: description,
        }).then((result) => {
            let message = id ? 'The option "' + name + '" was successfully modified' : 'The option "' + name + '" was successfully added'
            navigate("/admin/product-options", {state: {option: message}});
        })
    }

    const deleteProductOption = () => {
        Axios.get(deleteOptionUrl, {params: {id: id}}).then((result) => {
           let message = 'The option "' + name + '" was successfully deleted'
           navigate("/admin/product-options", { state: { option: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteProductOption(itemId),
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
                        <Button className="p-2" variant="primary" size="lg" onClick={() => { submitProductOption()}}> Save </Button>
                        <Button className="p-2" variant="secondary" size="lg" onClick={() => navigate('/admin/product-options')}> Back </Button>
                        { 
                            id && 
                            <Button className="p-2 ms-auto" variant="danger" size="lg" onClick={(e) => confirm(e, id)}>
                                Delete 
                            </Button> 
                        }
                    </Stack>
                </Form.Group>
      </>
    )
}

export default OptionForm
