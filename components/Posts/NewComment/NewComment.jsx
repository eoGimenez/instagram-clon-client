import { useComment } from '../../../hooks/useComment';
import { useField } from '../../../hooks/useField';
import './NewComment.css';

export default function NewComment({ username, postId }) {
	const text = useField({ type: 'text', field: '' });
	const { createComment } = useComment();

	const handleComment = (e) => {
		e.preventDefault();
		createComment({
			username: username,
			text: text.value,
			postId: postId,
		});
	};

	return (
		<form onSubmit={handleComment} className='new--comment--form'>
			<fieldset>
				<input {...text} placeholder='Escriba un comentario' />
			</fieldset>
			<button className='new--comment--form--btn'>Comentar</button>
		</form>
	);
}
