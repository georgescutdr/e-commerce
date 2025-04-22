// components/common/ItemGridSkeleton.jsx
import React from 'react';
import './item-grid-skeleton.css';

export const ItemGridSkeleton = ({ count = 8 }) => {
    return (
        <div className="grid-container">
            {Array.from({ length: count }).map((_, index) => (
                <div className="grid-item skeleton" key={index}>
                    <div className="skeleton-image" />
                    <div className="skeleton-text short" />
                    <div className="skeleton-text long" />
                    <div className="skeleton-text price" />
                    <div className="skeleton-button" />
                </div>
            ))}
        </div>
    );
};
