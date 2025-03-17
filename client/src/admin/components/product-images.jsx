import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button'
import { FileUploadForm } from '../form/file-upload-form'
import Card from 'react-bootstrap/Card'
import { ImageCard } from './image-card'
import { ItemsGrid } from './items-grid'

export const ProductImages = ({productId}) => {
    const serverUrl = 'http://localhost:3001'
    const getImagesUrl = serverUrl + '/api/get-product-images'
    const deleteImageUrl = serverUrl + '/api/delete-product-image'

    const [images, setImages] = useState([])

    let navigate = useNavigate();

    useEffect(() => {
        Axios.get(getImagesUrl, {params: {
            productId: productId,
        }}).then((result) => {
           setImages(result.data)
        })
    }, [])

    return (
        <div className="select items list">
            <Stack gap={3}>
                <div className="p-2">
                    <FileUploadForm 
                        id={ productId } 
                        images={ images } 
                        setImages={ setImages } 
                        multiple="multiple" 
                        type="product" 
                        /> 
                </div>
                <div className="p-2">
                    <ItemsGrid 
                        items={ images } 
                        setItems={ setImages } 
                        type='image' 
                        rowItems="6" 
                        cardType="image" 
                        />
                </div>
            </Stack>  
        </div>
    )
}
