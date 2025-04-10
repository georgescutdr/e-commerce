import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './stock-status.css'

export const StockStatus = ({quantity}) => {
	const dollarIcon = <FontAwesomeIcon icon={ faDollarSign } className="text-green-600" />

	return (
		<>
			{ quantity && quantity > 0 ? (
				<>
					<div className="p-2 product-stock green">
						In stock
					</div>
				</>
			) : (
					<div className="p-2 product-stock red">
						Out of stock	
					</div>
			)}
		</>
	)
}

