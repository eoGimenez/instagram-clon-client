import { createContext, useEffect } from 'react';
import { useVerify } from '../hooks/useAuth';

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
	const { user, isLoggedIn, isLoading, verifyUser } = useVerify();

	const storeToken = (token) => {
		localStorage.setItem('authToken', token);
	};

	const removeToken = () => {
		localStorage.removeItem('authToken');
	};

	const verify = () => {
		verifyUser();
	};

	const logOutUser = () => {
		removeToken();
		verify();
	};

	useEffect(() => {
		verify();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				isLoading,
				user,
				storeToken,
				verify,
				logOutUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
