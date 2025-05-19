import React from 'react';
import './item-grid.css';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../cards/grid-item/product-card';

export const ItemGrid = ({ items, props }) => {
    const params = useParams();

    let table;
    switch (props.table) {
        case 'category':
            table = 'product';
            break;
        case 'product':
            table = 'view_product';
            break;
        default:
            table = props.table;
    }
 
    return (
        <>
            {Array.isArray(items) && items.length > 0 && (
                <div className="grid-container">
                    {items.map((item) => (
                        <ProductCard key={item.product_code} item={item} table={table} toast={props.toast} />
                    ))}
                </div>
            )}
        </>
    );
};
