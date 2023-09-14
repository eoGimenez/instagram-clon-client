import { useEffect, useRef, useState } from 'react';

export function useIntersection({ externalRef, once = true } = {}) {
	const [newLimit, setNewLimit] = useState(5);
	const [isNearScreen, setIsNearScreen] = useState(false);
	const elementRef = useRef();

	console.log(once);

	useEffect(() => {
		let observer;

		const element = externalRef ? externalRef.current : elementRef.current;

		setIsNearScreen(false);
		const onChange = (entries, observer) => {
			const element = entries[0];
			if (element.isIntersecting) {
				setIsNearScreen(true);
				setNewLimit((prevLimit) => prevLimit + 5);
				once && observer.disconnect();
			}
		};

		observer = new IntersectionObserver(onChange, {
			rootMargin: '100px',
		});

		element ? observer.observe(element) : null;
	}, []);

	return { elementRef, newLimit, isNearScreen };
}
