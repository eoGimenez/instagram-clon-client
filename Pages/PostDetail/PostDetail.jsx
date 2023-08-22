import { useContext, useEffect } from 'react';
import { usePost } from '../../hooks/usePost';
import './PostDetail.css';
import { AuthContext } from '../../context/auth.context';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
	const { postId } = useParams();
	const { onePost, getPostById } = usePost();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getPostById({ postId });
	}, [postId]);

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
						{user && user.id === onePost.author.id ? (
							<button className='post--card--header--btn--delete' onClick={null}>
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
						<div className='post--container--comments--container'>
							{onePost.comments.length === 0 ? (
								<p
									className='post--container--comment--parraf'
									onClick={null}
								>{`Aun no hay comentarios`}</p>
							) : (
								<p
									className='post--container--comment--parraf'
									onClick={null}
								>{`Ver los ${onePost.comments.length} commentarios`}</p>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
