import { useField } from '../../../hooks/useField';
import { useSwitch } from '../../../hooks/useSwitch';
import './Login.css';

export default function Login({ isTrue }) {
	const { switching } = useSwitch();
	const username = useField({ type: 'text', field: '' });
	const password = useField({ type: 'password', field: '' });

	return (
		<>
			<div className={`modal--login--container--${isTrue}`}>
				<img
					src='https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png'
					alt='Instagram logo'
					className='modal--logo'
				/>
				<form onSubmit={null} className='modal--login--form'>
					<fieldset>
						<input {...username} placeholder='Username' required />
					</fieldset>
					<fieldset>
						<input {...password} placeholder='Password' required />
					</fieldset>
					<button>Login</button>
					<p className='modal--parraf'>
						No tienes cuenta ? <span>hazte una!</span>
					</p>
				</form>
			</div>
		</>
	);
}
