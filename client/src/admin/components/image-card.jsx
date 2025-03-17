import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button'
import { Card } from 'primereact/card'
import '../admin.css'

export const ImageCard = ({id, setImageName, type, imageName, setImages, items, hasThumb, imageUrl}) => {
    const serverUrl = 'http://localhost:3001'
    const deleteImageUrl = serverUrl + '/api/delete-' + type + '-image'
    const setThumbUrl = serverUrl + '/api/set-thumb-image'

    let navigate = useNavigate();

    const deleteImage = (id) => {
        Axios.get(deleteImageUrl, {params: {id: id, imageUrl: imageUrl}}).then((result) => {
            //setImageName(items => items.filter((item) => id !== item.id))
            switch(type) {
                case 'product':
                    setImages(items => items.filter((item) => imageUrl !== item.image_url))
                    break
                default: 
                   setImageName('') 
            }
            
        })
    }

    const setThumb = (target) => {
        Axios.get(setThumbUrl, {params: {imageUrl: imageUrl, thumb: target.checked}}).then((result) => {

        })
    }

    const imagePath = '/uploads/' + type + '/' + id + '/' + imageName

    const header = (
        <img alt="Card" src={ imagePath } />
    )

    const footer = (
        <>
            <Stack gap={ 1 }>
                        { hasThumb && 
                            <div className="p-2">
                                <Form.Check type="switch" id="custom-switch" label="set as thumb" onChange={(e) => setThumb(e.target) } />
                            </div> 
                        }
                        <div className="p-2">
                            <Button variant="danger" onClick={() => deleteImage(id) }> Delete </Button>
                        </div> 
            </Stack>
        </>
    );

    return (
        <div className="card image-card flex justify-content-center">
            <Card title=""  footer={ footer } header={ header } className="md:w-25rem" style={{padding: '0'}}/>
        </div>
    )
}
