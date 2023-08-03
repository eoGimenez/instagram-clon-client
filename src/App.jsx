import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
	const [posts, setPosts] = useState([]);

	const API_URL = 'https://server-1-j5716028.deta.app/';
	// const API_URL = 'http://127.0.0.1:8000/';

	console.log(posts);

	useEffect(() => {
		let isCancelled = false;
		fetch(`${API_URL}post/`)
			.then((response) => response.json())
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
			{posts &&
				posts.map((post, i) => (
					<div key={i}>
						<h2>{post.caption}</h2>
						<img src={post.image_url} alt={`imagen del post ${post.image_url}`} />
						<h3>{post.author.username}</h3>
					</div>
				))}
		</section>
	);
}
