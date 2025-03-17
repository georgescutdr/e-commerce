import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { CarouselItems } from './carousel-items'

export const ProductImages = ({images, productId}) => {
    const serverUrl = 'http://localhost:3001'

    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        setPreviewImage(images[0])
    })

    let navigate = useNavigate();

    const listImages = images.map((image) => {
        return (
            <div className="p-2" key={ image }>
                <Image 
                    width={ 150 } 
                    src={ '/uploads/product/' + productId + '/' + image } 
                    onClick={() => setPreviewImage(image)} 
                    fluid 
                    />
            </div>
        )
    })

    return (
        <Stack gap={3}>
            <div className="p-2">
                <Image width={ 850 } src={ '/uploads/product/' + productId + '/' + previewImage } fluid />
            </div>
            <div className="p-2">
                <CarouselItems items={ images } type="image" productId={ productId } setPreviewImage={ setPreviewImage } />
            </div>
        </Stack>
    )
}
