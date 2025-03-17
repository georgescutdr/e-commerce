import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'

export const ProductOptions = ({productOptions}) => {
    const optionsList = productOptions.map((option) => {
        return (
            <h3 key={ option.name }>
                <Badge bg="success">{ option.name }</Badge>
            </h3>  
        )
    })

    return (
        <Stack direction="horizontal" gap={3}>
            { optionsList } 
        </Stack>
    )
}
