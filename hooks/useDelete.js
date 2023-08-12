const API_URL = 'http://127.0.0.1:8000';

export function useDelete() {
	const deletePost = async ({ postId }) => {
		const storedToken = localStorage.getItem('authToken');
		const requestOptions = {
			method: 'DELETE',
			headers: new Headers({
				Authorization: `Bearer ${storedToken}`,
			}),
		};

		fetch(`${API_URL}/post/${postId}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				location.reload();
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return { deletePost };
}
