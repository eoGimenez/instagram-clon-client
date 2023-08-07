import { useEffect, useState } from 'react';

export function usePost() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const API_URL = 'http://127.0.0.1:8000';
	const getPosts = async () => {
		let isCancelled = false;
		setIsLoading(true);

		fetch(`${API_URL}/post/`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				if (!isCancelled) {
					setPosts(data.reverse());
					setInterval(() => {
						setIsLoading(false);
					}, 1000);
				}
			})
			.catch((err) => {
				console.log(err);
				// alert(err);
			});
		return () => {
			isCancelled = true;
			setIsLoading(false);
		};
	};

	useEffect(() => {
		getPosts();
	}, []);

	return { posts, isLoading };
}
