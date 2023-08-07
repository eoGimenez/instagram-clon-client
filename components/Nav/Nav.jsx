import { useSwitch } from '../../hooks/useSwitch';
import Login from '../Modals/Login/Login';
import Signup from '../Modals/Signup/Signup';
import './Nav.css';

export default function Nav() {
	const { isTrue, switchingLogin, isTrueSign, switchingSignup } = useSwitch();

	return (
		<header className='hader--nav--container'>
			<nav className='nav'>
				<img
					src='https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png'
					alt='Instagram logo'
					className='nav--logo'
				/>
				<div className='nav--buttons--container'>
					<button className='btn--nav' onClick={switchingLogin}>
						Login
					</button>
					<button className='btn--nav' onClick={switchingSignup}>
						Signup
					</button>
				</div>
			</nav>
			<div className='headers--auth--modals'>
				{isTrue && <Login isTrue={isTrue} />}
				{isTrueSign && <Signup isTrueSign={isTrueSign} />}
			</div>
		</header>
	);
}
