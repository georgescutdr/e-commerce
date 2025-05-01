import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import './item-stack-skeleton.css';

export const ItemStackSkeleton = ({ count = 3 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="card skeleton">
                    <div className="card-image">
                        <Skeleton width="100%" height="150px" />
                    </div>
                    <div className="card-details">
                        <div className="skeleton-promo">
                            <Skeleton width="6rem" height="1.5rem" />
                        </div>
                        <div className="skeleton-title">
                            <Skeleton width="80%" height="1.2rem" className="mb-2" />
                            <Skeleton width="60%" height="1.2rem" />
                        </div>
                        <div className="skeleton-rating">
                            <Skeleton width="5rem" height="1.2rem" />
                        </div>
                        <div className="skeleton-stock">
                            <Skeleton width="5rem" height="1.2rem" />
                        </div>
                        <div className="skeleton-voucher">
                            <Skeleton width="5rem" height="1.2rem" />
                        </div>
                    </div>
                    <div className="card-actions">
                        <Skeleton width="6rem" height="1.5rem" className="mb-2" />
                        <Skeleton width="8rem" height="2rem" />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ItemStackSkeleton;
