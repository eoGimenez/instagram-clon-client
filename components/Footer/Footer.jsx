import { useContext } from 'react';
import './Footer.css';
import { AuthContext } from '../../context/auth.context';
import { useSwitch } from '../../hooks/useSwitch';
import NewPost from '../Posts/NewPost/NewPost';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
	const { isLoggedIn, user } = useContext(AuthContext);
	const { isTrue, switchingGeneric } = useSwitch();
	const navigate = useNavigate();

	return (
		<footer className={`footer--user`}>
			{isTrue && <NewPost user={user} />}
			{isLoggedIn && (
				<div className='footer--user--container'>
					<p
						className='btn'
						onClick={() => {
							navigate('/');
						}}
					>
						<ion-icon name='home-outline'></ion-icon>
					</p>
					<p className='btn' onClick={switchingGeneric}>
						<ion-icon name='add-circle-outline'></ion-icon>
					</p>
					<img
						src={user.avatar}
						alt={`${user.username}'s avatar`}
						className='footer--user--avatar'
						onClick={() => {
							navigate(`/${user.id}`);
						}}
					/>
				</div>
			)}
		</footer>
	);
}
