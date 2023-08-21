import { useState } from 'react';

const API_URL = `${import.meta.env.VITE_API_URL}`;

export function useUser() {
	const [userById, setUserById] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const getUserById = async ({ userId }) => {
		let isCancelled = false;
		setIsLoading(true);

		fetch(`${API_URL}/${userId}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				if (!isCancelled) {
					setUserById(data);
					setInterval(() => {
						setIsLoading(false);
					}, 1000);
				}
			})
			.catch((err) => console.error(err));
		return () => {
			isCancelled = true;
		};
	};

    return {userById, isLoading, getUserById}
}
