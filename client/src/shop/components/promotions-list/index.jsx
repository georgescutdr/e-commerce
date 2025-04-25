import React from 'react';
import { Link } from 'react-router-dom';
import './promotions-list.css';
import { slugify } from '../../../utils'

export const PromotionsList = ({ promotions = [] }) => {
    // Filter out null/undefined and remove duplicates by ID
    const uniquePromotions = Array.from(
        new Map(
            promotions.filter(p => p && p.id).map(p => [p.id, p])
        ).values()
    );

    if (!uniquePromotions.length) return null;

    return (
        <div className="promotions-list">
            {uniquePromotions.map(promotion => (
                <div className="promotion-card" key={promotion.id}>
                    <div className="promotion-content">
                        <div className="promotion-icon-box">
                            {promotion.type === 'percent'
                                ? `-${promotion.value}%`
                                : `-$${parseFloat(promotion.value).toFixed(0)}`}
                        </div>
                        <div className="promotion-info">
                            {promotion.name}
                        </div>
                        <Link
                            to={`/${slugify(promotion.name)}/pd/${promotion.id}/?type=view_promotion`}
                            className="promotion-link"
                        >
                            See the offer
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};
