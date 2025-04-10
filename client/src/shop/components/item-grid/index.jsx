import React from 'react';
import './item-grid.css';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { AddToCartButton } from './add-to-cart-button'
import { StockStatus } from './stock-status'
import { Price } from './price'


export const ItemGrid = ({items, props}) => {
    const params = useParams()

    let table;

    switch(props.table) {
        case 'category':
            table = 'product'
            break;
        case 'product':
            table = 'view_product'
            break
        default:
            table = props.table
    }

    console.log(params)
    return (
        <>
            {Array.isArray(items) && items.length > 0 ? (
                <div className="grid-container">
                    {items.map((item) => (
                        <div className="grid-item" key={ item.id }>
                            <Link
                              key={props.table + item.id}
                              to={`/${item.slug}/pd/${item.id}/${table}`}
                              className="grid-item"
                            >
                                <img
                                    src={
                                      item.files && item.files.length > 0
                                        ? `/public/uploads/${props.table}/${item.id}/${item.files[0].file_name}`
                                        : '/public/uploads/default-image.jpg'
                                    }
                                    alt={item.name}
                                    className="item-image"
                                />

                                <div className="grid-content">
                                    <h3 className="item-title">{ item.name }</h3>

                                    {props.table === 'product' && (
                                        <>
                                           <Price newPrice={ 100 } price={ item.price } />
                                           <StockStatus quantity={ item.quantity }/>
                                          <AddToCartButton item={ item } />
                                         </>
                                    )}
                              </div>
                            </Link>
                        </div>
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
