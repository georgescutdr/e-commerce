import React, { useEffect, useState } from 'react';
import { ProductCarousel } from '../../components/product-carousel';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import './home-page.css';

export const HomePage = () => {

    return (
        <div className="home-page">
            <ProductCarousel title="Featured Products" />
            <ProductCarousel title="New Arrivals" />
            <ProductCarousel title="Best Sellers" />
        </div>
    );
};

export default HomePage;
