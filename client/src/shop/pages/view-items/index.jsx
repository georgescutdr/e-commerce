import React, { useEffect, useState, useCallback } from 'react'
import './view-items.css'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { ItemGrid } from '../../components/item-grid'
import { ItemStack } from '../../components/item-stack'
import { SearchPanel } from '../../components/search-panel'
import { ViewToggleButtons } from '../../components/view-toggle-buttons'
import { ItemGridSkeleton } from '../../components/skeleton/item-grid-skeleton'
import { ItemStackSkeleton } from '../../components/skeleton/item-stack-skeleton'
import { useParams } from 'react-router-dom'
import { Header } from '../../components/header'
import { shopConfig } from '../../../config'
import { capitalize } from '../../../utils'

const ITEMS_PER_PAGE = 20

const ViewItems = ({ props }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [category, setCategory] = useState(null)
  const [viewLoading, setViewLoading] = useState(false)

  const [viewMode, setViewModeState] = useState(() => Cookies.get('viewMode') || 'grid')

  const params = useParams()

  // Fetch category details once on mount or when params.id changes
  useEffect(() => {
    Axios.post(shopConfig.getItemsUrl, { table: 'category', id: params.id })
      .then(res => {
        setCategory(res.data[0])
      })
      .catch(err => {
        console.error('Error loading category:', err)
      })
  }, [params.id])

  // Fetch items function with pagination
  const fetchItems = useCallback((pageToLoad) => {
    return Axios.get(shopConfig.api.getProductsUrl, {
      params: {
        categoryId: params.id,
        page: pageToLoad,
        limit: ITEMS_PER_PAGE
      }
    })
  }, [params.id])

  // Initial and param.id change load
  useEffect(() => {
    setLoading(true)
    setPage(1)
    setHasMore(true)
    setItems([])

    fetchItems(1)
      .then(res => {
        setItems(res.data)
        setLoading(false)
        if (res.data.length < ITEMS_PER_PAGE) { 
            setHasMore(false)
        }
      })
      .catch(err => {
        console.error('Error loading items:', err)
        setLoading(false)
      })
  }, [params.id, fetchItems])

  // Load more items when called
  const loadMore = () => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)
    const nextPage = page + 1

    fetchItems(nextPage)
      .then(res => {
        setItems(prevItems => [...prevItems, ...res.data])
        setPage(nextPage)
        setLoadingMore(false)
        if (res.data.length < ITEMS_PER_PAGE) setHasMore(false)
      })
      .catch(err => {
        console.error('Error loading more items:', err)
        setLoadingMore(false)
      })
  }

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasMore && !loadingMore && !loading
      ) {
        loadMore()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, loadingMore, loading])

  // Determine title for header
  const paramValues = Object.values(params)
  const title = props.label ? props.label : (paramValues.length > 0 ? capitalize(paramValues[paramValues.length - 2]) : 'Shop')

  // View mode toggle handler
  const setViewMode = (mode) => {
    setViewLoading(true)
    Cookies.set('viewMode', mode, { expires: 7 })
    setTimeout(() => {
      setViewModeState(mode)
      setViewLoading(false)
    }, 300)
  }

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
            ) : items.length === 0 ? (
              <div className="no-items-message">No items found in this category.</div>
            ) : (
              <>
                {viewMode === 'grid'
                  ? <ItemGrid items={items} props={props} />
                  : <ItemStack items={items} props={props} />
                }
                {loadingMore && (
                  viewMode === 'grid' ? <ItemGridSkeleton count={4} /> : <ItemStackSkeleton count={2} />
                )}
                {!loading && (
                  <button
                    className="back-to-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    ↑ Top
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewItems
