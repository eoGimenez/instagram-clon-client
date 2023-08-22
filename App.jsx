import './App.css';
import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/User/Profile/Profile';
import PageNotFound from './Pages/PageNotFound/PageNotFound';

export default function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='profile/:userId' element={<Profile />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
			<Footer />
		</>
	);
}
