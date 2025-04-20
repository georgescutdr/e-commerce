import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/auth-context';
import Axios from 'axios';
import { config, shopConfig } from '../../../config';
import { Toast } from 'primereact/toast';
import { FiEdit } from 'react-icons/fi';
import './user-profile.css';

const UserProfile = ({props}) => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const { control, handleSubmit, reset, formState: { errors } } = useForm();
	const { user } = useAuth();
	const toast = useRef(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await Axios.get(shopConfig.getItemsUrl, {
					params: { table: 'user', id: user?.id }
				});
				const data = Array.isArray(response.data) ? response.data[0] : response.data;
				setUserData(data);
				reset(data);
			} catch (error) {
				console.error('Error fetching user:', error);
			} finally {
				setLoading(false);
			}
		};

		if (user?.id) fetchUser();
	}, [user?.id, reset]);

	const onSubmit = async (data) => {
		const formData = new FormData();

		// Dynamically append all fields from props.fields
		props.fields.forEach(field => {
			if (data[field.name] !== undefined) {
				formData.append(field.name, data[field.name]);
			}
		});

		// Append avatar if selected
		if (selectedAvatar) {
			formData.append('files', selectedAvatar);
		}

		try {
			const response = await Axios.post(config.api.saveItemUrl, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response.status === 200) {
				toast.current.show({
					severity: 'success',
					summary: 'Profile Updated',
					detail: 'Your profile has been successfully updated.',
					life: 3000,
				});
			} else {
				toast.current.show({
					severity: 'error',
					summary: 'Update Failed',
					detail: 'There was an error updating your profile.',
					life: 3000,
				});
			}
		} catch (error) {
			toast.current.show({
				severity: 'error',
				summary: 'Update Failed',
				detail: 'There was an error updating your profile.',
				life: 3000,
			});
		}
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedAvatar(file);
		}
	};

	if (loading) {
		return (
			<div className="spinner-container">
				<ProgressSpinner />
			</div>
		);
	}

	const sections = props.sections.map(section => ({
		label: section.name,
		fields: section.fields
			.map(fieldName => props.fields.find(f => f.name === fieldName))
			.filter(Boolean)
	}));

	return (
		<div>
			<Toast ref={toast} />
			<form className="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
				<div className="avatar-upload">
				    <div className="avatar-container">
				        <img
				            src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : userData?.avatar || '/images/default-avatar.png'}
				            alt="Avatar"
				            className="avatar-image"
				        />
				        <input
				            type="file"
				            accept="image/*"
				            onChange={handleAvatarChange}
				            id="avatar-upload-input"
				            style={{ display: 'none' }} // Hide the default file input
				        />
				        <label htmlFor="avatar-upload-input" className="avatar-edit-icon">
				            <FiEdit />
				        </label>
				    </div>
				</div>

				<TabView>
					{sections.map(section => (
						<TabPanel header={section.label} key={section.label}>
							<div className="form-section">
								{section.fields.map(field => (
									<div className="form-field" key={field.name}>
										<label htmlFor={field.name}>{field.label}</label>
										<Controller
											name={field.name}
											control={control}
											rules={field.validation}
											render={({ field: controllerField }) => (
												<InputText {...controllerField} id={field.name} />
											)}
										/>
										{errors[field.name] && (
											<small className="p-error">{errors[field.name].message}</small>
										)}
									</div>
								))}
							</div>
						</TabPanel>
					))}
				</TabView>

				<div className="save-btn-wrapper">
					<Button
					    label="Save Changes"
					    type="submit"
					    icon="pi pi-save"
					    className="mt-4 save-btn"
				    />
				</div>
			</form>
		</div>
	);
};

export default UserProfile;