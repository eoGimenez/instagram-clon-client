import { useComment } from '../../../hooks/useComment';
import { useField } from '../../../hooks/useField';
import './NewComment.css';

export default function NewComment({ user, postId }) {
	const text = useField({ type: 'text', field: '' });
	const { createComment } = useComment();
	const handleComment = (e) => {
		e.preventDefault();
		createComment({
			username: user.username,
			authorId: user.id,
			text: text.value,
			postId: postId,
		});
	};

	return (
		<form onSubmit={handleComment} className='new--comment--form'>
			<fieldset>
				<input {...text} placeholder='Escriba un comentario' />
			</fieldset>
			<button className='new--comment--form--btn' disabled={!text.value}>
				Comentar
			</button>
		</form>
	);
}
