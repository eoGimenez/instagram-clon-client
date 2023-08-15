import { useContext } from 'react';
import './Response.css';
import { AuthContext } from '../../../context/auth.context';

export default function Response({ response }) {
	const { user } = useContext(AuthContext);
	return (
		<div className='response--container'>
			<p className='response--container--parraf'>
				<span>{response.username}</span>: {response.text}
			</p>
			{response.edited && <p className='response--container--edited'>Editado.</p>}
			{response.author_response.id == user.id && (
				<p className='response--container--update'>Editar.</p>
			)}
		</div>
	);
}
