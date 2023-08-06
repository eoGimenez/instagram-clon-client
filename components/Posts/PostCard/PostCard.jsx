import PostComment from '../PostComment/PostComment';
import './PostCard.css';

export default function PostCard({ post }) {
	return (
		<section className='section--post--card'>
			<div className='post--card--container'>
				<div className='post--card--header'>
					<img
						src={post.author.avatar}
						alt={`The avatar of the user: ${post.author.username}`}
						className='post--card--author--avatar'
					/>
					<h3 className='post--card--author'>{post.author.username}</h3>
					<button className='post--card--header--btn--delete'>Delete</button>
				</div>
				<div className='image--container'>
					<img
						src={post.image_url}
						alt={`La imagen del post del usuario ${post.author.username} en el post numero: ${post.id}`}
						className='post--card--img'
					/>
				</div>
				<div className='card--container'>
					<h2 className='card--caption'>{post.caption}</h2>
					<div className='post--container--comments--container'>
						{post.comments &&
							post.comments
								.map((comment) => (
									<PostComment comment={comment} key={comment.id} />
								))
								.reverse()}
					</div>
				</div>
			</div>
		</section>
	);
}
