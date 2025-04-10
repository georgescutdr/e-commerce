import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { config, siteConfig } from '../config'
import './select-items.css'

export const SelectItems = ({items, setItems, type}) => {
    const serverUrl = 'http://localhost:3001'

    const [fadeSpinner, setFadeSpinner] = useState(false)
    const [dialogContent, setDialogContent] = useState(false)
    
    const toast = useRef(null)

    let navigate = useNavigate();

    const deleteItem = (id, name) => {
        Axios.get(config.api.deleteItem, {params: {id: id}}).then((result) => {
            setItems(items => items.filter((item) => id !== item.id))
            //setFadeSpinner(false)
            toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'The ' + type + ' "' + name + '" was deleted successfully', life: 3000 })
        })
    }

    const listItems = items.length > 0 ? items.map(item => {
        let voucherName = type == 'voucher' ? ('(-' + item.value + (item.type == 'percent' ? '%' : '$') + ')') : ''

        return (
            <ListGroup.Item className="list-group-item" variant="light" key={ item.id }>
                <Stack gap={3} direction="horizontal">
                    <div className="p-2">
                        <Form.Label className="me-auto">{ item.name } { voucherName }</Form.Label>
                    </div>
                    <div className="button-group p-2 ms-auto">
                        <Button variant="secondary" size="sm" id={ item.id } onClick={() => { navigate('/admin/edit-' + type + '/' + item.id)}}> Edit </Button>
                        <Button variant="danger" size="sm" id={ item.id } onClick={(e) => confirm(e, item) }> Delete </Button>
                    </div>
                </Stack>
            </ListGroup.Item>
        )
    }) : ''

    const confirm = (event, item) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to delete the ' + type + ' with the name "' + item.name + '"?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteItem(item.id, item.name),
            reject: () => {}
        });
    }

    return (
        <div className="select-items-list">
            <Toast ref={ toast } />
            <ConfirmDialog />
            <Fade in={fadeSpinner}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Fade>
            <ListGroup>
                {listItems}
            </ListGroup>
        </div>
    )
}
