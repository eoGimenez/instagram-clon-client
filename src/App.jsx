import './App.css';
import PostCard from '../components/Posts/PostCard/PostCard';
import { usePost } from '../hooks/usePost';
import Loading from '../components/Loading/Loading';

export default function App() {
	const { posts, isLoading } = usePost();
	console.log(posts, isLoading);
	return (
		<section className='section--app'>
			<h1 className='probando'>Renderizando main, desde APP</h1>
			{isLoading && <Loading />}
			{!isLoading && posts && posts.map((post) => <PostCard post={post} key={post.id} />)}
		</section>
	);
}
