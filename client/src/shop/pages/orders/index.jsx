import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAuth } from '../../context/auth-context';
import { shopConfig } from '../../../config';
import './orders.css';

const Orders = () => {
	const { user } = useAuth();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await Axios.get(shopConfig.getItemsUrl, {
					params: { table: 'order', user_id: user?.id },
				});
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
									<span className="orders-status">{order.status}</span>
								</p>

								<Button
									label="View Details"
									className="mt-3"
									onClick={() => navigate(`/orders/${order.id}`)}
								/>
							</div>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};


export default Orders;