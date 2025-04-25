import React, { useEffect, useState } from 'react'
import './view-items.css'
import Axios from 'axios'
import { ItemGrid } from '../../components/item-grid'
import { SearchPanel } from '../../components/search-panel'
import { ItemGridSkeleton } from '../../components/skeleton/item-grid-skeleton';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useParams, useLocation } from 'react-router-dom'
import { shopConfig } from '../../../config' 
import { capitalize } from '../../../utils'

const ViewItems = ({props}) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true);
    const params = useParams()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)

    useEffect(() => {
        let queryParams = {
            table: props.table,
        };

        if (props.table === 'product') {
            queryParams.category_id = params.id;
            queryParams.joinTables = [
                {table: 'promotion', fields: ['id', 'type', 'value', 'start_date', 'end_date'], pivot: true},
                {table: 'brand', fields: ['id', 'name'], pivot: true}, 
                {table: 'review', fields: ['rating'], pivot: true}, 
                {table: 'voucher', fields: ['id', 'expires_at'], pivot: true}, 
            ];
        }

        Axios.post(shopConfig.getItemsUrl, queryParams)
            .then((res) => {
                console.log(res.data)
                setItems(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading items:', err);
                setLoading(false);
            });
    }, []);

    console.log(searchParams.get('type'))

    // Get the last param value from URL
    const paramValues = Object.values(params)
    const title = props.label ? props.label : (paramValues.length > 0 ? capitalize(paramValues[paramValues.length-2]) : 'Shop')

    return (
        <div className="items-page">
            <div className="items-header">
                <h1>{title}</h1>
                <p>Browse our categories, brands, and products</p>
            </div>
            <div className="items-content-wrapper">
                <div className="search-panel-container">
                    <SearchPanel categoryId={ params.id } />
                </div>
                <div className="item-grid-container">
                    {loading ? (
                        <ItemGridSkeleton count={8} />
                    ) : (
                        <ItemGrid items={items} props={props} />
                    )}
                </div>
            </div>

        </div>
    );

}

export default ViewItems;
