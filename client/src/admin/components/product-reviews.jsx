import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Axios from 'axios'
import Stack from 'react-bootstrap/Stack'
import { format } from 'date-fns'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import { Rating } from "primereact/rating"

export const ProductReviews = (product) => {
  const serverUrl = 'http://localhost:3001'
  const getReviewsUrl = serverUrl + '/api/get-reviews'
  const deleteReviewUrl = serverUrl + '/api/delete-review'

  const [reviews, setReviews] = useState(0)
  const [dialogContent, setDialogContent] = useState(false)

  const toast = useRef(null)

  //get product reviews
  useEffect(() => {
    Axios.get(getReviewsUrl, {params: {productId: product.id}}).then((result) => {
    // console.log(result.data)
      setReviews(result.data)
            
    })
  }, [])

  const deleteReview = (id) => {
    Axios.get(deleteReviewUrl, {params: {id: id}}).then((result) => {
        setReviews(items => items.filter((item) => id !== item.id))
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'The review was deleted successfully', life: 3000 })
    })  
  }

  const confirm = (event, id) => {
      confirmDialog({
          trigger: event.currentTarget,
          message: 'Are you sure you want to delete this review?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => deleteReview(id),
          reject: () => {}
      });
  }

  const header = (
    <>
     
    </>
  )

  const footer = (
    <>
     
    </>
  )

  const listItems = reviews.length > 0 ? reviews.map(item => (
    <ListGroup.Item key={ item.id + item.title }>
      <div className="review-card flex justify-content-center">
            <Card 
              title={(
                <Stack direction="horizontal" gap={3}>
                      <div className="p-2">
                        <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                      </div>
                      <div className="p-2">
                        <Stack gap={3}>
                          <div className="p-2">
                            { item.title }
                          </div>
                          <div className="p-2">
                            <Rating value={ item.rating } readOnly cancel={false} />
                          </div>
                        </Stack>
                      </div>
                      <div className="p-2 ms-auto">
                        <Button variant="danger" onClick={(e) => confirm(e, item.id)}>Delete</Button>
                      </div>
                    </Stack>
                    )} 
              subTitle={ format(item.date, 'yyyy/MM/dd') } 
              footer={ footer } 
              header={ header } 
              className="md:w-25rem"
              >
                <p className="m-0">
                  { item.description }
                </p>
            </Card>
        </div>
    </ListGroup.Item>
  )) : '';

  return (
    <>
      <Toast ref={ toast }/>
      <ListGroup>
        { listItems }
      </ListGroup>
    </>
  )
}

