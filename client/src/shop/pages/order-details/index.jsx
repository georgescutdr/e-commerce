import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import { shopConfig } from '../../../config';
import './order-details.css';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [products, setProducts] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [shippingDetails, setShippingDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let queryParams = {
            id: orderId, 
            table: 'order',
            joinTables: [
                {table: 'product', fields: ['id', 'name', 'price', 'description'], pivot: true},
                {table: 'user', fields: ['id', 'first_name', 'last_name']}, 
                {table: 'shipping_information', fields: [
                    'id', 'name', 'address', 'city', 'state', 'postal_code', 'country', 'phone', 'email', 'instructions'
                ]}, 
            ],
        }

        Axios.post(shopConfig.getItemsUrl, queryParams).then((res) => {
            setOrderDetails(res.data[0]);
            setUserDetails(res.data[0].user_array[0]);
            setShippingDetails(res.data[0].shipping_information_array[0]);
            setProducts(res.data[0].product_array);
            setLoading(false);
        }).catch((err) => {
            console.error('Error fetching order details:', err);
            setLoading(false);
        });
    }, [orderId]);

    if (loading) {
        return (
            <div className="p-6">
                <Skeleton width="100%" height="3rem" className="mb-2" />
                <Skeleton width="90%" height="2rem" className="mb-2" />
                <Skeleton width="80%" height="2rem" />
            </div>
        );
    }

    if (!orderDetails) {
        return (
            <div className="order-not-found">
                <h2>Oops! We couldn’t find your order.</h2>
                <p>Please check the order ID and try again.</p>
            </div>
        );
    }

    return (
        <div className="order-details-container p-6">
            <Card title={`Order Summary #${orderDetails.code}`} className="mb-4 shadow-2 order-details-card">
                <div className="flex justify-content-between flex-wrap">
                    <div>
                        <p><strong>Status:</strong> <Tag className="tag" value={orderDetails.order_status === 0 ? 'Pending' : 'Completed'} severity="info" /></p>
                        <p><strong>Total:</strong> ${orderDetails.total.toFixed(2)}</p>
                        <p><strong>Payment:</strong> {orderDetails.payment_method} - <Tag className="tag" value={orderDetails.payment_status === 1 ? 'Paid' : 'Unpaid'} severity={orderDetails.payment_status === 1 ? 'success' : 'warning'} /></p>
                        <p><strong>Shipping Method:</strong> {orderDetails.shipping_method}</p>
                        <p><strong>Shipping Cost:</strong> ${orderDetails.shipping_cost.toFixed(2)}</p>
                        <p><strong>Tax:</strong> ${orderDetails.tax_amount.toFixed(2)}</p>
                        <p><strong>Created At:</strong> {orderDetails.created_at}</p>
                    </div>
                </div>
            </Card>

            <Card title="Shipping Information" className="shadow-2 order-details-card mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p><strong>Name:</strong> {shippingDetails.name}</p>
                        <p><strong>Phone:</strong> {shippingDetails.phone}</p>
                        <p><strong>Email:</strong> {shippingDetails.email}</p>
                    </div>
                    <div>
                        <p><strong>Address:</strong> {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.state}, {shippingDetails.country}, {shippingDetails.postal_code}</p>
                        {shippingDetails.instructions && <p><strong>Instructions:</strong> {shippingDetails.instructions}</p>}
                    </div>
                </div>
            </Card>

            {/* Products Display */}
            <Card title="Products" className="shadow-2 order-details-card">
                <div className="products-grid">
                    {products && products.map((product, index) => (
                        <div key={index} className="product-card">
                            <img
                                src="/uploads/default-image.jpg"
                                alt={product.name}
                                className="product-image"
                            />
                            <h5 className="product-name">{product.name}</h5>
                            <p className="product-price"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
};

export default OrderDetails;
