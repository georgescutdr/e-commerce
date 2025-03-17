import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Axios from 'axios'
import Button from 'react-bootstrap/Button'
import { ProductAttributesForm } from '../form/product-attributes-form'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

export const ProductAttributes = ({id, product, items, setItems}) => {
  const serverUrl = 'http://localhost:3001'
  const getAttributesUrl = serverUrl + '/api/get-product-attributes'
  const deleteAttributeUrl = serverUrl + '/api/delete-product-attribute'
  const generateAttributesUrl = serverUrl + '/api/generate-attributes'

  const [attributes, setAttributes] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [dialogContent, setDialogContent] = useState(false)
  const toast = useRef(null)

  const saveAttributes = () => {
    setVisibleModal(false)
  }

  const handleClose = () => setModalVisible(false)

  const deleteAttribute = (attribute) => {
      Axios.get(deleteAttributeUrl, {params: {id: attribute.id}}).then((result) => {
        setItems(items => items.filter((item) => attribute.id !== item.id))
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'Attribute "' + attribute.name + '" was deleted', life: 3000 })
    })
  }

  const confirm = (event, item) => {
      confirmDialog({
          trigger: event.currentTarget,
          message: 'Are you sure you want to delete attribute "' + item.name + '"?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => deleteAttribute(item),
          reject: () => {}
      });
  }

  const generateAttributes = async () => {
        setSpinner(true)

        let newItems = []

        Axios.post(generateAttributesUrl, {title: product.name, brand: product.brand}).then((result) => {
            setSpinner(false)
        /*    
            let data = JSON.parse(result.data.replaceAll("```", "").replaceAll("json", ""))
            console.log(data)

            for (const [key, value] of Object.entries(data)) {
              let name = key.replace('_', ' ')
              let val = value instanceof Array ? value.join(', ') : value.replace('false', 'no').replace('true', 'yes')
              newItems.push({name: name, value: value})
            }

            const listNewItems = newItems.length > 0 ? newItems.map(item => (
              <tr key={ item.name }>
                  <td></td>
                  <td>{ item.name }</td>
                  <td>{ item.value }</td>
              </tr>
            )) : ''

            const modalData = (
              <Table striped bordered hover>
                <thead>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                </thead>
                <tbody>
                  { listNewItems }
                </tbody>
              </Table>
            )

            setDialogContent(modalData)
            setModalVisible(true)
            */
        })
    }

  const listItems = items.length > 0 ? items.map(item => (
    <tr key={ item.name }>
        <td>{ item.name }</td>
        <td>{ item.value }</td>
        <td><Button variant="danger" onClick={(e) => confirm(e, item)}>Delete</Button></td>
    </tr>
  )) : '';

  return (
    <>
      <Toast ref={ toast }/>
      <ConfirmDialog />
      <ProductAttributesForm id={ id } attributes={ items } setAttributes={ setItems } />
      <Table striped bordered hover>
        <thead>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          { listItems }
        </tbody>
      </Table>
    </>
  )
}

