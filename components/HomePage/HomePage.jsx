import React, { useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePost } from '../../hooks/usePost';
import Loading from '../Loading/Loading';
import PostCard from '../Posts/PostCard/PostCard';
import './HomePage.css';
import debounce from 'just-debounce-it';

export default function HomePage() {
	const externalRef = useRef();
	const { newLimit } = useIntersection({
		externalRef,
		once: false,
	});
	const { posts, isLoading } = usePost({ limit: newLimit ? newLimit : null });

	// const PostCard = React.lazy(() => import('../Posts/PostCard/PostCard'));

	/* 	const debounceHandleNewLimit = useCallback(debounce(newLimit, 500), []);

	useEffect(() => {
		console.log('en el eff')
		if (isNearScreen) debounceHandleNewLimit();
	}, [isNearScreen]); */

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
				{isLoading ? <Loading /> : null}
			</section>
			<div ref={externalRef}></div>
		</>
	);
}
