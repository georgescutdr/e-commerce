import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Collapse from 'react-bootstrap/Collapse'
import { SelectItems } from '../components/select-items'
import { useLocation } from 'react-router'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tooltip } from 'primereact/tooltip'
import { ContextMenu } from 'primereact/contextmenu'
import { config, siteConfig } from '../config'
import './view-table.css'

export const ViewTable = ({items, props}) => {
    const serverUrl = 'http://localhost:3001'

    const [selectedItem, setSelectedItem] = useState(null)

    const toast = useRef(null)
    const cm = useRef(null)
    const dt = useRef(null)

    const columns = props.tableColumns.map((item) => 
        <Column 
            field={ item.field } 
            header={ item.header } 
            sortable={ item.sortable }>
        </Column>
    )

    const viewItem = (id) => {
        navigate("/admin/" + props.type + "/" + id)
    }

    const deleteItem = (id) => {
        Axios.get(config.api.deleteItem, {params: {id: id}}).then((result) => {
            setItems(items => items.filter((item) => id !== item.id))
            //setFadeSpinner(false)
            toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'The ' + type + ' "' + name + '" was deleted successfully', life: 3000 })
        })
    }

    const menuModel = [
        { label: 'View', icon: 'pi pi-fw pi-search', command: () => viewItem(selectedItem.id) },
        { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => confirm(event, selectedItem) }
    ]

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(items);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            })

            saveAsExcelFile(excelBuffer, props.type);
        })
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                })

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION)
            }
        })
    }

    const confirm = (event, item) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to delete the ' + type + ' "' + item.name + '"?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteItem(item.id, item.name),
            reject: () => {}
        });
    }

    const header = (
        <div className="flex align-items-center justify-content-end gap-2 p-datatable-header">
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded="true" onClick={ exportExcel } data-pr-tooltip="XLS" />
        </div>
    )

    return (
        <>
        <Toast ref={ toast } />
        <ConfirmDialog />
        <Tooltip target=".export-buttons>button" position="bottom" />
        <ContextMenu model={ menuModel } ref={ cm } onHide={() => setSelectedItem(null)} />
        <DataTable 
            value={ items } 
            header={ header } 
            paginator rows={ 15 }
            onContextMenu={(e) => cm.current.show(e.originalEvent)} 
            contextMenuSelection={ selectedItem } 
            onContextMenuSelectionChange={(e) => setSelectedOrder(e.value)}
            tableStyle={{ minWidth: '50rem' }}
            className="p-datatable"
            >
           { columns }
        </DataTable>
      </>
    )
}
