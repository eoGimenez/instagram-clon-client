import { useContext, useEffect } from 'react';
import './Profile.css';
import { AuthContext } from '../../../context/auth.context';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
	const { user } = useContext(AuthContext);

	return (
		<>
			{user && (
				<div>
					<h1>{user.username}</h1>
				</div>
			)}
		</>
	);
}
