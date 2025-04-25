import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getStockLabel } from '../../../utils'
import './stock-status.css'

export const StockStatus = ({quantity}) => {
	return (
		<>
			{ getStockLabel(quantity) }
		</>
	)
}

