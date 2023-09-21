const API_URL = `${import.meta.env.VITE_API_URL}`;

export function useResponse() {

	const createResponse = async ({ text, commentId, userId, username }) => {
		let isCancelled = false;
		const storedToken = localStorage.getItem('authToken');
		console.log('CREANDO');

		const json_string = JSON.stringify({
			username: username,
			text: text,
			author_id: userId,
		});

		const requestOptions = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${storedToken}`,
			}),
			body: json_string,
		};
		fetch(`${API_URL}/response/${commentId}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {})
			.catch((err) => console.error(err));
		return () => {
			isCancelled = true;
		};
	};

	const updateResponse = async ({ text, commentId, userId, username, responseId }) => {
		let isCancelled = false;
		const storedToken = localStorage.getItem('authToken');

		const json_string = JSON.stringify({
			username: username,
			text: text,
			comment_id: commentId,
			author_id: userId,
		});

		const requestOptions = {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${storedToken}`,
			}),
			body: json_string,
		};
		fetch(`${API_URL}/response/${responseId}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				if (!isCancelled) {
					console.log('Editado correctamente');
				}
			})
			.catch((err) => console.error(err));
		return () => {
			isCancelled = true;
		};
	};

	const deleteResponse = async ({ responseId, commentId }) => {
		let isCancelled = false;
		const storedToken = localStorage.getItem('authToken');

		const requestOptions = {
			method: 'DELETE',
			headers: new Headers({
				Authorization: `Bearer ${storedToken}`,
			}),
		};

		fetch(`${API_URL}/response/${responseId}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				if (!isCancelled) {
					console.log('Eliminado correctamente');
				}
			})
			.catch((err) => console.error(err));

		return () => {
			isCancelled = true;
		};
	};
	return { createResponse, updateResponse, deleteResponse };
}
