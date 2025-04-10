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

export const ViewList = ({items, props, setItems}) => {

    return (
        <>
            <SelectItems items={ items } setItems={ setItems } type={ props.type } />
        </>
      )
}
