import './PostComment.css';

export default function PostComment({ comment }) {
	console.log(comment);
	return (
		<div className='post--card--comment--container'>
			<p>
				<span className='comment--author'>{comment.username}</span>: {comment.text}
			</p>
		</div>
	);
}
