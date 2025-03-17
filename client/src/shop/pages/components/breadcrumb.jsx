import React, { useState, useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { capitalize } from '../../../utils'

export const Breadcrumbs = ({params, brand}) => {
	return (
	    <Breadcrumb>
	    	{params.category && (
	    		<Breadcrumb.Item href={ '/browse/' + params.category }>{ capitalize(params.category) }</Breadcrumb.Item>
	    	)}

	    	{params.subcategory && (
	    		<Breadcrumb.Item href={ '/browse/' + params.category + '/' + params.subcategory } >{ capitalize(params.subcategory) }</Breadcrumb.Item>
	    	)}

	    	{params.brand && (
	    		<Breadcrumb.Item href={ '/browse/' + params.brand + '/'}>{ capitalize(params.brand) } Products</Breadcrumb.Item>
	    	)}
	    </Breadcrumb>
  ) //put active on item for active crumb
}

