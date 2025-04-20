import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';

export const AdminNavbar = () => {
	const navigate = useNavigate();
	const menu = useRef(null);

	const menuItems = [
		{
			label: 'Dashboard',
			icon: 'pi pi-chart-bar',
			command: () => navigate('/admin/dashboard'),
		},
		{
			label: 'Settings',
			icon: 'pi pi-cog',
			command: () => navigate('/admin/settings'),
		},
		{
			label: 'Logout',
			icon: 'pi pi-sign-out',
			command: () => {
				// Add logout logic here if needed
				navigate('/admin/login');
			},
		},
	];

	return (
		<nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between shadow">
			{/* Logo */}
			<div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin')}>
				<img src="/images/logo.png" alt="Admin Logo" className="h-8" />
				<span className="font-semibold text-lg">Admin Panel</span>
			</div>

			{/* User Dropdown */}
			<div className="flex items-center gap-3">
				<Menu model={menuItems} popup ref={menu} />
				<Avatar
					image="/images/default-avatar.png"
					shape="circle"
					className="cursor-pointer"
					onClick={(e) => menu.current.toggle(e)}
				/>
			</div>
		</nav>
	);
};
