import { useEffect, useState } from 'react';

const API_URL = 'http://127.0.0.1:8000';

export function usePost() {
	const [posts, setPosts] = useState([]);
	const [userPosts, setUserPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
		let isCancelled = false;
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
				if (!isCancelled) {
					location.reload();
				}
			})
			.catch((err) => console.error(err));

		return () => {
			isCancelled = true;
		};
	};

	const getUserPosts = async ({ userId }) => {
		let isCancelled = false;
		setIsLoading(true);

		fetch(`${API_URL}/post/user_posts/${userId}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				if (!isCancelled) {
					setUserPosts(data.reverse());
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

	useEffect(() => {
		getPosts();
	}, []);

	return { posts, userPosts, isLoading, createPost, getUserPosts };
}
