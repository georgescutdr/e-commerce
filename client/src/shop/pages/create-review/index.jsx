import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useParams } from "react-router"
import Axios from 'axios'
import { Rating } from 'primereact/rating'
import { Header } from '../../components/header';
import * as moment from 'moment'

const CreateReview = ({props}) => {
    const serverUrl = 'http://localhost:3001'
    const insertReviewUrl = serverUrl + '/api/insert-review'

    const [title, setTitle] = useState('')   
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')

    let params = useParams()

    const submitReview = () => {
        const today = new Date()

        Axios.post(insertReviewUrl, {
            productId: params.productId,
            title: title,
            description: description,
            rating: rating,
            date: moment(today).format('YYYY/MM/DD')
        }).then((result) => {
           
        })
    }

    return (
        <>
        <Header />
        <Stack gap={3}>
          
          <div className="p-2">
              <h2><strong>How was the item?</strong></h2>
              <div className="p-2">
                <Rating value={ rating } onChange={(e) => setRating(e.value)} cancel={false} />
              </div>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Write a review</Form.Label>
              <Form.Control as="textarea" onChange={(e) => setDescription(e.target.value)} placeholder="What should other customers know?" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title your review</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} type="text" placeholder="What's most important to know?" />
            </Form.Group>
        </Form>
          <div className="p-2">
              <Button onClick={ submitReview } variant="light">Submit</Button>
          </div>
        </Stack>
        </>
    )
}

export default CreateReview;