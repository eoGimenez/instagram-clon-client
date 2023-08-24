import { useContext } from 'react';
import './Response.css';
import { AuthContext } from '../../../context/auth.context';
import { useSwitch } from '../../../hooks/useSwitch';
import { useField } from '../../../hooks/useField';
import { useResponse } from '../../../hooks/useResponse';

export default function Response({ response, commentId }) {
	const { user } = useContext(AuthContext);
	const { isTrue, switchingGeneric } = useSwitch();
	const text = useField({ type: 'text', field: '' });
	const { updateResponse, deleteResponse } = useResponse();

	const updateHandler = (e) => {
		e.preventDefault();
		updateResponse({
			text: text.value,
			commentId: commentId,
			userId: user.id,
			username: user.username,
			responseId: response.id,
		});
	};

	const deleteHandler = () => {
		deleteResponse({
			responseId: response.id,
		});
	};
	return (
		<div className='response--container'>
			{!isTrue ? (
				<>
					<div className='response--info'>
						<img
							src={response.author_response.avatar}
							alt={`The avatar of the user: ${response.username}`}
							className='response--author--avatar'
						/>
						<p className='response--container--parraf'>
							<span>{response.username}</span>: {response.text}
						</p>
					{response.edited && <p className='response--container--edited'>Editado</p>}
					</div>
					{user && response.author_response.id == user.id && (
						<div className='response--container--user--options'>
							<p onClick={switchingGeneric} className='response--parraf--options'>
								Editar...
							</p>
							<p onClick={deleteHandler} className='response--parraf--options'>
								Borrar...
							</p>
						</div>
					)}
				</>
			) : (
				<>
					<form onSubmit={updateHandler} className='response--edit--form'>
						<fieldset>
							<img
								src={response.author_response.avatar}
								alt={`The avatar of the user: ${response.username}`}
								className='response--author--avatar'
							/>
							<input {...text} placeholder={response.text} />
						</fieldset>
						<button className='new--response--form--btn'>Editar</button>
					</form>
				</>
			)}
		</div>
	);
}
