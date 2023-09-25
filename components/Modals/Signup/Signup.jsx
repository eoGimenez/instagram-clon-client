import { useSignup } from '../../../hooks/useAuth';
import { useField } from '../../../hooks/useField';

import './SIgnup.css';

export default function Signup({ isTrueSign, switchingGeneric }) {
  const username = useField({ type: 'text', field: '' });
  const email = useField({ type: 'text', field: '' });
  const password = useField({ type: 'password', field: '' });
  const rePassword = useField({ type: 'password', field: '' });

  const { signUp, errorMessage } = useSignup({
    username: username.value,
    password: password.value,
    rePassword: rePassword.value,
    email: email.value,
  });

  return (
    <div className={`modal--signup--container--${isTrueSign}`}>
      <img
        src='https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png'
        alt='Instagram logo'
        className='modal--logo'
      />
      {errorMessage ? (
        <p className='modal--signup--errormessage'>{errorMessage}</p>
      ) : null}
      <form onSubmit={signUp} className='modal--signup--form'>
        <fieldset>
          <input {...username} placeholder='Username' required />
        </fieldset>
        <fieldset>
          <input {...email} placeholder='email@ejemplo.com' required />
        </fieldset>
        <fieldset>
          <input {...password} placeholder='Password' required />
        </fieldset>
        <fieldset>
          <input {...rePassword} placeholder='Confirme password' required />
        </fieldset>
        <button>Registrar cuenta</button>
        <p className='modal--parraf'>
          Ya tienes cuenta ? <span onClick={switchingGeneric}>Conectate!</span>
        </p>
      </form>
    </div>
  );
}
