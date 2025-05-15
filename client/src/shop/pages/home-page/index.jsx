import React, { useEffect, useState } from 'react';
import { ProductCarousel } from '../../components/product-carousel';
import { Header } from '../../components/header';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import './home-page.css';

export const HomePage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Axios.get(shopConfig.api.getCategoriesUrl, {
            params: { subOnly: true }
        }).then((result) => {
            setCategories(result.data);
        });
    }, []);

    return (
        <>
            <Header categoryId={0} />
            <div className="home-page">
                {categories.map((item) =>
                    <ProductCarousel
                        key={item.id}
                        title={item.name}
                        categoryId={item.id}
                    />
                )}
            </div>
        </>
    );
};

export default HomePage;
