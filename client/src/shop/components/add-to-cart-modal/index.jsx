import React, { useEffect, useState } from 'react';
import './add-to-cart-modal.css';
import { Button } from 'primereact/button';
import { ProductCard } from '../cards/add-to-cart-modal/product-card';
import { RelatedProductsGrid } from '../related-products-grid';
import { ProgressSpinner } from 'primereact/progressspinner';
import { shopConfig } from '../../../config';
import Axios from 'axios';

export const AddToCartModal = ({ visible, setVisible, addedProduct, setAddedProduct }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (!visible || !addedProduct || !addedProduct.category_id) return;

            setLoading(true);
            try {
                const response = await Axios.get(shopConfig.api.getProductsUrl, {
                    params: {
                        categoryId: addedProduct.category_id,
                        excludeId: addedProduct.id,
                    },
                });
                setRelatedProducts(response.data);
            } catch (error) {
                console.error('Failed to load related products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [visible, addedProduct]);

    useEffect(() => {
        if (visible) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [visible]);

    const onClose = () => {
      setVisible(false);
      setTimeout(() => {
        setAddedProduct(null);
      }, 300); // delay to match modal exit animation
    };

    if (!visible || !addedProduct) return null;

    return (
        <div 
            className="add-to-cart-modal-overlay" 
            onClick={(e) => {
                // Only close if clicking the overlay itself, not any child
                if (e.target === e.currentTarget) {
                  onClose();
                }
            }}
        >
            <div className="add-to-cart-modal-content" onClick={(e) => e.stopPropagation()}>
                {loading ? (
                    <div className="spinner-wrapper">
                        <ProgressSpinner />
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <h2>Item Added to Cart</h2>
                            <Button
                                icon="pi pi-times"
                                className="p-button-rounded p-button-text"
                                onClick={onClose}
                            />
                        </div>

                        <div className="add-to-cart-scroll-wrapper">
                            <div className="added-product-section">
                                <ProductCard item={addedProduct} />
                            </div>

                            {relatedProducts.length > 0 && (
                                <RelatedProductsGrid items={relatedProducts} />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddToCartModal;
