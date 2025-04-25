import React from 'react';
import './product-skeleton.css';

export const ProductSkeleton = () => {
    return (
        <div className="product-page">
            <div className="skeleton-title skeleton"></div>
            <div className="product-columns">
                {/* Left: Gallery */}
                <div className="skeleton-gallery skeleton-box"></div>

                {/* Middle: Description */}
                <div className="product-description">
                    <div className="skeleton-rating skeleton"></div>
                    <div className="skeleton-text skeleton"></div>
                    <div className="skeleton-text skeleton short"></div>
                    <div className="skeleton-options skeleton-box"></div>
                </div>

                {/* Right: Side Info */}
                <div className="product-side-info">
                    <div className="skeleton-price skeleton"></div>
                    <div className="skeleton-button skeleton"></div>
                    <div className="skeleton-button skeleton"></div>
                </div>
            </div>
            <div className="skeleton-attributes skeleton-box"></div>
            <div className="skeleton-reviews skeleton-box"></div>
        </div>
    );
};
