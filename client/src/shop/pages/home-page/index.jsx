import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Header } from '../../components/header';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import { CarouselSkeleton } from '../../components/skeleton/carousel-skeleton';
import './home-page.css';

const ProductCarousel = React.lazy(() => import('../../components/product-carousel'));

const LazyCarousel = ({ title, categoryId }) => {
    const [show, setShow] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    observer.disconnect(); // stop observing after it's visible
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the component is visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ minHeight: '350px' }}>
            {show ? (
                <Suspense fallback={<CarouselSkeleton title={title} />}>
                    <ProductCarousel title={title} categoryId={categoryId} />
                </Suspense>
            ) : (
                <CarouselSkeleton title={title} />
            )}
        </div>
    );
};

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
                {categories.map((item) => (
                    <LazyCarousel key={item.id} title={item.name} categoryId={item.id} />
                ))}
            </div>
        </>
    );
};

export default HomePage;


