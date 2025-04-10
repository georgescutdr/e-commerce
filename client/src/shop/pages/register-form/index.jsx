import React, { useState } from 'react'
import './register-form.css'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

export const RegisterForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Registering user:', formData)
		// Implement registration logic
	}

	return (
		<div className="register-page">
			<div className="register-card">
				<h2 className="register-title">Create Your Account</h2>
				<p className="register-subtitle">Join us and explore more</p>
				<form onSubmit={handleSubmit}>
					<div className="register-field">
						<label htmlFor="name">Name</label>
						<InputText
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="John Doe"
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
					<Button label="Register" icon="pi pi-user-plus" className="register-btn" />
				</form>
			</div>
		</div>
	)
}
