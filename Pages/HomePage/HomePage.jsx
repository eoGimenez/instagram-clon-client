import React, { Suspense, useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { usePost } from '../../hooks/usePost';
import Loading from '../../components/Loading/Loading';
import PostCard from '../../components/Posts/PostCard/PostCard';
import './HomePage.css';

export default function HomePage() {
  const externalRef = useRef();
  const { newLimit, isNearScreen } = useIntersection({
    externalRef,
    once: false,
  });
  const { posts, isLoading } = usePost({ limit: newLimit ? newLimit : null });

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
        {isLoading && !isNearScreen && <Loading />}
      </section>
      <div ref={externalRef}></div>
    </>
  );
}
