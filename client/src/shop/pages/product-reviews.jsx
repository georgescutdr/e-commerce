import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useParams } from "react-router"
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ProductReviews = (product) => {
    const serverUrl = 'http://localhost:3001'
    const getReviewsUrl = serverUrl + '/api/get-reviews'

    const [reviews, setReviews] = useState([])

    const reviewsList = reviews && reviews.map((review) => {
        return (
          <div className="p-2" key={ review.id }>
              <h3>{ review.title }</h3>
              <div className="review-stars">
                *****
              </div>
              <div className="review-description">
                { review.description }
              </div>
          </div>    
        )    
    }) 

    let params = useParams()

    //get product reviews
    useEffect(() => {
        Axios.get(getReviewsUrl, {params: {productId: params.productId}}).then((result) => {
            setReviews(result.data)
        })
    }, [])

    return (
        <Stack gap={3}>
          <div className="p-2">
              <h2><strong>Product reviews</strong></h2>
          </div>
          { reviewsList }
        </Stack>
    )
}
