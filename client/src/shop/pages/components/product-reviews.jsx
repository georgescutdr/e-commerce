import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import Card from 'react-bootstrap/Card'

export const ProductReviews = ({productId}) => {
    const serverUrl = 'http://localhost:3001'
    const getReviewsUrl = serverUrl + '/api/get-reviews'

    const [reviews, setReviews] = useState([])

    useEffect(() => {
      console.log('productId2: '+productId)
      Axios.get(getReviewsUrl, {params: {productId: productId}}).then((result) => {
        setReviews(result.data)            
      })
    }, [])

    const reviewsList = reviews ? reviews.map((review) => {
      return (
        <div className="p-2">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" rounded />
                <Card.Body>
                  <Card.Title>Username</Card.Title>
                  <Card.Text>
                    { review.date }
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="p-2">
              <Stack gap={3}>
                  <div className="p-2"><h2>{ review.title }</h2></div> 
                  <div className="p-2">*********</div>
                  <div className="p-2">{ review.description }</div>
              </Stack>
            </div>
          </Stack>
        </div>
    )}) : ''

    return (
        <Stack gap={3}>
          { reviewsList }    
        </Stack>
    )
}
