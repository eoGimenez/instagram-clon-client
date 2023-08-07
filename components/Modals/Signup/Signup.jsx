import { useField } from '../../../hooks/useField';
import './SIgnup.css';

export default function Signup({ isTrueSign }) {
	const username = useField({ type: 'text', field: '' });
	const email = useField({ type: 'text', field: '' });
	const password = useField({ type: 'password', field: '' });
	const rePassword = useField({ type: 'password', field: '' });
	return (
		<div className={`modal--signup--container--${isTrueSign}`}>
			<img
				src='https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png'
				alt='Instagram logo'
				className='modal--logo'
			/>
			<form onSubmit={null} className='modal--signup--form'>
				<fieldset>
					<input {...username} placeholder='Username' required />
				</fieldset>
				<fieldset>
					<input {...email} placeholder='Password' required />
				</fieldset>
				<fieldset>
					<input {...password} placeholder='Password' required />
				</fieldset>
				<fieldset>
					<input {...rePassword} placeholder='Password' required />
				</fieldset>
				<button>Registrar</button>
				<p className='modal--parraf'>
					Ya tienes cuenta ? <span>Conectate!</span>
				</p>
			</form>
		</div>
	);
}
