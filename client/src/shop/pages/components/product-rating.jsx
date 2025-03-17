import React, { useState, useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'

export const ProductPrice = ({price, newPrice}) => {
	return (
		<>
			
			{ price == newPrice ? (
				<h2>
					<sup>$</sup>{ price }
				</h2>
			) : (
				<Stack>
					<div className="p-2">
						<h4>
							<s><sup>$</sup>{ price }</s>
						</h4>
					</div>
					<div className="p-2">
						<h2>
							<sup>$</sup>{ newPrice }
						</h2>
					</div>
				</Stack>
			)}
		</>
	)
}

