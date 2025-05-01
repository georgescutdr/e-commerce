import React from 'react';
import './item-stack.css';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../cards/stack-item/product-card';

export const ItemStack = ({ items, props }) => {
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
            {Array.isArray(items) && items.length > 0 ? (
                <div className="stack-container">
                    {items.map((item) => (
                        <ProductCard key={item.id} item={item} table={table} />
                    ))}
                </div>
            ) : (
                <div className="no-items-container">
                    <p className="no-items">No items found! Try another category.</p>
                </div>
            )}
        </>
    );
};
