import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'
import { Toast } from 'primereact/toast'

export const ProductAttributesForm = ({id, attributes, setAttributes}) => {
    const serverUrl = 'http://localhost:3001'
    const insertAttributeUrl = serverUrl + '/api/insert-product-attribute'

    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Attribute "' + name + '" was successfully added', life: 3000});
    }

    let navigate = useNavigate();

    const submitAttribute = () => {
        Axios.post(insertAttributeUrl, {
            productId: id,
            attributeName: name,
            attributeValue: value,
        }).then((result) => {
           setName('')
           setValue('')
           setAttributes([{id: id, name: name, value: value}, ...attributes])

           showSuccess()
        })
    }


    return (
        <>
        <Toast ref={ toast }/>
        <Table bordered>
            <thead>
                <tr>
                    <td><Form.Label>Attribute name</Form.Label></td>
                    <td><Form.Label>Attribute value</Form.Label></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Form.Control type="text" value={ name } onChange={(e) => setName(e.target.value)} />
                    </td>
                    <td>
                        <Form.Control type="text" value={ value } onChange={(e) => setValue(e.target.value)} />
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => submitAttribute()}>Insert</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
      </>
    )
}
