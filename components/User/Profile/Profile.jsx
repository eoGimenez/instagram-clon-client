import { useEffect } from 'react';
import './Profile.css';
import { usePost } from '../../../hooks/usePost';
import { useParams } from 'react-router-dom';
import Loading from '../../Loading/Loading';

export default function Profile() {
	const { userId } = useParams();
	const { userPosts, getUserPosts, isLoading } = usePost();

	useEffect(() => {
		getUserPosts({ userId });
	}, []);

	console.log(userPosts);
	return (
		<>
			{isLoading && <Loading />}
			{!isLoading && userPosts && (
				<div className='profile--users--posts'>
					{userPosts.map((post) => (
						<div className='profile--users--post--container' key={post.id}>
							<img
								src={post.image_url}
								alt={`La imagen del post del usuario ${post.author.username} en el post numero: ${post.id}`}
								className='profile--users--post--img'
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
}
