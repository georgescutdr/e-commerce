import React, { createContext, useContext, useEffect, useState } from 'react';
import Axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		const storedToken = localStorage.getItem('token');

		if (storedUser && storedToken) {
			const parsedUser = JSON.parse(storedUser);
			setUser(parsedUser);
			Axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
		}
	}, []);

	const login = (userData, token) => {
		const userWithAvatar = {
			...userData,
			avatar: userData.avatar || '/images/default-avatar.png',
		};
		setUser(userWithAvatar);
		localStorage.setItem('user', JSON.stringify(userWithAvatar));
		localStorage.setItem('token', token);
		Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		delete Axios.defaults.headers.common['Authorization'];
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
