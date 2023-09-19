import './App.css';
import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import Profile from './Pages/Profile/Profile';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import PostDetail from './Pages/PostDetail/PostDetail';

export default function App() {
	return (
		<>
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
