import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button'
import { Card } from 'primereact/card'
import { ProductPrice } from '../../shop/pages/components/product-price'
import '../admin.css'

export const CheckProductCard = ({item, type, id, cardType}) => {
    const serverUrl = 'http://localhost:3001'
    const deleteVoucherUrl = serverUrl + '/api/delete-product-voucher'
    const insertVoucherUrl = serverUrl + '/api/insert-product-voucher'
    const deletePromotionUrl = serverUrl + '/api/delete-product-promotion'
    const insertPromotionUrl = serverUrl + '/api/insert-product-promotion'

    let navigate = useNavigate();

    const handleOptionChange = (target) => {
        let url = ''
        let body = ''

        switch(type) {
            case 'voucher':
                url = target.checked ? insertVoucherUrl : deleteVoucherUrl
                body = {voucherId: target.value, productId: item.id}
                break
            case 'promotion':
                url = target.checked ? insertPromotionUrl : deletePromotionUrl
                body = {promotionId: target.value, productId: item.id}
        }

        Axios.post(url, body).then((result) => {
           
        })
    }

    const promotion = '-30%'

    const header = (
        <>
            <img alt="Card" src={ '/uploads/product/' + item.id + '/' + item.thumb } />
            {promotion && (
                <div class="card-promotion">
                    { promotion }
                </div>
            )}
        </>

    )

    const footer = (
        <>
        {cardType == 'buttons' && (
            <>
            <Button variant="secondary" size="sm" id={ item.id } onClick={() => { navigate('/admin/edit-product/' + item.id)}}> Edit </Button>
            <Button variant="danger" size="sm" id={ item.id } onClick={() => confirm(item) }> Delete </Button>
            </>
        )}
        </>
    )

    return (
        <Card title={ item.name } subTitle={<ProductPrice price={ item.price } newPrice={ item.new_price }/>} footer={ footer } header={ header } className="md:w-25rem product-card">
            <p className="m-0">
                { cardType == 'checkbox' &&  <Form.Check type="switch" id="custom-switch" value={ id } onChange={(e) => handleOptionChange(e.target)} /> }    
            </p>
        </Card>
    )
}
