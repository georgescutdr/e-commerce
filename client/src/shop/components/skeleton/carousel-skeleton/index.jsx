// components/skeletons/CarouselSkeleton.jsx
import React from 'react';
import './carousel-skeleton.css';

export const CarouselSkeleton = ({ title = 'Loading...' }) => {
	return (
		<div className="carousel-skeleton">
			<h3 className="carousel-skeleton-title">{title}</h3>
			<div className="carousel-skeleton-items">
				{Array.from({ length: 7 }).map((_, index) => (
					<div key={index} className="carousel-skeleton-item" />
				))}
			</div>
		</div>
	);
};
