import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAuth } from '../../context/auth-context';
import { shopConfig } from '../../../config';
import { capitalize } from '../../../utils'
import { getUser } from '../../../utils/auth-helpers';
import { Header } from '../../components/header';
import './orders.css';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const user = getUser();

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await Axios.post(shopConfig.getItemsUrl, 
					{ table: 'order', user_id: user.id, joinTables: [
						{'table': 'shipping_status', fields: ['id', 'name', 'description', 'color'], pivot: true}
					] },
				);
				const data = response.data;

				if (Array.isArray(data)) {
					setOrders(data);
				} else {
					console.warn('Unexpected response format:', data);
					setOrders([]);
				}
			} catch (error) {
				console.error('Failed to fetch orders:', error);
				setOrders([]);
			} finally {
				setLoading(false);
			}
		};

		if (user?.id) {
			fetchOrders();
		}
	}, [user]);

	if (loading) {
		return (
			<div className="orders-loading">
				<ProgressSpinner />
			</div>
		);
	}

	return (
		<>
		<Header />
		<div className="orders-container">
			<h2 className="orders-title">My Orders</h2>

			{orders.length === 0 ? (
				<p className="orders-empty">You have not placed any orders yet.</p>
			) : (
				<div className="orders-list">
					{orders.map((order) => (
						<Card
							key={order.id}
							title={
								<span
									className="order-code-link"
									onClick={() => navigate(`/orders/${order.id}`)}
								>
									Order Code: {order.code}
								</span>
							}
							className="orders-card"
						>
							<div className="order-subtitle">
								Placed on {new Date(order.created_at).toLocaleDateString()}
							</div>

							<div className="orders-details">
								<p>
									<strong>Total:</strong> ${order.total.toFixed(2)}
								</p>
								<p>
									<strong>Status:</strong>{' '}
									{order.shipping_status_array && order.shipping_status_array.length > 0 && (
									  <Tag
									    value={capitalize(order.shipping_status_array[order.shipping_status_array.length - 1]?.name)}
									    className="order-status-tag"
									    style={{
									      backgroundColor: order.shipping_status_array[order.shipping_status_array.length - 1]?.color || '#fff',
									      color: '#fff', 
									      border: 'none',
									    }}
									  />
									)}
								</p>

								<Button
									label="View Details"
									className="mt-3"
									onClick={() => navigate(`/order-details/${order.id}`)}
								/>
							</div>
						</Card>
					))}
				</div>
			)}
		</div>
		</>
	);
};


export default Orders;