import { useContext, useEffect } from 'react';
import './Profile.css';
import { usePost } from '../../../hooks/usePost';
import { useParams } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { useUser } from '../../../hooks/useUser';
import { useSwitch } from '../../../hooks/useSwitch';
import { AuthContext } from '../../../context/auth.context';
import UpdateUser from '../UpdateUser/UpdateUser';

export default function Profile() {
	const { user } = useContext(AuthContext);
	const { userId } = useParams();
	const { userPosts, getUserPosts, isLoading } = usePost();
	const { userById, getUserById } = useUser();
	const { isTrue, switchingGeneric } = useSwitch();

	useEffect(() => {
		getUserPosts({ userId });
		getUserById({ userId });
	}, []);
	console.log(userById);
	return (
		<>
			{isLoading && <Loading />}
			{!isTrue && !isLoading && userById && (
				<div className='profile--user--details'>
					<div className='profile--img--container'>
						<img
							src={userById.avatar}
							alt={`La imagen de perfil del usuario: ${userById.username}`}
							className='profile--user--details--img'
						/>
						{user.id == userById.id ? (
							<p onClick={switchingGeneric}>Cambiar imagen</p>
						) : null}
					</div>
					<h1>{userById.username}</h1>
				</div>
			)}
			{isTrue && !isLoading && <UpdateUser user={user} />}
			{!isTrue && !isLoading && userPosts && (
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