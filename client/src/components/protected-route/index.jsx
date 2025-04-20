import { Navigate } from 'react-router-dom';
import { useAuth } from '../../shop/context/auth-context';
import { shopConfig } from '../../config';

export const ProtectedRoute = ({ children }) => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to={ shopConfig.api.loginApiUrl } />;
	}

	return children;
};
