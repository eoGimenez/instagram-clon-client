import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import Profile from './Pages/Profile/Profile';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import PostDetail from './Pages/PostDetail/PostDetail';
import { useSwitch } from './hooks/useSwitch';

export default function App() {
  const { isTrue, switchingGeneric } = useSwitch();

  return (
    <>
      {!isTrue ? (
        <div className='info--div' onClick={switchingGeneric}>
          <div className='info--div--blackout'>
            <p className='info--div--blackout--text'>
              Descargo de Responsabilidad para la Red Social Educativa <br />
              La siguiente aplicación ha sido diseñada con un único propósito
              educativo y formativo. Su contenido y los perfiles de usuario
              incluidos son completamente ficticios y se han creado con el
              objetivo de proporcionar un entorno de aprendizaje simulado.
              Cualquier semejanza con situaciones, personas o eventos reales es
              puramente coincidencia.
              <br />
              1. Esta red social se ha creado exclusivamente para presentar y
              demostrar el proyecto que he desarrollado. Por lo tanto, su uso
              está restringido únicamente a la exploración y evaluación de mi
              proyecto, y cualquier uso indebido o malicioso queda estrictamente
              prohibido.
              <br />
              2. Todos los contenidos, publicaciones, comentarios y perfiles de
              usuario presentes en esta plataforma son imaginarios y ficticios.
              No representan a personas o entidades reales. Cualquier
              coincidencia con nombres, fotografías o información biográfica de
              personas reales es completamente accidental.
              <br />
              3. Esta red social no recopila ni almacena información personal
              real de sus usuarios. Cualquier dato proporcionado por los
              usuarios, como nombres o fotos de perfil, se utiliza con fines
              puramente educativos y se elimina periódicamente. No se comparte
              con terceros ni se utiliza para ningún otro propósito.
              <br />
              4. Los usuarios de esta red social deben comprometerse a
              utilizarla de manera ética y respetuosa. Cualquier forma de acoso,
              difamación, contenido inapropiado o violación de los derechos de
              propiedad intelectual está estrictamente prohibida y será motivo
              de expulsión.
              <br />
              5. El propietario y administrador de esta red social educativa no
              asume ninguna responsabilidad por el uso inapropiado o indebido de
              la plataforma. Los usuarios son los únicos responsables de su
              conducta en la red social.
              <br />
              Al utilizar esta red social educativa, acepta los términos y
              condiciones descritos en este descargo de responsabilidad. Si no
              está de acuerdo con estos términos, le recomendamos que abandone
              la plataforma de inmediato.
              <br />
              ¡Disfrute de su experiencia educativa en esta red social
              ficticia!
            </p>
          </div>
        </div>
      ) : null}
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/post/:postId' element={<PostDetail />} />
        <Route path='/:userId' element={<Profile />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
