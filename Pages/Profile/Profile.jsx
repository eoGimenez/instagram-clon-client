import { useContext, useEffect } from 'react';
import './Profile.css';
import { usePost } from '../../hooks/usePost';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useUser } from '../../hooks/useUser';
import { useSwitch } from '../../hooks/useSwitch';
import { AuthContext } from '../../context/auth.context';
import UpdateUser from '../../components/User/UpdateUser/UpdateUser';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const { userPosts, getUserPosts, isLoading } = usePost();
  const { userById, getUserById } = useUser();
  const { isTrue, switchingGeneric } = useSwitch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserPosts({ userId });
    getUserById({ userId });
  }, []);

  return (
    <section className='section--profile--user--details'>
      {isLoading && <Loading />}
      {!isTrue && !isLoading && userById && (
        <div className='profile--user--details'>
          <div className='profile--img--container'>
            <img
              src={userById.avatar}
              alt={`La imagen de perfil del usuario: ${userById.username}`}
              className='profile--user--details--img'
            />
            {user && user.id == userById.id ? (
              <p onClick={switchingGeneric}>Cambiar imagen</p>
            ) : null}
          </div>
          <h1>{userById.username}</h1>
        </div>
      )}
      {isTrue && !isLoading && <UpdateUser user={user} />}
      {!isTrue && !isLoading && userPosts && (
        <div className='profile--users--posts'>
          {userPosts.map((post) => (
            <div className='profile--users--post--container' key={post.id}>
              <img
                src={post.image_url}
                alt={`La imagen del post del usuario ${post.author.username} en el post numero: ${post.id}`}
                className='profile--users--post--img'
                onClick={() => {
                  navigate(`/post/${post.id}`);
                }}
              />
            </div>
          ))}
        </div>
      )}
      {!userById && (
        <div className='profile--user--nouser'>
          <h2>{`El usuario con el id: ${userId}, no existe.`}</h2>
          <p
            className='profile--user--nouser--parraf'
            onClick={() => {
              navigate('/');
            }}
          >
            Home
          </p>
        </div>
      )}
    </section>
  );
}
