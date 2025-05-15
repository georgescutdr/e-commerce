import React, { useEffect, useState } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { shopConfig } from '../../../config' 
import './view-item.css'
import { ProductView } from '../../view/product-view'
import { Header } from '../../components/header';
import { ProductSkeleton } from '../../components/skeleton/product-skeleton';

const ViewItem = ({props}) => {
	const [item, setItem] = useState(null)
	const params = useParams()
	const paramValues = Object.values(params)
	

	useEffect(() => {
        Axios.get(shopConfig.api.getProductsUrl, {params: {productId: params.id}})
            .then((res) => {
            	console.log(res.data)
            	setItem(res.data[0])
            })
            .catch((err) => console.error('Error loading items:', err))
    }, [params, props.table])

	if (!item) {
		return (
			<ProductSkeleton />
		)
	}

	const imageUrl =
		item.files && item.files.length > 0
			? `/public/uploads/${props.table}/${item.id}/${item.files[0].file_name}`
			: '/public/uploads/default-image.jpg'

	let view;

	switch(props.table) {
		case 'product':
			view = <ProductView item={ item } props={ props } />
			break;
		default:
			view = <ItemView item={ item } props={ props } />
	}

	return (
		<>
		<Header />
		<div className="item-view-page">
			<div className="item-view-container">
				{ view }
			</div>
		</div>
		</>
	)
}

export default ViewItem;
