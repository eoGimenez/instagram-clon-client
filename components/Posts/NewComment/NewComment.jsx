import { useComment } from '../../../hooks/useComment';
import { useField } from '../../../hooks/useField';
import './NewComment.css';

export default function NewComment({ user, postId, createComment }) {
	const text = useField({ type: 'text', field: '' });
	const { comments } = useComment();
	const handleComment = (e) => {
		e.preventDefault();
		const value = text.value;
		text.value = '';
		createComment({
			username: user.username,
			authorId: user.id,
			text: value,
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
