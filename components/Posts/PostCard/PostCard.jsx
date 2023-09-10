import { useContext, useEffect } from 'react';
import PostComment from '../PostComment/PostComment';
import './PostCard.css';
import { AuthContext } from '../../../context/auth.context';
import { useDelete } from '../../../hooks/useDelete';
import { useSwitch } from '../../../hooks/useSwitch';
import NewComment from '../NewComment/NewComment';
// import { useComment } from '../../../hooks/useComment';

export default function PostCard({ post }) {
	const { user } = useContext(AuthContext);
	const { deletePost } = useDelete();
	const { isTrue, switchingGeneric } = useSwitch();
	// const { comments, getComments } = useComment();

	const handleDelete = () => {
		deletePost({ postId: post.id });
	};

	// useEffect(() => {
	// 	getComments({ postId: post.id });
	// }, []);
	// console.log(comments);
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
					{user?.id === post.author.id ? (
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
					<div className='postcard--container--comments--container'>
						{post.comments.length ? (
							<p
								className='postcard--container--comment--parraf'
								onClick={switchingGeneric}
							>{`Ver los ${post.comments.length} commentarios`}</p>
						) : (
							<p
								className='postcard--container--comment--parraf'
								onClick={switchingGeneric}
							>{`Aun no hay comentarios`}</p>
						)}
						<div className={`postcard--comments--show--up--${isTrue}`}>
							{isTrue ? <PostComment key={post.id} postId={post.id} /> : null}
							<div className='postcard--container--new--comment'>
								{(isTrue && user) || (post.comments.length === 0 && user) ? (
									<>
										<NewComment user={user} postId={post.id} />
										<p
											className='postcard--container--comment--parraf'
											onClick={switchingGeneric}
										>
											Cerrar comentarios
										</p>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

{
	/* comments
		.map((comment) => (
			<PostComment
				postId={post.id}
				comment={comment}
				key={comment.id}
			/>
		))
		.reverse() */
}
