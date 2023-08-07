import { createContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);
	const authService = new AuthService();

	const storeToken = (token) => {
		localStorage.setItem('authToken', token);
	};

	const authenticateUser = () => {
		setIsLoading(true);
		const storedToken = localStorage.getItem('authToken');

		if (storedToken) {
			authService
				.verify()
				.then((response) => {
					setIsLoggedIn(true);
					setUser(response);
					setTimeout(() => {
						setIsLoading(false);
					}, 1000);
				})
				.catch((error) => {
					setIsLoggedIn(false);
					setUser(null);
					setInterval(() => {
						setIsLoading(false);
					}, 1000);
					return { message: error };
				});
		} else {
			setIsLoggedIn(false);
			setUser(null);
			setInterval(() => {
				setIsLoading(false);
			}, 1000);
		}
	};

	const removeToken = () => {
		localStorage.removeItem('authToken');
	};

	const logOutUser = () => {
		removeToken();
		authenticateUser();
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				isLoading,
				user,
				storeToken,
				authenticateUser,
				logOutUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
