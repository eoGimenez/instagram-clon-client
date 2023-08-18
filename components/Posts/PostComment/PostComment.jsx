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
	console.log(comment);
	return (
		<div className='post--card--comment--container'>
			{!isTrue && (
				<>
					<p className='comment--author'>
						<span>{comment.username}</span>: {comment.text}
					</p>
					<div className='comment--container--options'>
						{comment.responses.length > 0 ? (
							<p
								onClick={switchingGeneric}
								className='response--parraf'
							>{`Leer respuetas (${comment.responses.length})`}</p>
						) : (
							<p className='response--parraf' onClick={switchingGeneric}>
								Responder
							</p>
						)}
						{user && comment.author_comment.id == user.id && (
							<p onClick={handleDelete} className='response--parraf'>
								Eliminar
							</p>
						)}
					</div>
				</>
			)}
			{isTrue &&
				(comment.responses.length > 0 ? (
					<div className={`post--card--response--container--${isTrue}`}>
						{comment.responses.map((response) => (
							<Response response={response} key={response.id} comment={comment} />
						))}
						<div className={`post--card--response--container--${isTrue}`}>
							<NewResponse user={user} commentId={comment.id} />
						</div>
						<p
							className='post--card--response--container--parraf'
							onClick={switchingGeneric}
						>
							Cerrar resuestas
						</p>
					</div>
				) : (
					<div className={`post--card--response--container--${isTrue}`}>
						<NewResponse user={user} commentId={comment.id} />
					</div>
				))}
		</div>
	);
}
