import React, { useState } from 'react';
import './register-form.css';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Axios from 'axios'; 
import { shopConfig } from '../../../config';

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false); // To show loading state
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match.');
			return;
		}

		setLoading(true);

		try {
			// Send registration request
			const res = await Axios.post(shopConfig.api.registerApiUrl, formData);
			setSuccess(res.data.message); // Set success message on successful registration
			setLoading(false); // Stop loading when registration is successful
		} catch (err) {
			setLoading(false); // Stop loading if an error occurs
			if (err.response && err.response.data) {
				setError(err.response.data.message); // Show error message from server response
			} else {
				setError('Something went wrong, please try again later.');
			}
		}
	};

	return (
		<div className="register-page">
			<div className="register-card">
				<h2 className="register-title">Create Your Account</h2>
				<p className="register-subtitle">Join us and explore more</p>
				{/* Display success message if registration is successful */}
				{success && <div className="alert alert-success">{success}</div>}
				{/* Display error message */}
				{error && <div className="alert alert-danger">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="register-field">
						<label htmlFor="firstName">First Name</label>
						<InputText
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							placeholder="John"
							required
						/>
					</div>
					<div className="register-field">
						<label htmlFor="lastName">Last Name</label>
						<InputText
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							placeholder="Doe"
							required
						/>
					</div>
					<div className="register-field">
						<label htmlFor="email">Email</label>
						<InputText
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="you@example.com"
							required
						/>
					</div>
					<div className="register-field">
						<label htmlFor="password">Password</label>
						<Password
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							toggleMask
							feedback={false}
							placeholder="Enter password"
							required
						/>
					</div>
					<div className="register-field">
						<label htmlFor="confirmPassword">Confirm Password</label>
						<Password
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							toggleMask
							feedback={false}
							placeholder="Confirm password"
							required
						/>
					</div>
					<Button label={loading ? 'Registering...' : 'Register'} icon="pi pi-user-plus" className="register-btn" disabled={loading} />
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;

