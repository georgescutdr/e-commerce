import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from 'primereact/button'
import { Tooltip } from 'primereact/tooltip'
import Stack from 'react-bootstrap/Stack'
import Collapse from 'react-bootstrap/Collapse'
import { SelectItems } from '../components/select-items'
import { useLocation } from 'react-router'
import { Toast } from 'primereact/toast'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ContextMenu } from 'primereact/contextmenu'
import 'primeicons/primeicons.css'

export const Orders = () => {
    const serverUrl = 'http://localhost:3001'
    const getOrdersUrl = serverUrl + '/api/get-orders'

    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [fadeSpinner, setFadeSpinner] = useState(false)

    let navigate = useNavigate()
    let location = useLocation()

    const toast = useRef(null)
    const dt = useRef(null)
    const cm = useRef(null)

    const showSuccess = (message) => {
        toast.current.show({severity:'success', summary: 'Success', detail: message, life: 3000})
    }

    useEffect(() => {
        //setFadeSpinner(true)

        if(location.state && location.state.brand) {
            showSuccess(location.state.brand)
        }

        Axios.get(getOrdersUrl).then((result) => {
              setOrders(result.data)
              console.log(result)

          //  setFadeItems(true);
          //  setFadeSpinner(false)
        })
    }, [])

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly })
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0)

                doc.autoTable(exportColumns, orders)
                doc.save('product_orders.pdf')
            })
        })
    }

    const cols = [
        { field: 'code', header: 'Code' },
        { field: 'username', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'payment_method', header: 'Payment method' },
        { field: 'payment_status', header: 'Payment status' },
        { field: 'order_status', header: 'Order status' },
        { field: 'discount', header: 'Discount' },
        { field: 'total', header: 'Total' },
        { field: 'order_date', header: 'Order date' },
    ]

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }))

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(orders);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            })

            saveAsExcelFile(excelBuffer, 'product-orders');
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

    const viewOrder = (id) => {
        navigate("/admin/view-order/" + id)
    }

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={ exportExcel } data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={ exportPdf } data-pr-tooltip="PDF" />
        </div>
    )


    const menuModel = [
        { label: 'View', icon: 'pi pi-fw pi-search', command: () => viewOrder(selectedOrder.id) },
        { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => deleteOrder(selectedOrder) }
    ]

    return (
      <>
        <Toast ref={ toast } />
        <Stack gap={3}> 
            <div className="page-title">
              <h1>Orders</h1>
            </div>
            <div className="card">
                <Tooltip target=".export-buttons>button" position="bottom" />
                <ContextMenu model={ menuModel } ref={ cm } onHide={() => setSelectedOrder(null)} />
                <DataTable 
                    value={ orders } 
                    header={ header } 
                    paginator rows={ 15 }
                    onContextMenu={(e) => cm.current.show(e.originalEvent)} 
                    contextMenuSelection={ selectedOrder } 
                    onContextMenuSelectionChange={(e) => setSelectedOrder(e.value)}
                    tableStyle={{ minWidth: '50rem' }}
                    >
                        <Column field="id" header="ID" sortable></Column>
                        <Column field="code" header="Code" sortable></Column>
                        <Column field="username" header="User name" sortable></Column>
                        <Column field="email" header="User email" sortable></Column>
                        <Column field="payment_method" header="Payment method" sortable></Column>
                        <Column field="payment_status" header="Payment status" sortable></Column>
                        <Column field="order_status" header="Order status" sortable></Column>
                        <Column field="discount" header="Discount" sortable></Column>
                        <Column field="total" header="Total" sortable></Column>
                        <Column field="order_date" header="Order date" sortable></Column>
                </DataTable>
            </div>
        </Stack>
      </>
      )
}
