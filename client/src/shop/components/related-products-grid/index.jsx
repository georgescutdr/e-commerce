import React from 'react';
import './related-products-grid.css';
import { ProductCard } from '../cards/grid-item/product-card';

export const RelatedProductsGrid = ({ items }) => {
    if (!items?.length) return null;

    return (
        <>
            <h3 className="related-title">You may also like</h3>
            <div className="related-products-grid">
                {items.map((p, idx) => (
                    <ProductCard key={idx} item={p} />
                ))}
            </div>
        </>
    );
};

export default RelatedProductsGrid;