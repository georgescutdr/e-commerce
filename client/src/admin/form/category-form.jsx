import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { CategorySelect } from '../components/category-select' 
import { FileUploadForm } from './file-upload-form'
import { ImageCard } from '../components/image-card'
import { Editor } from 'primereact/editor'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import "primereact/resources/themes/lara-light-cyan/theme.css"

const CategoryForm = ({id}) => {
    const serverUrl = 'http://localhost:3001'
    const insertCategoryUrl = serverUrl + '/api/insert-category'
    const updateCategoryUrl = serverUrl + '/api/update-category'
    const getCategoryUrl = serverUrl + '/api/get-category'
    const deleteCategoryUrl = serverUrl + '/api/delete-category'
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [slug, setSlug] = useState('')
    const [category, setCategory] = useState(0)
    const [imageName, setImageName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()

    const showError = () => {
        let type = id ? 'update' : 'insert'
        toast.current.show({severity:'error', summary: 'Error', detail:'Failed to  ' + type + ' the category', life: 3000});
    }

    useEffect(() => {
        if(id > 0) {
           Axios.get(getCategoryUrl, {params: {id: id}}).then((result) => {
             console.log(result.data[0])
               setName(result.data[0].name)
               setDescription(result.data[0].description)
               setSlug(result.data[0].slug)
               setCategory(result.data[0].parent_id)
               setImageName(result.data[0].image_name)
               setImageUrl(result.data[0].image_url)
           }) 
        }
    }, [])

    const submitCategory = () => {
        let url = id > 0 ? updateCategoryUrl : insertCategoryUrl

        Axios.post(url, {
            id: id,
            name: name,
            description: description,
            slug: slug,
            category: category 
        }).then((result) => {
           let message = id ? 'The category "' + name + '" was successfully modified' : 'The category "' + name + '" was successfully added'
           navigate("/admin/categories", {state: {category: message}})
        })
    }

    const deleteCategory = (id) => {
        Axios.get(deleteCategoryUrl, {params: {id: id}}).then((result) => {
            let message = 'The category "' + name + '" was successfully deleted'
            navigate("/admin/categories", { state: { category: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteCategory(itemId),
            reject: () => {}
        });
    }

    return (
      <>
                <Toast ref={ toast } />
                <ConfirmDialog />
                <div className="card flex justify-content-center">
                    <FloatLabel>
                        <InputText id="name" value={ name } onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Category name</label>
                    </FloatLabel>
                </div>
                <div className="card flex justify-content-center">
                    <Editor value={ description } placeholder="Category description" onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '320px' }} />
                </div>
                <div className="card flex justify-content-center">
                    <FloatLabel>
                        <InputText id="slug" value={ slug } onChange={(e) => setSlug(e.target.value)} />
                        <label htmlFor="slug">Category slug</label>
                    </FloatLabel>
                </div>
                <div className="card flex justify-content-center">
                    <Form.Label>Select parent</Form.Label>
                    <CategorySelect type="parents" category={ category } stateChanger={ setCategory }/>
                </div>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Stack gap={3}>
                            <div className="p-2">
                                <FileUploadForm type="category" id={ id } multiple="" setImageName={ setImageName } />
                            </div>
                            <div className="p-2">
                                { imageName && <ImageCard id={ id } type="category" imageName={ imageName } setImageName={ setImageName } /> }
                            </div>
                        </Stack>
                    </Form.Group>
                <div className="card flex justify-content-center">
                    <Stack direction="horizontal" gap={3}>
                        <Button onClick={() => submitCategory()} variant="primary"> Save </Button>
                        <Button onClick={() => navigate('/admin/categories')} variant="secondary">Back</Button>
                        { 
                            id && 
                            <Button variant="danger" label="Delete" onClick={(e) => confirm(e, id)}>Delete</Button>
                        }
                    </Stack>
                </div>
      </>
    )
}

export default CategoryForm
