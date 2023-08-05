import { useEffect, useState } from 'react';
import './App.css';
import PostCard from '../components/Posts/PostCard/PostCard';

export default function App() {
	const [posts, setPosts] = useState([]);

	// const API_URL = 'https://server-1-j5716028.deta.app';
	const API_URL = 'http://127.0.0.1:8000';

	useEffect(() => {
		let isCancelled = false;

		fetch(`${API_URL}/post/`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				if (!isCancelled) {
					setPosts(data.reverse());
				}
			})
			.catch((err) => {
				console.log(err);
				// alert(err);
			});
		return () => {
			isCancelled = true;
		};
	}, []);

	return (
		<section className='section--app'>
			<h1 className='probando'>Renderizando main, desde APP</h1>
			{posts && posts.map((post) => <PostCard post={post} key={post.id} />)}
		</section>
	);
}
