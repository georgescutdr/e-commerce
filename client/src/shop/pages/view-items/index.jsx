import React, { useEffect, useState } from 'react'
import './view-items.css'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { ItemGrid } from '../../components/item-grid'
import { ItemStack } from '../../components/item-stack'
import { SearchPanel } from '../../components/search-panel'
import { ViewToggleButtons } from '../../components/view-toggle-buttons'
import { ItemGridSkeleton } from '../../components/skeleton/item-grid-skeleton'
import { ItemStackSkeleton } from '../../components/skeleton/item-stack-skeleton'
import { useParams, useLocation } from 'react-router-dom'
import { shopConfig } from '../../../config'
import { capitalize } from '../../../utils'

const ViewItems = ({ props }) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewLoading, setViewLoading] = useState(false)

    // Initialize view mode from cookie or default to 'grid'
    const [viewMode, setViewModeState] = useState(() => Cookies.get('viewMode') || 'grid')

    const params = useParams()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    useEffect(() => {
        let queryParams = {
            table: props.table,
        }

        if (props.table === 'product') {
            queryParams.category_id = params.id
            queryParams.joinTables = [
                { table: 'promotion', fields: ['id', 'name', 'type', 'value', 'start_date', 'end_date'], pivot: true },
                { table: 'brand', fields: ['id', 'name'], pivot: true },
                { table: 'review', fields: ['rating'], pivot: true },
                { table: 'voucher', fields: ['id', 'expires_at'], pivot: true },
            ]
        }

        Axios.post(shopConfig.getItemsUrl, queryParams)
            .then((res) => {
                setItems(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error loading items:', err)
                setLoading(false)
            })
    }, [])

    // Save view mode to cookies
    const setViewMode = (mode) => {
        setViewLoading(true)
        Cookies.set('viewMode', mode, { expires: 7 })
        setTimeout(() => {
            setViewModeState(mode)
            setViewLoading(false)
        }, 300) // 300ms delay for smooth transition
    }


    const paramValues = Object.values(params)
    const title = props.label ? props.label : (paramValues.length > 0 ? capitalize(paramValues[paramValues.length - 2]) : 'Shop')

    return (
        <div className="items-page">
            <div className="items-header">
                <div className="items-header-text">
                    <h1>{title}</h1>
                    <p>Browse our categories, brands, and products</p>
                </div>
                <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            <div className="items-content-wrapper">
                <div className="search-panel-container">
                    <SearchPanel categoryId={params.id} displayOnly={true} />
                </div>
                <div className={`item-grid-container ${viewMode} ${viewLoading ? 'loading-overlay' : ''}`}>
                    {loading ? (
                        viewMode === 'grid'
                            ? <ItemGridSkeleton count={8} />
                            : <ItemStackSkeleton count={3} />
                        
                    ) : (
                        viewMode === 'grid'
                            ? <ItemGrid items={items} props={props} />
                            : <ItemStack items={items} props={props} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewItems
