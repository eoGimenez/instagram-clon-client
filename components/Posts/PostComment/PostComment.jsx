import './PostComment.css';

export default function PostComment({ comment }) {
	console.log(comment);
	return (
		<div className='post--card--comment--container'>
			<p className='comment--author'>
				<span>{comment.username}</span>: {comment.text}
			</p>
			{comment.responses.length > 0 ? <p className='response--parraf'>{`Leer respuetas (${comment.responses.length})`}</p> : <p className='response--parraf'>Responder</p>}
		</div>
	);
}
