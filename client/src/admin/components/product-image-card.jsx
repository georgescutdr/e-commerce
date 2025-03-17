import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ImageCard = ({item, productId, setImages}) => {
    const serverUrl = 'http://localhost:3001'
    const setThumbImageUrl = serverUrl + '/api/set-thumb-image'
    const deleteImageUrl = serverUrl + '/api/delete-product-image'

    const [thumb, setThumb] = useState(0)

    let navigate = useNavigate();

    const handleOptionChange = (target) => {
        Axios.post(setThumbImageUrl, {id: item.id, thumb: thumb}).then((result) => {
           
        })
    }

    const deleteImage = (id) => {
        Axios.get(deleteImageUrl, {params: {id: id}}).then((result) => {
            setImages(items => items.filter((item) => id !== item.id))
        })
    }

    const imageUrl = '/public/uploads/product/' + item.product_id + '/' + item.image_name

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ imageUrl } />
                <Card.Body>
                <Stack gap={3}>
                    <div className="p-2">
                        <Form.Check type='radio' id={`default`} label={ 'set as thumbnail' } />
                    </div>
                    <hr/>
                    <div className="p-2">
                        <Button variant="danger" onClick={() => deleteImage(item.id) } > Delete </Button>
                    </div>
                </Stack>
            </Card.Body>
        </Card>
    )
}
