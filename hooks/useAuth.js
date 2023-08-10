import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';

const API_URL = `${import.meta.env.VITE_API_URL}`;

export function useVerify() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	const verifyUser = () => {
		setIsLoading(true);
		const storedToken = localStorage.getItem('authToken');
		const options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${storedToken}` },
		};
		if (storedToken) {
			fetch(`${API_URL}/users/me/`, options)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw response;
				})
				.then((data) => {
					setIsLoggedIn(true);
					setUser(data);
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
	return {
		user,
		isLoggedIn,
		isLoading,
		verifyUser,
	};
}

export function useAuth({ password, username }) {
	const { verify, storeToken } = useContext(AuthContext);

	const handleLogin = (e) => {
		e.preventDefault();
		let scopes = ['me', 'post'];

		let logData = new FormData();
		logData.append('scope', scopes);
		logData.append('username', username);
		logData.append('password', password);

		const requestOptions = {
			method: 'POST',
			body: logData,
		};
		fetch(`${API_URL}/token`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				storeToken(data.access_token);
				verify();
			})
			.catch((err) => console.log(err));
	};

	return { handleLogin };
}

export function useSignup({ username, password, rePassword, email }) {
	const [userCreated, setUserCreated] = useState();
	const { verify, storeToken } = useContext(AuthContext);

	const signUp = (e) => {
		e.preventDefault();

		const json_string = JSON.stringify({
			username: username,
			password: password,
			re_password: rePassword,
			email: email,
		});

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: json_string,
		};

		fetch(`${API_URL}/signup`, requestOptions)
			.then((result) => {
				if (result.ok) {
					return result.json();
				}
				throw result;
			})
			.then((data) => {
				setUserCreated(data);
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		let isCancelled = false;
		if (userCreated) {
			let scopes = ['me', 'post'];

			let logData = new FormData();
			logData.append('scope', scopes);
			logData.append('username', username);
			logData.append('password', password);

			const requestOptions = {
				method: 'POST',
				body: logData,
			};
			fetch(`${API_URL}/token`, requestOptions)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw response;
				})
				.then((data) => {
					if (!isCancelled) {
						storeToken(data.access_token);
						verify();
					}
				})
				.catch((err) => console.log(err));
		}
		return () => {
			isCancelled = true;
		};
	}, [userCreated]);

	return { signUp };
}
