import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import { shopConfig } from '../../../config';
import { capitalize, formatDateTime } from '../../../utils'
import { Timeline } from 'primereact/timeline';
import { Header } from '../../components/header';
import { OrderDetailsSkeleton } from '../../components/skeleton/order-details-skeleton'
import './order-details.css';

const removeDuplicateStatuses = (statuses) => {
    const seen = new Set();
    return statuses.filter(status => {
        if (seen.has(status.id)) {
            return false;
        }
        seen.add(status.id);
        return true;
    });
};


const OrderDetails = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [products, setProducts] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [shippingStatus, setShippingStatus] = useState(null);
    const [shippingStatusArray, setShippingStatusArray] = useState(null);
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
                {'table': 'shipping_status', fields: ['id', 'name', 'description', 'color', 'icon'], pivot: true}
            ],
        }

        Axios.post(shopConfig.getItemsUrl, queryParams).then((res) => {
            const data = res.data[0];

            const uniqueShippingStatuses = removeDuplicateStatuses(data.shipping_status_array);

            setOrderDetails(data);
            setUserDetails(data.user_array[0]);
            setShippingDetails(data.shipping_information_array[0]);
            setShippingStatus(uniqueShippingStatuses[uniqueShippingStatuses.length - 1]);
            setShippingStatusArray(uniqueShippingStatuses);
            setProducts(data.product_array);
            setLoading(false);
        }).catch((err) => {
            console.error('Error fetching order details:', err);
            setLoading(false);
        });
    }, [orderId]);

    if (loading) {
        return (
            <OrderDetailsSkeleton />
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
        <>
        <Header />
        <div className="order-details-container p-6">
            <div className="order-summary-tracking-grid">
                <Card title={`Order Summary #${orderDetails.code}`} className="mb-4 shadow-2 order-details-card">
                    <div className="flex justify-content-between flex-wrap">
                        <div>
                            <p>
                                <strong>Status:</strong>{' '} 
                                <Tag
                                    value={capitalize(shippingStatus?.name)}
                                    className="order-status-tag"
                                    style={{
                                        backgroundColor: shippingStatus?.color || '#fff',
                                        color: '#fff', 
                                        border: 'none',
                                    }}
                                />
                            </p>
                            <p><strong>Total:</strong> ${orderDetails.total.toFixed(2)}</p>
                            <p><strong>Payment:</strong> {orderDetails.payment_method} - <Tag className="tag" value={orderDetails.payment_status === 1 ? 'Paid' : 'Unpaid'} severity={orderDetails.payment_status === 1 ? 'success' : 'warning'} /></p>
                            <p><strong>Shipping Method:</strong> {orderDetails.shipping_method}</p>
                            <p><strong>Shipping Cost:</strong> ${orderDetails.shipping_cost.toFixed(2)}</p>
                            <p><strong>Tax:</strong> ${orderDetails.tax_amount.toFixed(2)}</p>
                            <p><strong>Created At:</strong> {formatDateTime(orderDetails.created_at)}</p>
                        </div>
                    </div>
                </Card>

                {shippingStatusArray.length > 0 && (
                    <Card title="Order Tracking" className="shadow-2 order-details-card mb-4">
                        <Timeline
                            value={shippingStatusArray.map((statusItem) => ({
                                status: capitalize(statusItem.name),
                                description: statusItem.description || '',
                                date: orderDetails.created_at, 
                                icon: statusItem.icon ? statusItem.icon :  'pi pi-check',
                                color: statusItem.color || '#000',
                            }))}
                            align="alternate"
                            className="custom-timeline"
                            marker={(item) => (
                                <span
                                    className="custom-marker"
                                    style={{
                                        backgroundColor: item.color,
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        margin: '0 0.5rem'
                                    }}
                                >
                                    <i className={item.icon}></i>
                                </span>
                            )}
                            content={(item) => (
                                <div className="timeline-content">
                                    <h6 className="mb-1">{item.status}</h6>
                                    <p className="m-0 text-sm">{formatDateTime(item.date)}</p>
                                    {item.description && <p className="m-0 text-xs text-secondary">{item.description}</p>}
                                </div>
                            )}
                        />
                    </Card>
                )}
            </div>

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
                                alt={product?.name}
                                className="product-image"
                            />
                            <h5 className="product-name">{product?.name}</h5>
                            <p className="product-price"><strong>Price:</strong> ${product?.price?.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
        </>
    );
};

export default OrderDetails;
