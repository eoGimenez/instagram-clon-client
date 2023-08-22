import { usePost } from '../../hooks/usePost';
import Loading from '../Loading/Loading';
import PostCard from '../Posts/PostCard/PostCard';
import './HomePage.css';

export default function HomePage() {
	const { posts, isLoading } = usePost();

	return (
		<section className='section--app'>
			{isLoading && <Loading />}
			{!isLoading && posts && posts.map((post) => <PostCard post={post} key={post.id} />)}
		</section>
	);
}
