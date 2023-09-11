import './ResponseContainer.css';
import NewResponse from '../NewResponse/NewResponse';
import Response from '../Response/Response';
import { useResponse } from '../../../hooks/useResponse';
import { useComment } from '../../../hooks/useComment';
import { useEffect } from 'react';

export default function ResponseContainer({ commentId, user }) {
	const { updateResponse, deleteResponse } = useResponse();
	const { comment, getOneComment } = useComment();

	useEffect(() => {
		getOneComment({ commentId });
	}, []);

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
							/>
						))}
						<div className='post--comment--response--container'>
							<NewResponse user={user} commentId={comment.id} />
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
						<NewResponse user={user} commentId={comment.id} />
					</div>
				)
			) : null}
		</>
	);
}
