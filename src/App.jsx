import './App.css';
import { Routes, Route } from 'react-router-dom';

import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import HomePage from '../components/HomePage/HomePage';
import Profile from '../components/User/Profile/Profile';

export default function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>
			<Footer />
		</>
	);
}
