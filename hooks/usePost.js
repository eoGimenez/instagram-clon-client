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
				console.error(err);
			});
		return () => {
			isCancelled = true;
			setIsLoading(false);
		};
	};

	const createPost = async ({ userId, caption, image }) => {
		const storedToken = localStorage.getItem('authToken');

		const json_string = JSON.stringify({
			author_id: userId,
			caption: caption,
			image_url: image,
		});

		const requestOptions = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${storedToken}`,
			}),
			body: json_string,
		};

		fetch(`${API_URL}/post/`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				getPosts();
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getPosts();
	}, []);

	return { posts, isLoading, createPost };
}
