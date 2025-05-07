import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Carousel } from 'primereact/carousel';
import { CarouselSkeleton } from '../../components/skeleton/carousel-skeleton';
import { ProductCard } from '../cards/grid-item/product-card';
import { shopConfig } from '../../../config';
import './product-carousel.css';

export const ProductCarousel = ({ title = 'Featured Products' }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let queryParams = {
                    table: 'product',
                    joinTables: [
                        { table: 'promotion', fields: ['id', 'name', 'type', 'value', 'start_date', 'end_date'], pivot: true },
                        { table: 'brand', fields: ['id', 'name'], pivot: true },
                        { table: 'review', fields: ['rating'], pivot: true },
                        { table: 'voucher', fields: ['id', 'expires_at'], pivot: true },
                    ]
                };

                const res = await Axios.post(shopConfig.getItemsUrl, queryParams);

                if (Array.isArray(res.data) && res.data.length > 0) {
                    setItems(res.data);
                } else {
                    console.warn('Empty or invalid product data:', res.data);
                }
            } catch (err) {
                console.error('Failed to load product carousels:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const responsiveOptions = [
      { breakpoint: '1400px', numVisible: 5, numScroll: 1 },
      { breakpoint: '1200px', numVisible: 4, numScroll: 1 },
      { breakpoint: '992px',  numVisible: 3, numScroll: 1 },
      { breakpoint: '768px',  numVisible: 2, numScroll: 1 },
      { breakpoint: '576px',  numVisible: 1, numScroll: 1 }
    ];
    const itemTemplate = (item) => {
        if (!item) return null;
        return (
            <div className="carousel-product-card-wrapper">
                <ProductCard key={item.id} item={item} table="product" />
            </div>
        );
    };

    return (
        <div className="product-carousel-wrapper">
            {loading ? (
                <CarouselSkeleton title={title} />
            ) : (
                <>
                    <h2 className="carousel-title">{title}</h2>
                    <Carousel
                        value={items}
                        numVisible={Math.min(5, items.length)} 
                        numScroll={Math.min(5, items.length)}
                        responsiveOptions={responsiveOptions}
                        itemTemplate={itemTemplate}
                        circular
                        autoplayInterval={5000}
                    />
                </>
            )}
        </div>
    );
};
