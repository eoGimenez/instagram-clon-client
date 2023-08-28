import { useContext } from 'react';
import { useSwitch } from '../../hooks/useSwitch';
import Login from '../Modals/Login/Login';
import Signup from '../Modals/Signup/Signup';
import './Nav.css';
import { AuthContext } from '../../context/auth.context';

export default function Nav() {
	const { isTrue, switchingGeneric, isTrueSign, switchingSignup } = useSwitch();
	const { isLoggedIn, logOutUser } = useContext(AuthContext);

	// Pensar en como bloquear el scroll para que cuando cualqueir modal este activo,
	// no se puedan mover por la app
	// if (isTrue || isLoggedIn) {
	// 	globalThis.window.screenTop;
	// }

	return (
		<header className='header--nav--container'>
			<nav className='nav'>
				<img
					src='https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png'
					alt='Instagram logo'
					className='nav--logo'
				/>
				<div className='nav--buttons--container'>
					{isLoggedIn ? (
						<button className='btn--nav' onClick={logOutUser}>
							Logout
						</button>
					) : (
						<>
							<button className='btn--nav' onClick={switchingGeneric}>
								Login
							</button>
							<button className='btn--nav' onClick={switchingSignup}>
								Signup
							</button>
						</>
					)}
				</div>
			</nav>
			
			<div className='headers--auth--modals'>
				{isTrue && !isLoggedIn && <Login isTrue={isTrue} />}
				{isTrueSign && !isLoggedIn && <Signup isTrueSign={isTrueSign} />}
			</div>
		</header>
	);
}
