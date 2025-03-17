import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';

export const FileUploadForm = ({id, setImages, images, multiple, type, setImageName}) => {
  const serverUrl = 'http://localhost:3001'
  const uploadUrl = serverUrl + '/api/upload'

  const [files, setFiles] = useState([])

  const onChange = e => {
    console.log(e.target.files)
    setFiles(e.target.files)
  }

  const onSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("type", type) 
    formData.append("id", id) 

    Object.values(files).forEach(file=>{
      formData.append("uploadImages", file)
    })

    try {
      const res = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
       
      console.log('RES: ' +  JSON.stringify(res))
      switch(type) {
        case 'product':
        //  setImages(images => [...images, {product_id: id, image_name: res.data.filename, image_url: ''}])
          break;
        default:
          setImageName(res.data.filename)
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err)
      } else {
        console.log(err.response.data.msg)
      }
    }
  }

  return (
    <>
      <form onSubmit={ onSubmit }>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <Form.Control type='file' id='file' name="uploadImages" multiple={ multiple } onChange={ onChange } />
          </div>
          <div className="p-2">
            <Button variant="primary" type="submit">Upload</Button>
          </div>
        </Stack>
      </form>
    </>
  )
}

