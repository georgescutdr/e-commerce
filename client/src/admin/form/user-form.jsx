import React, { useState, useEffect, useRef } from 'react'
import '../admin.css'
import Axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { FileUploadForm } from './file-upload-form'
import { ImageCard } from '../components/image-card'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { InputSwitch } from 'primereact/inputswitch'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'

const UserForm = ({id}) => {
    const serverUrl = 'http://localhost:3001'
    const insertUserUrl = serverUrl + '/api/insert-user'
    const updateUserUrl = serverUrl + '/api/update-user'
    const deleteUserUrl = serverUrl + '/api/delete-user'
    const getUserUrl = serverUrl + '/api/get-user'

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState('')
    const [newsletter, setNewsletter] = useState('')
    const [role, setRole] = useState(0)
    const [lastLogin, setLastLogin] = useState('')
    const [createdAt, setCreatedAt] = useState(0)
    const [updatedAt, setUpdatedAt] = useState(0)
    
    const [dialogContent, setDialogContent] = useState(false)

    const toast = useRef(null)

    let navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        if(params.statusId) {
           Axios.get(getUserUrl, {params: {id: params.userId}}).then((result) => {
               setFirstName(result.data[0].first_name)
               setLastName(result.data[0].last_name)
               setPassword(result.data[0].password)
               setEmail(result.data[0].email)
               setPhone(result.data[0].phone)
               setBirth(result.data[0].date_of_birth)
               setGender(result.data[0].gender)
               setNewsletter(result.data[0].newsletter_subscribed)
               setRole(result.data[0].role)
               setLastLogin(result.data[0].last_login)
               setCreatedAt(result.data[0].created_at)
               setUpdatedAt(result.data[0].updated_at)
           }) 
        }
    }, [])

    const submitUser = () => {
        let url = params.userId ? updateUserUrl : insertUserUrl

        Axios.post(url, {
            id: params.userId,
            firstName: firstName,
            lastName: lastName,
            pasword: password,
            email: email,
            phone: phone,
            birth: birth,
            gender: gender,
            newsletter: newsletter,
            role: role
        }).then((result) => {
           let message = 'The user with the name "' + firstName + ' ' + lastName + '" was successfully ' + (id ?  'modified' : 'added')
           navigate("/admin/users", {state: {shipping: message}})
        })
    }

    const deleteUser = (id) => {
        Axios.get(deleteUserUrl, {params: {
            id: id 
        }}).then((result) => {
            let message = 'The user with name "' + firstName + ' ' + lastName + '" was successfully deleted'
            navigate("/admin/users", { state: { user: message }})
        })
    }

    const confirm = (event, itemId) => {
        confirmDialog({
            trigger: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteUser(itemId),
            reject: () => {}
        });
    }

    return (
        <>
                <Toast ref={ toast } />
                <ConfirmDialog />
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" value={ firstName } onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" value={ lastName } onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" value={ password } onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control type="text" value={ password } onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="text" value={ email } onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={ phone } onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <Calendar value={ birth } onChange={(e) => setBirth(e.value)} showIcon  />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Dropdown 
                    	value={ gender } 
                    	onChange={(e) => setSelectedCity(e.value)} 
                    	options={[{name: 'Male', code: 'M'}, {name: 'Female', code: 'F'}]} 
                    	optionLabel="gender"
                    	placeholder="Select a gender" 
                    	className="w-full md:w-14rem" 
                    	/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Newsletter subscribed</Form.Label>
                    <InputSwitch checked={ newsletter } onChange={(e) => setNewsletter(e.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Dropdown 
                    	value={ role } 
                    	onChange={(e) => setSelectedCity(e.value)} 
                    	options={[{name: 'User', code: 'U'}, {name: 'Admin', code: 'A'}]} 
                    	optionLabel="role"
                    	placeholder="Select a Role" 
                    	className="w-full md:w-14rem" 
                    	/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last login</Form.Label>
                    { lastLogin }

                    <Form.Label>Created at</Form.Label>
                    { createdAt }

                    <Form.Label>Updated at</Form.Label>
                    { updatedAt }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Stack direction="horizontal" gap={3}>
                        <Button className="p-2" variant="primary" size="lg" onClick={() => { submitUser()}}> Save </Button>
                        <Button className="p-2" variant="secondary" size="lg" onClick={() => navigate('/admin/users')}> Back </Button>
                        <Button className="p-2 ms-auto" variant="danger" size="lg" onClick={(e) => confirm(e, id)}> Delete </Button>
                    </Stack>
                </Form.Group>
        </>
    )
}

export default UserForm
