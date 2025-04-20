import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { useForm } from 'react-hook-form'
import './item.css'
import './form-styles.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { InputSwitch } from 'primereact/inputswitch'
import { Editor } from 'primereact/editor'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { FileUpload } from 'primereact/fileupload'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { Toast } from 'primereact/toast'
import { InputTextarea } from 'primereact/inputtextarea'
import { TabView, TabPanel } from 'primereact/tabview'
import { ProgressSpinner } from 'primereact/progressspinner'
import { config, siteConfig } from '../../../config'

export const Item = ({route, props}) => {
    const [item, setItem] = useState(null)
    const [formConfig, setFormConfig] = useState(null)
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState({})
    const [itemData, setItemData] = useState(null)
    const [deletedFiles, setDeletedFiles] = useState([])
    const [files, setFiles] = useState([]);

    const {register, handleSubmit, setValue, formState: { errors }} = useForm()

    const toast = useRef(null);

    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation();

    const isImportPage = location.pathname.includes('/admin/import-');

    const showMessage = (severity, label, message) => {
        toast.current.show({ severity: severity, summary: label, detail: message });
    };

    useEffect(() => {
       // console.log(props)
        //Load form schema from anywhere
        const loadFormSchema = () => {
            setFormConfig(props)
        }
        
        loadFormSchema()
    }, [])

    useEffect(() => {
        if (!formConfig) 
            return

        if (params.itemId) {
            Axios.get(config.api.getItemsUrl, {params: {
                id: params.itemId, 
                table: formConfig.table
            }}).then((result) => {
                setItemData(result.data[0])
            })
        }

        formConfig.fields.forEach(async (field) => {
            if (field.type === "select" && field.options.url) {
                try {
                //    const response = await Axios.get(field.options.url, {params: {table: field.options.table}})
                    Axios.get(field.options.url, {params: {table: field.options.table}}).then((result) => {
                        // Prepend an empty option to the fetched options
                        const optionsWithDefault = [{ name: "Select option", value: "" }, ...result.data]

                        //setOptions((prevOptions) => ({ ...prevOptions, [field.name]: result.data }))
                        setOptions((prevOptions) => ({
                            ...prevOptions,
                            [field.name]: optionsWithDefault
                        }))
                    })
                } catch (error) {
                    console.error(`Error fetching options for ${field.name}:`, error)
                }
            }
        })
    }, [formConfig])

    // Prefill form when editing an item
    useEffect(() => {
        console.log(itemData)
        if (itemData) {
            Object.keys(itemData).forEach((key) => {
                if(key !== 'id') {
                    setValue(key, itemData[key])    
                }
            })
        }
    }, [itemData, setValue])

    const onSubmit = async (data) => {
        if (!formConfig) return

        setLoading(true)

        try {
            const formData = new FormData()

            const columns = isImportPage ? formConfig.import.columns : formConfig.fields
          
            formData.append('itemType', formConfig.type)
            formData.append('table', formConfig.table)
            formData.append('columns', JSON.stringify(columns))
            formData.append('deletedFiles', JSON.stringify(deletedFiles))

            // Include itemId if available
            if (params.itemId && !formData.has('id')) {
                formData.append('id', params.itemId);
            }

            if(isImportPage) {
                formData.append("file", data.file[0]) 
            } 

            let hasFiles = false

            try {
                Object.keys(data).forEach((key) => {
                    if (key === "files") {
                        console.log("Files before mapping:", data.files);
                        const filesArray = Array.from(data.files); // Convert FileList to Array

                        if (!Array.isArray(filesArray)) {
                            throw new Error("data.files is not an array!");
                        }

                        filesArray.forEach(file => {
                            // Check if the file is already present in the itemData.files
                            const isFileAlreadyPresent = itemData?.files?.some(existingFile => existingFile.file_name === file.file_name);
                            if (!isFileAlreadyPresent) {
                                console.log("Appending file:", file);
                                formData.append("files", file);
                            }
                        });

                        hasFiles = true;
                    } else {
                        formData.append(key, data[key]);
                    }
                });
            } catch (err) {
                console.error("Error in data processing:", err);
            }

            const url = isImportPage ? config.api.imporItemstUrl : config.api.saveItemUrl
            const contentType = hasFiles || isImportPage ? 'multipart/form-data' : 'application/json'
        
        console.log("POST to:", url, "with Content-Type:", contentType);

            await Axios.post(url, formData, {
                headers: {"Content-Type": contentType}
            }) 

            if(params.itemId) {
                showMessage('success', 'Success', "The " + formConfig.type + " was updated successfully!")
            } else {
                let message = 'The ' + formConfig.type + ' was successfully added'
                navigate('/admin/' + formConfig.type, {state: {message: message}})
            }
           
        } catch (error) {
            showMessage('error', 'Error', "Error submitting form. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const downloadExampleFile = () => {
        
        const fullExampleFileUrl = formConfig.import.exampleFileUrl.startsWith('http')
            ? formConfig.import.exampleFileUrl
            : siteConfig.serverUrl + formConfig.import.exampleFileUrl

        Axios.get(fullExampleFileUrl, {params: {
                itemType: formConfig.type, 
                columns: JSON.stringify(formConfig.import.columns)
            }}).then((response) => {
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `example-${formConfig.type}-file.xls` // Set the file name
                document.body.appendChild(a)
                a.click()
                a.remove()

        // Revoke the URL object to clean up
        window.URL.revokeObjectURL(url);
          })
          .catch((error) => {
            console.error('Error downloading the file:', error);
          });
    }

    // Function to simulate deleting an image
    function deleteFile(file) {
        if (file.preview) {
            // It's a newly uploaded file (from input)
            setFiles(prevFiles => prevFiles.filter((f) => f.id !== file.id));
        } else {
            // It's an existing file from DB
            const updatedFiles = itemData.files.filter(f => f.id !== file.id);
            setItemData({
                ...itemData,
                files: updatedFiles
            });
            setDeletedFiles(prev => [...prev, { id: file.id, filename: file.file_name }]); 
        }
    }

    // Function to render image previews with delete buttons
    function renderFilePreviews(files) {
        return (
            <>
            {files.map((file) => {
                return (
                    <div className="image-card" key={file.id}>
                        <img 
                            className="image-preview" 
                            src={ file.preview ? file.preview : `/public/uploads/${formConfig.table}/${itemData.id}/${file.file_name}`} 
                            alt={file.file_name} 
                        />
                        <button
                            className="delete-button"
                            onClick={() => deleteFile(file)}
                        >
                            Delete
                        </button>
                    </div>
                )
            })}
            </>
        )      
    }

    // Function to handle file selection
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files).map((file, index) => ({
            id: `new_${Date.now()}_${index}_${file.name}`, // Generate a unique ID
            file_name: file.name,
            preview: URL.createObjectURL(file), // Create a preview URL
        }));
        
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Append new files
    };

    let pageTitle = (isImportPage ? props.import.label : (params.itemId ? 'Edit' : 'Insert') + ' ' + props.type.replace('-', ' '))  
    let subTitle = (isImportPage ? 'Upload an Excel or CSV file for import.' : 'Fill in the details below to ' + (params.itemId ? 'edit' : 'add') + ' an item.') 

    if (!formConfig) return <p>Loading form...</p>;

    return (
        <>
            <div>
                <Toast ref={ toast } />
                <div className="form-header">
                    <div>
                        <h2><i className="pi pi-pencil icon"></i>{pageTitle}</h2>
                        <p>{ subTitle }</p>
                    </div>
                    <div className="action-buttons">
                        <button className="back-button" onClick={() => navigate('/admin/' + props.type)}>Cancel</button>
                    </div>
                </div>
                <div className="form-container">
                {loading && (
                    <div className="spinner-container">
                        <ProgressSpinner />
                    </div>
                )}
                <form onSubmit={ handleSubmit(onSubmit) } encType="multipart/form-data">
                    {formConfig.import && (
                        <div className="import-container">
                            <label>Upload file</label>
                            <input 
                                type="file" 
                                {...register('files', { required: `Field required` })}
                                name="files" 
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                                maxfilesize={1000000} 
                            />
                            <button className="example-file-button" type="button" onClick={() => downloadExampleFile()}>
                                Download example file
                            </button>
                        </div>
                    )}
                    {!formConfig.import && formConfig.fields.map((field) => (
                        <div className="field-section" key={ field.name }>
                            <label>{ field.label }</label>

                            {field.type == 'select' && (
                                <select {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}>
                                    {options[field.name]?.map((option) => (
                                      <option key={ option.id } value={ option.id }>{ option.name }</option>
                                    ))}
                                </select>
                            )}

                            {field.type == 'textarea' && (
                                <InputTextarea 
                                    autoResize
                                    {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}
                                    name={ field.name } 
                                />
                            )}

                            {field.type == 'date' && (
                               
                                    <Calendar 
                                        inputId={ field.name } 
                                        {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}
                                        showIcon  
                                    />
                              
                            )}

                            {field.type == 'text' && (
                                    <InputText 
                                        name={ field.name } 
                                        {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}
                                    />
                            )}

                            {field.type == 'file' && (
                                    <>
                                    <input 
                                        type="file" 
                                        {...register("files", field.required ? { required: `${field.label} is required` } : {})}
                                        name="files"
                                        multiple={ true } 
                                        onChange={ handleFileChange }
                                        maxfilesize={ 1000000 } 
                                    />
                                    {((itemData && itemData.files.length > 0 ) || (files && files.length > 0))  && (
                                        <div className="form-image-container">
                                            <div id="image-container">
                                                {itemData && itemData.files && itemData.files.length > 0 &&
                                                    renderFilePreviews(itemData.files)
                                                }
                                                {files.length > 0 &&
                                                    renderFilePreviews(files)
                                                }
                                            </div>
                                        </div>        
                                    )}
                                    </>
                            )}

                            {field.type == 'switch' && (
                                    <InputSwitch 
                                        {...register(field.name, field.required ? { required: `${field.label} is required` } : {})}
                                        id={ field.name }   
                                    />
                            )}
                        </div>  
                    ))}
                    <div className="form-actions">
                        <button className="submit-btn button" type="submit" disabled={ loading }>
                            {loading ? "Submitting..." : params.itemId ? "Update" : "Submit"}
                        </button>
                        <button className="cancel-btn button" type="button" onClick={() => navigate('/admin/' + props.type)}>
                            Back
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}
