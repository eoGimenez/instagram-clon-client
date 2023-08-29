import { useContext, useEffect } from 'react';
import { usePost } from '../../hooks/usePost';
import { AuthContext } from '../../context/auth.context';
import { useParams } from 'react-router-dom';
import { useDelete } from '../../hooks/useDelete';
import { useSwitch } from '../../hooks/useSwitch';
import PostComment from '../../components/Posts/PostComment/PostComment';
import NewComment from '../../components/Posts/NewComment/NewComment';

export default function PostDetail() {
	const { postId } = useParams();
	const { onePost, getPostById } = usePost();
	const { user } = useContext(AuthContext);
	const { deletePost } = useDelete();
	const { isTrue, switchingGeneric } = useSwitch();

	useEffect(() => {
		getPostById({ postId });
	}, [postId]);

	const handleDelete = () => {
		deletePost({ postId: onePost.id });
	};
	return (
		<>
			{onePost && (
				<div className='post--card--container'>
					<div className='post--card--header'>
						<img
							src={onePost.author.avatar}
							alt={`The avatar of the user: ${onePost.author.username}`}
							className='post--card--author--avatar'
						/>
						<h3 className='post--card--author'>{onePost.author.username}</h3>
						{user?.id === onePost.author.id ? (
							<button
								className='post--card--header--btn--delete'
								onClick={handleDelete}
							>
								Delete
							</button>
						) : null}
					</div>
					<div className='image--container'>
						<img
							src={onePost.image_url}
							alt={`La imagen del post del usuario ${onePost.author.username} en el post numero: ${onePost.id}`}
							className='post--card--img'
						/>
					</div>
					<div className='card--container'>
						<h2 className='card--caption'>{onePost.caption}</h2>
						<div className='postcard--container--comments--container'>
							{onePost.comments.length ? (
								<p
									className='postcard--container--comment--parraf'
									onClick={switchingGeneric}
								>{`Ver los ${onePost.comments.length} commentarios`}</p>
							) : (
								<p
									className='postcard--container--comment--parraf'
									onClick={switchingGeneric}
								>{`Aun no hay comentarios`}</p>
							)}
							<div className={`postcard--comments--show--up--${isTrue}`}>
								{isTrue
									? onePost.comments
											.map((comment) => (
												<PostComment comment={comment} key={comment.id} />
											))
											.reverse()
									: null}
								<div className='postcard--container--new--comment'>
									{(isTrue && user) || (onePost.comments.length === 0 && user) ? (
										<>
											<NewComment user={user} postId={onePost.id} />
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
			)}
		</>
	);
}
