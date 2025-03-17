import React, { useState, useEffect } from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export const BrandSelect = ({stateChanger}) => {
    const serverUrl = 'http://localhost:3001'
    const getBrandsUrl = serverUrl + '/api/get-brands'

    const [brandsList, setBrandsList] = useState([])

    const listBrands = brandsList.map(brand => <option key={ brand.id } value={ brand.id }>{ brand.name }</option>)

    //get brands
    useEffect(() => {
        Axios.get(getBrandsUrl).then((result) => {
           // console.log(result.data)
            setBrandsList(result.data)
        })
    }, [])

    return (
        <div className="">
            <div className="">
                <Form.Group className="mb-3">
                    <Form.Label>Select Brand</Form.Label>
                    <Form.Select as="select" size="lg" className="categories-select" onChange={(e) => stateChanger(e.target.value)}>
                        {listBrands}
                    </Form.Select>
                </Form.Group>
            </div>
        </div>
    )
}
