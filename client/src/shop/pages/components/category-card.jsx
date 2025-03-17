import React, { useState, useEffect } from 'react'
import '../../shop.css'

export const CategoryCard = ({category}) => {
  return (
    <div className="category-card">
      <img src={ '/uploads/category/' + category.id + '/' + category.image_name } alt="Image" className="image" />
    </div>
  )
}