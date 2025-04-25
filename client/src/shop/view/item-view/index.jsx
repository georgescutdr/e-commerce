import React, { useEffect, useState } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import './item-view.css'

export const ItemView = ({item}) => {
	const params = useParams()
	const paramValues = Object.values(params)
	
	console.log(item)
	
	const imageUrl =
		item.files && item.files.length > 0
			? `/public/uploads/${props.table}/${item.id}/${item.files[0].file_name}`
			: '/public/uploads/default-image.jpg'

	return (
			<>
				<div className="item-image-wrapper">
					<img src={imageUrl} alt={item.name} className="item-main-image" />
				</div>
				<div className="item-info">
					<h1 className="item-title">{item.name}</h1>
					<p className="item-description">{item.description}</p>
				</div>
			</>
	)
}
