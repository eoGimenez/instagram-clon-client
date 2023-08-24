import { useContext } from 'react';
import { useSwitch } from '../../../hooks/useSwitch';
import Response from '../../Responses/ResponseCointainer/Response';
import './PostComment.css';
import { AuthContext } from '../../../context/auth.context';
import { useComment } from '../../../hooks/useComment';
import NewResponse from '../../Responses/NewResponse/NewResponse';

export default function PostComment({ comment }) {
	const { isTrue, switchingGeneric } = useSwitch();
	const { user } = useContext(AuthContext);
	const { deleteComment } = useComment();

	const handleDelete = () => {
		deleteComment({ commentId: comment.id, userId: comment.author_comment.id });
	};
	return (
		<div className='post--comment--container'>
			{!isTrue && (
				<>
					<div className='post--comment--user--container'>
						<img
							src={comment.author_comment.avatar}
							alt={`The avatar of the user: ${comment.username}`}
							className='response--author--avatar'
						/>
						<p className='comment--author'>
							<span>{comment.username}</span>: {comment.text}
						</p>
					</div>
					<div className='comment--container--options'>
						{comment.responses.length > 0 ? (
							<p
								onClick={switchingGeneric}
								className='response--parraf'
							>{`Leer respuetas (${comment.responses.length})`}</p>
						) : (
							<p className='response--parraf' onClick={switchingGeneric}>
								Responder...
							</p>
						)}
						{user && comment.author_comment.id == user.id && (
							<p onClick={handleDelete} className='response--parraf'>
								Eliminar...
							</p>
						)}
					</div>
				</>
			)}
			<div className={`post--comment--response--container--${isTrue}`}>
				{isTrue &&
					(comment.responses.length > 0 ? (
						<>
							<div className='post--responses--user--comment--container'>
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
							<div className={`post--comment--response--container--${isTrue}`}>
								<NewResponse user={user} commentId={comment.id} />
							</div>
							<p
								className='post--comment--response--container--parraf'
								onClick={switchingGeneric}
							>
								Cerrar resuestas...
							</p>
						</>
					) : (
						<div className={`post--comment--response--container--${isTrue}`}>
							<div className='post--responses--user--comment--container'>
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
							<p
								className='post--comment--response--container--parraf'
								onClick={switchingGeneric}
							>
								Volver a comentarios...
							</p>
						</div>
					))}
			</div>
		</div>
	);
}
