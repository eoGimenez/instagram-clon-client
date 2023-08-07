import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useSwitch } from './useSwitch';

export function useAuth({ password, username }) {
	const { authenticateUser, storeToken } = useContext(AuthContext);
	const API_URL = `${import.meta.env.VITE_API_URL}`;
	const { switchingLogin } = useSwitch();

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
				console.log(data);
				storeToken(data.access_token);
				authenticateUser();
				switchingLogin();
			})
			.catch((err) => console.log(err));
	};

	return { handleLogin };
}
