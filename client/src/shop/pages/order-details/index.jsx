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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    	let queryParams = {
        	id: params.id, 
            table: 'order',
            joinTables: [
				{table: 'product', fields: ['id', 'attribute_id', 'value']},
				{table: 'user', fields: ['id', 'name', 'single_name', 'description']}, 
				{table: 'shipping_information', fields: ['id', 'name', 'description']}, 
			],
        }

        Axios.get(shopConfig.getItemsUrl, { params: queryParams })
            .then((res) => {
                setOrderDetails(res.data[0]);
                setLoading(false);
            })
            .catch((err) => {
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
        return <div className="p-6 text-red-500">Order not found.</div>;
    }

    const { order, shipping } = orderDetails;
console.log(orderDetails)
    return (
        <div className="order-details-container p-6">
            <Card title={`Order Summary #${orderDetails.code}`} className="mb-4 shadow-2">
                <div className="flex justify-content-between flex-wrap">
                    <div>
                        <p><strong>Status:</strong> <Tag value={orderDetails.order_status === 0 ? 'Pending' : 'Completed'} severity="info" /></p>
                        <p><strong>Total:</strong> ${orderDetails.total.toFixed(2)}</p>
                        <p><strong>Payment:</strong> {orderDetails.payment_method} - <Tag value={orderDetails.payment_status === 1 ? 'Paid' : 'Unpaid'} severity={orderDetails.payment_status === 1 ? 'success' : 'warning'} /></p>
                        <p><strong>Shipping Method:</strong> {orderDetails.shipping_method}</p>
                        <p><strong>Shipping Cost:</strong> ${orderDetails.shipping_cost.toFixed(2)}</p>
                        <p><strong>Tax:</strong> ${orderDetails.tax_amount.toFixed(2)}</p>
                        <p><strong>Created At:</strong> {orderDetails.created_at}</p>
                    </div>
                </div>
            </Card>

            <Card title="Shipping Information" className="shadow-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p><strong>Name:</strong> {shipping.name}</p>
                        <p><strong>Phone:</strong> {shipping.phone}</p>
                        <p><strong>Email:</strong> {shipping.email}</p>
                    </div>
                    <div>
                        <p><strong>Address:</strong> {shipping.address}, {shipping.city}, {shipping.state}, {shipping.country}, {shipping.postal_code}</p>
                        {shipping.instructions && <p><strong>Instructions:</strong> {shipping.instructions}</p>}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default OrderDetails;
