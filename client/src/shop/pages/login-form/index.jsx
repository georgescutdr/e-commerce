import React, { useState } from 'react';
import './login-form.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();
		console.log('Login with:', { email, password });
		// Perform login logic here
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
					<Button label="Login" icon="pi pi-sign-in" className="login-button" />
				</form>
			</div>
		</div>
	);
};
