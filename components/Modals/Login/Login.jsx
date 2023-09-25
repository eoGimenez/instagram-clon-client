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
        <div className='modal--logo--container'>
          <img
            src='https://res.cloudinary.com/dbld4vcec/image/upload/v1695676263/brand-instagram_cpvqmp.png'
            alt='Instagram logo'
            className='modal--logo'
          />
          <p>InstaAPP</p>
        </div>
        {errorMessage ? (
          <p className='modal--login--errormessage'>{errorMessage}</p>
        ) : null}
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
