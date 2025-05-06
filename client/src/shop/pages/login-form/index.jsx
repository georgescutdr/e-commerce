import React, { useState, useContext } from 'react';
import './login-form.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import Axios from 'axios';
import { AuthContext } from '../../context/auth-context'; // update path as needed
import { useNavigate } from 'react-router-dom';
import { shopConfig } from '../../../config'
import { useWishlist } from '../../context/wishlist-context'


const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { login } = useContext(AuthContext);
	const { loadWishlist } = useWishlist();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(''); // reset error
		try {
			const res = await Axios.post(shopConfig.api.loginApiUrl, { email, password });
			const { token, user } = res.data;

			login(user, token); // saves to context + localStorage

			//loadWishlist(user); //load wishlist to localStorage

			navigate('/');
		} catch (err) {
			console.error('Login failed:', err.response?.data || err.message);
			setError(err.response?.data?.message || 'Login failed. Please try again.');
		}
	};

	return (
		<div className="login-wrapper">
			<div className="login-card">
				<h2 className="login-title">Welcome Back</h2>
				<p className="login-subtitle">Please sign in to continue</p>
				<form onSubmit={handleLogin}>
					<div className="login-field">
						<label htmlFor="email">Email</label>
						<InputText
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							required
						/>
					</div>
					<div className="login-field">
						<label htmlFor="password">Password</label>
						<Password
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							toggleMask
							feedback={false}
							placeholder="Enter your password"
							required
						/>
					</div>
					{error && <div className="login-error">{error}</div>}
					<Button label="Login" icon="pi pi-sign-in" className="login-button" />
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
