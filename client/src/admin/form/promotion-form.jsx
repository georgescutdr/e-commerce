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
import { format } from 'date-fns'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Calendar } from 'primereact/calendar'

export const PromotionForm = ({id, setPromotion}) => {
    const serverUrl = 'http://localhost:3001'
    const insertPromotionUrl = serverUrl + '/api/insert-promotion'
    const updatePromotionUrl = serverUrl + '/api/update-promotion'
    const deletePromotionUrl = serverUrl + '/api/delete-promotion'
    const getPromotionUrl = serverUrl + '/api/get-promotion'

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [home, setHome] = useState(0)
    const [imageName, setImageName] = useState('')
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        if(params.promotionId) {
           Axios.get(getPromotionUrl, {params: {id: params.promotionId}}).then((result) => {
               setName(result.data[0].name)
               setDescription(result.data[0].description)
               setType(result.data[0].type)
               setAmount(result.data[0].value)
               setStartDate(result.data[0].start_date)
               setEndDate(result.data[0].end_date)
               setHome(result.data[0].home)
               setImageName(result.data[0].image_name)

               setPromotion(result.data[0])
           }) 
        }
    }, [])

    const submitPromotion = () => {
        let url = params.promotionId ? updatePromotionUrl : insertPromotionUrl

        Axios.post(url, {
            id: params.promotionId,
            name: name,
            description: description, 
            type: type,
            value: amount,
            startDate: startDate,
            endDate: endDate,
            home: home
        }).then((result) => {
            let message = id ? 'The promotion "' + name + '" was successfully modified' : 'The promotion "' + name + '" was successfully added'
            navigate("/admin/promotions", {state: {promotion: message}})   
        })
    }

    const deletePromotion = (id) => {
        Axios.get(deletePromotionUrl, {params: {
            id: id 
        }}).then((result) => {
            let message = 'The promotion "' + name + '" was successfully deleted'
            navigate("/admin/promotions", { state: { promotion: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deletePromotion(itemId),
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
                { id && (
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <FileUploadForm id={ id } multiple="" type="promotion" setImageName={ setImageName } />
                        { imageName && <ImageCard id={ id } type="promotion" imageName={ imageName } setImageName={ setImageName } /> }
                    </Form.Group>
                )}
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                        <option value="value">value ($)</option>
                        <option value="percent">percent (%)</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" value={ amount } onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Start date</Form.Label>
                    <Calendar value={ startDate } onChange={(e) => setStartDate(format(e.value, "yyyy-MM-dd"))} dateFormat="yy/mm/dd" showIcon  />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>End date</Form.Label>
                    <Calendar value={ endDate } onChange={(e) => setEndDate(format(e.value, "yyyy-MM-dd"))} dateFormat="yy/mm/dd" showIcon  />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Stack direction="horizontal" gap={3}>
                        <Button className="p-2" variant="primary" size="lg" onClick={() => { submitPromotion()}}> Save </Button>
                        <Button className="p-2" variant="secondary" size="lg" onClick={() => navigate('/admin/promotions')}> Back </Button>
                        <Button className="p-2 ms-auto" variant="danger" size="lg" onClick={(e) => confirm(e, id)}> Delete </Button>
                    </Stack>
                </Form.Group>
        </>
    )
}
