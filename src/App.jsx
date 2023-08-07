import './App.css';
import PostCard from '../components/Posts/PostCard/PostCard';
import { usePost } from '../hooks/usePost';
import Loading from '../components/Loading/Loading';
import Nav from '../components/Nav/Nav';

export default function App() {
	const { posts, isLoading } = usePost();

	return (
		<>
			<Nav />
			<section className='section--app'>
				{isLoading && <Loading />}
				{!isLoading && posts && posts.map((post) => <PostCard post={post} key={post.id} />)}
			</section>
		</>
	);
}
