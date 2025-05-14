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
import { Header } from '../../components/header';
import { shopConfig } from '../../../config'
import { capitalize } from '../../../utils'

const ViewItems = ({ props }) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewLoading, setViewLoading] = useState(false)
    const [category, setCategory] = useState(null)
 
    // Initialize view mode from cookie or default to 'grid'
    const [viewMode, setViewModeState] = useState(() => Cookies.get('viewMode') || 'grid')

    const params = useParams()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    useEffect(() => {
        Axios.get(shopConfig.api.getProductsUrl, {params: {categoryId: params.id}})
            .then((res) => {
                console.log(res.data)
                setItems(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error loading items:', err)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        Axios.post(shopConfig.getItemsUrl, {table: 'category', id: params.id})
            .then((res) => {
                console.log(res.data[0])
                setCategory(res.data[0])
            })
            .catch((err) => {
                console.error('Error loading items:', err)
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
        <>
        <Header categoryId={params.id} />
        <div className="items-page">
            <div className="items-header">
                <div className="items-header-text">
                    <h1>{title}</h1>
                    <p>{category?.description}</p>
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
        </>
    )
}

export default ViewItems
