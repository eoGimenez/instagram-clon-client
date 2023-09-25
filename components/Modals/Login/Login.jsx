import { useAuth } from '../../../hooks/useAuth';
import { useField } from '../../../hooks/useField';
import './Login.css';

export default function Login({ isTrue, switchingSignup }) {
  const username = useField({ type: 'text', field: '' });
  const password = useField({ type: 'password', field: '' });

  const { handleLogin, errorMessage } = useAuth({
    username: username.value,
    password: password.value,
  });
  return (
    <>
      <div className={`modal--login--container--${isTrue}`}>
        <img
          src='https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png'
          alt='Instagram logo'
          className='modal--logo'
        />
        {errorMessage ? <p className='modal--login--errormessage'>{errorMessage}</p> : null}
        <form onSubmit={handleLogin} className='modal--login--form'>
          <fieldset>
            <input {...username} placeholder='Username' required />
          </fieldset>
          <fieldset>
            <input {...password} placeholder='Password' required />
          </fieldset>
          <button>Login</button>
          <p className='modal--parraf'>
            No tienes cuenta ? <span onClick={switchingSignup}>hazte una!</span>
          </p>
        </form>
      </div>
    </>
  );
}
