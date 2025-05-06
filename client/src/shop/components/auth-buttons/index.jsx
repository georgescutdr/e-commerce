import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getUser } from '../../../utils/auth-helpers';
import './auth-buttons.css';

export const AuthButtons = () => {
  const navigate = useNavigate();
console.log(getUser())
  if (isLoggedIn()) return null;

  return (
    <div className="auth-buttons">
      <Button
        label="Login"
        icon="pi pi-sign-in"
        className="link-button"
        onClick={() => navigate('/login')}
      />
      <span className="separator"></span>
      <Button
        label="Register"
        icon="pi pi-user-plus"
        className="link-button"
        onClick={() => navigate('/register')}
      />
    </div>
  );
};

export default AuthButtons;
