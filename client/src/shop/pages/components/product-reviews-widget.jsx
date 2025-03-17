import React from 'react'
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProductReviews } from './product-reviews'

export const ProductReviewsWidget = ({product}) => {
    return (
        <Stack gap={3}>
          <div className="p-2">
              <a href={'/product-reviews/' + product.id }> ***** </a>
          </div>
          <div className="p-2">
              <h3>Review this product</h3>
              Share your thoughts with other customers
          </div>
          <div className="p-2">
              <Button href={ '/review/create-review/' + product.id } variant="light">Write a customer review</Button>
          </div>
          <div className="p-2">
              <ProductReviews product={ product } />
          </div>
        </Stack>
    )
}
