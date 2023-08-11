import { useContext } from 'react';
import './Footer.css';
import { AuthContext } from '../../context/auth.context';
import { useSwitch } from '../../hooks/useSwitch';
import NewPost from '../Posts/NewPost/NewPost';

export default function Footer() {
	const { isLoggedIn, user } = useContext(AuthContext);
	const { isTrue, switchingGeneric } = useSwitch();
	
	return (
		<footer className={`footer--user--${isTrue}`}>
			{isTrue && <NewPost user={user} />}
			{isLoggedIn && (
				<div className='footer--user--container'>
					<p
						onClick={() => {
							globalThis.window.scrollTo(0, 0);
						}}
					>
						<ion-icon name='home-outline'></ion-icon>
					</p>
					<p onClick={switchingGeneric}>
						<ion-icon name='add-circle-outline'></ion-icon>
					</p>
					<img
						src={user.avatar}
						alt={`${user.username}'s avatar`}
						className='footer--user--avatar'
					/>
				</div>
			)}
		</footer>
	);
}
