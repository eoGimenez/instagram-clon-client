import { useEffect } from 'react';
import './ResponseContainer.css';
import { useComment } from '../../../hooks/useComment';
import NewResponse from '../NewResponse/NewResponse';
import { useSwitch } from '../../../hooks/useSwitch';
import Response from '../Response/Response';

export default function ResponseContainer({ commentId, user }) {
	const { comment, getOneComment } = useComment();
	const { isTrue, switchingGeneric } = useSwitch();

	useEffect(() => {
		getOneComment({ commentId });
	}, [commentId]);
    console.log(commentId);
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
								commentId={commentId}
							/>
						))}
						<div className='post--comment--response--container'>
							<NewResponse user={user} commentId={commentId} />
						</div>
					{/* 	<p
							className='post--comment--response--container--parraf'
							onClick={switchingGeneric}
						>
							Cerrar resuestas...
						</p> */}
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
						<NewResponse user={user} commentId={commentId} />
						{/* <p
							className='post--comment--response--container--parraf'
							onClick={switchingGeneric}
						>
							Volver a comentarios...
						</p> */}
					</div>
				)
			) : null}
		</>
	);
}
