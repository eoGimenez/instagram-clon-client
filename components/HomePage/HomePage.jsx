import React from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePost } from '../../hooks/usePost';
import Loading from '../Loading/Loading';
import PostCard from '../Posts/PostCard/PostCard';
import './HomePage.css';

export default function HomePage() {
	const { elementRef, newLimit, isNearScreen } = useIntersection();
	const { posts, isLoading } = usePost({ limit: newLimit });

	// const PostCard = React.lazy(() => import('../Posts/PostCard/PostCard'));
	return (
		<>
			<section className='section--app'>
				{
					<div className='home--page--post--card'>
						{posts?.map((post) => (
							<PostCard post={post} key={post.id} />
						))}
					</div>
				}
				{isLoading | !isNearScreen ? <Loading /> : null}
			</section>
			<div ref={elementRef}></div>
		</>
	);
}
