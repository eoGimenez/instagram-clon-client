import { useEffect, useState } from 'react';

const API_URL = 'http://127.0.0.1:8000';

export function useComment() {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState(null);

	// console.log(comment)

	const getComments = async ({ postId }) => {
		fetch(`${API_URL}/comment/${postId}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				setComments(data);
			})
			.catch((err) => console.error(err));
	};

	const getOneComment = async ({ commentId }) => {
		fetch(`${API_URL}/comment/onecomment/${commentId}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				setComment(data);
				setComment(data);
			})
			.catch((err) => console.error(err));
	};

	const createComment = async ({ username, text, postId, authorId }) => {
		let isCancelled = false;
		const storedToken = localStorage.getItem('authToken');

		const json_string = JSON.stringify({
			username: username,
			text: text,
			post_id: postId,
			author_id: authorId,
		});

		const requestOptions = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${storedToken}`,
			}),
			body: json_string,
		};
		fetch(`${API_URL}/comment/`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				if (!isCancelled) {
					setComments(data);
				}
			})
			.catch((err) => console.error(err));
		return () => {
			isCancelled = true;
		};
	};

	const deleteComment = async ({ commentId, userId, postId }) => {
		const storedToken = localStorage.getItem('authToken');

		const requestOptions = {
			method: 'DELETE',
			headers: new Headers({
				Authorization: `Bearer ${storedToken}`,
			}),
		};

		fetch(`${API_URL}/comment/${commentId}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				getComments({ postId });
			})
			.catch((err) => console.error(err));
	};

	return { comments, comment, createComment, deleteComment, getComments, getOneComment };
}
