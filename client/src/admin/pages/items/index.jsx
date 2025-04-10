import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useLocation } from 'react-router'
import { siteConfig, config } from './config'
import { capitalize } from '../utils'
import { ProgressSpinner } from 'primereact/progressspinner'
import 'primeicons/primeicons.css'
import './items.css'
import { ViewList } from './view/view-list'
import { ViewTable } from './view/view-table'

export const Items = ({ props }) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate()
    let location = useLocation()

    const toast = useRef(null)

    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 })
    }

    useEffect(() => {
        if (location.state && location.state.message) {
            showSuccess(location.state.message)
        }

        Axios.get(config.api.getItemsUrl, {params: {table: props.table}}).then((result) => {
            setItems(result.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            <Toast ref={toast} />
            <div className="header-container">
                <h2>{props.title}</h2>
                <p>{props.description || 'Explore and manage the content of your platform easily.'}</p>
                <div className="header-actions">
                    {items.length > 0 && (
                        <Button
                            className="add-btn "
                            variant="primary"
                            size="bg"
                            icon="pi pi-plus"
                            onClick={() => { navigate('/admin/insert-' + props.type) }}>
                            Add New 
                        </Button>
                    )}

                    {props.import && (
                        <Button
                            className="import-btn "
                            variant="primary"
                            size="bg"
                            icon="pi pi-file-import"
                            onClick={() => { navigate(props.import.route) }}>
                            Import
                        </Button>
                    )}
                </div>
            </div>
            <div className="view-container">
                {loading ? (
                    <div className="spinner-container">
                        <ProgressSpinner />
                    </div>
                ) : (
                    <>
                        {items.length === 0 ? (
                            <div className="no-items-container">
                                <div className="message">No Items Available</div>
                                <div className="sub-message">
                                    It seems there are no items in this category. Please add some to get started.
                                </div>
                                <button className="add-item-btn" onClick={() => navigate('/admin/insert-' + props.type)}>
                                    Add New {capitalize(props.type.replace('-', ' '))}
                                </button>
                            </div>
                        ) : (
                            <>
                                {props.dataType === 'list' && <ViewList items={items} setItems={setItems} props={props} />}
                                {props.dataType === 'table' && <ViewTable items={items} setItems={setItems} props={props} />}
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
