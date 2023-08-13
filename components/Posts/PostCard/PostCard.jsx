import { useContext } from 'react';
import PostComment from '../PostComment/PostComment';
import './PostCard.css';
import { AuthContext } from '../../../context/auth.context';
import { useDelete } from '../../../hooks/useDelete';
import { useSwitch } from '../../../hooks/useSwitch';
import NewComment from '../NewComment/NewComment';

export default function PostCard({ post }) {
	const { user } = useContext(AuthContext);
	const { deletePost } = useDelete();
	const { isTrue, switchingGeneric } = useSwitch();

	const handleDelete = () => {
		deletePost({ postId: post.id });
	};

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
					{user && user.id === post.author.id ? (
						<button className='post--card--header--btn--delete' onClick={handleDelete}>
							Delete
						</button>
					) : null}
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
						{!isTrue && post.comments.length === 0 ? (
							<p onClick={switchingGeneric}>{`Aun no hay comentarios`}</p>
						) : (
							!isTrue && (
								<p
									onClick={switchingGeneric}
								>{`Ver los ${post.comments.length} commentarios`}</p>
							)
						)}
						<div className={`probando--show--up--${isTrue}`}>
							{isTrue
								? post.comments
										.map((comment) => (
											<PostComment comment={comment} key={comment.id} />
										))
										.reverse()
								: null}
							{(isTrue && user) || (post.comments.length === 0 && user) ? (
								<NewComment user={user} postId={post.id} />
							) : null}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
