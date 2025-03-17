import React, { useState, useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'

export const ProductPrice = ({price, newPrice}) => {
	return (
		<>
			
			{ price == newPrice || !newPrice ? (
				<>
					<div className="p-2 new-price">
						<sup>$</sup>{ price }
					</div>
				</>
			) : (
				<Stack>
					<div className="p-2 old-price">
						<s><sup>$</sup>{ price }</s>
					</div>
					<div className="p-2 new-price">
						<sup>$</sup>{ newPrice }
					</div>
				</Stack>
			)}
		</>
	)
}

