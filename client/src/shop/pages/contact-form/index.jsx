import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import ReCAPTCHA from 'react-google-recaptcha';
import Axios from 'axios';
import { Header } from '../../components/header';
import './contact-form.css';

const ContactForm = ({ props }) => {
	const { control, handleSubmit, formState: { errors }, reset } = useForm();
	const toast = useRef(null);
	const recaptchaRef = useRef(null);

	const onSubmit = async (data) => {
		try {
			// Execute reCAPTCHA (invisible)
			const recaptchaToken = await recaptchaRef.current.executeAsync();
			recaptchaRef.current.reset(); // reset for next submission

			// Add token to form data
			const submissionData = { ...data, recaptchaToken };

			const response = await Axios.post('/api/contact', submissionData);

			if (response.status === 200) {
				toast.current.show({
					severity: 'success',
					summary: 'Message Sent',
					detail: 'We have received your message.',
					life: 3000,
				});
				reset();
			} else {
				toast.current.show({
					severity: 'error',
					summary: 'Error',
					detail: 'Something went wrong.',
					life: 3000,
				});
			}
		} catch (error) {
			toast.current.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Failed to send message.',
				life: 3000,
			});
		}
	};

	// Deduplicate fields
	const uniqueFields = props.fields?.filter(
		(field, index, self) =>
			index === self.findIndex((f) => f.name === field.name)
	);

	return (
		<>
		<Header />
		<div className="page-container">
		<div className="contact-form-wrapper">
			<Toast ref={toast} />
			<form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
				<h1>{props.label || 'Contact Us'}</h1>
				{uniqueFields.map((field, index) => {
					const isTextArea = field.type === 'textarea';
					const inputId = `${field.name}_${index}`;

					return (
						<div className="form-field" key={inputId}>
							<label htmlFor={inputId}>{field.label}</label>
							<Controller
								name={field.name}
								control={control}
								rules={{ required: `${field.label} is required.` }}
								render={({ field: controllerField }) =>
									isTextArea ? (
										<InputTextarea
											{...controllerField}
											id={inputId}
											rows={4}
											autoResize
										/>
									) : (
										<InputText
											{...controllerField}
											id={inputId}
											type={field.type}
										/>
									)
								}
							/>
							{errors[field.name] && (
								<small className="p-error">{errors[field.name].message}</small>
							)}
						</div>
					);
				})}

				{/* Invisible reCAPTCHA */}
				<ReCAPTCHA
					sitekey="YOUR_RECAPTCHA_SITE_KEY"
					size="normal"
					ref={recaptchaRef}
				/>

				<Button 
					type="submit" 
					label="Submit Message" 
					className="mt-4" 
					icon="pi pi-send" 
  					iconPos="right" 
				/>
			</form>
		</div>
		</div>
		</>
	);
};

export default ContactForm;
