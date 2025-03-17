import React from 'react'
import Table from 'react-bootstrap/Table';

export const ProductAttributes = ({attributes}) => {

    const attributesList = attributes.map((attribute) => {
        return (
            <tr key={ attribute.name }>
                <td>{ attribute.name }</td>
                <td>{ attribute.value }</td>
            </tr>   
    )})

    return (
        <Table striped bordered hover style={{disply:'flex', justifyContent:'left'}}>
            <thead>
              
            </thead>
            <tbody>
                { attributesList } 
            </tbody>
        </Table>
    )
}
