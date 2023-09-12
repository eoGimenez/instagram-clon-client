import './ResponseContainer.css';
import NewResponse from '../NewResponse/NewResponse';
import Response from '../Response/Response';
import { useResponse } from '../../../hooks/useResponse';
import { useComment } from '../../../hooks/useComment';
import { useEffect } from 'react';

export default function ResponseContainer({ commentId, user }) {
	const { updateResponse, deleteResponse, createResponse } = useResponse();
	const { comment, getOneComment } = useComment();

	useEffect(() => {
		getOneComment({ commentId });
	}, [commentId]);

	const deleteHandler = ({ responseId, commentId }) => {
		deleteResponse({
			responseId: responseId,
			commentId: commentId,
		});
		setTimeout(() => {
			getOneComment({ commentId });
		}, 300);
	};

	const updateHandler = ({ text, responseId, commentId }) => {
		updateResponse({
			text: text,
			commentId: commentId,
			userId: user.id,
			username: user.username,
			responseId: responseId,
		});
		setTimeout(() => {
			getOneComment({ commentId });
		}, 100);
	};

	const handleResponse = ({ text, commentId }) => {
		createResponse({
			text: text,
			commentId: commentId,
			userId: user.id,
			username: user.username,
		});
		setTimeout(() => {
			getOneComment({ commentId });
		}, 100);
	};

	return (
		<>
			{comment ? (
				comment.responses.length > 0 ? (
					<>
						<div className='post--comment--responses--user--comment--container'>
							<img
								src={comment.author_comment.avatar}
								alt={`The avatar of the user: ${comment.username}`}
								className='response--author--avatar'
							/>
							<p className='comment--author'>
								<span>{comment.username}</span>: {comment.text}
							</p>
						</div>
						{comment.responses.map((response) => (
							<Response
								response={response}
								key={response.id}
								commentId={comment.id}
								deleteHandler={deleteHandler}
								updateHandler={updateHandler}
							/>
						))}
						<div className='post--comment--response--container'>
							<NewResponse
								user={user}
								commentId={comment.id}
								handleResponse={handleResponse}
							/>
						</div>
					</>
				) : (
					<div className='post--comment--response--container'>
						<div className='post--comment--responses--user--comment--container'>
							<img
								src={comment.author_comment.avatar}
								alt={`The avatar of the user: ${comment.username}`}
								className='response--author--avatar'
							/>
							<p className='comment--author'>
								<span>{comment.username}</span>: {comment.text}
							</p>
						</div>
						<NewResponse
							user={user}
							commentId={comment.id}
							handleResponse={handleResponse}
						/>
					</div>
				)
			) : null}
		</>
	);
}
