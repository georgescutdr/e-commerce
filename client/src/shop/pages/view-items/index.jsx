import React, { useEffect, useState } from 'react'
import './view-items.css'
import Axios from 'axios'
import { ItemGrid } from '../../components/item-grid'
import { useParams, useLocation } from 'react-router-dom'
import { shopConfig } from '../../../config' 
import { capitalize } from '../../../utils'

const ViewItems = ({props}) => {
    const [items, setItems] = useState([])
    const params = useParams()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)

    useEffect(() => {
        props.table = searchParams.get('type')

        let queryParams = {
            table: props.table,
          //  joinTables: props.joinTables
        }

        if(props.table == 'category' && params.id) {
            queryParams.parent_id = params.id
        }

        Axios.get(shopConfig.getItemsUrl, { params: queryParams })
            .then((res) => setItems(res.data))
            .catch((err) => console.error('Error loading items:', err))
            
    }, [])

    console.log(searchParams.get('type'))

    // Get the last param value from URL
    const paramValues = Object.values(params)
    const title = props.label ? props.label : (paramValues.length > 0 ? capitalize(paramValues[paramValues.length-2]) : 'Shop')

    return (
        <div className="items-page">
            <div className="items-header">
                <h1>{ title }</h1>
                <p>Browse our categories, brands, and products</p>
            </div>
            <ItemGrid items={ items } props={ props } />
        </div>
    )
}

export default ViewItems;
