import { useEffect, useRef, useState } from 'react';

export function useIntersection({ once = true} = {}) {
	const [newLimit, setNewLimit] = useState(5);
	const [isNearScreen, setIsNearScreen] = useState(false);
	const elementRef = useRef();

	console.log(newLimit);
	useEffect(() => {
		setIsNearScreen(false);
		const onChange = (entries) => {
			const element = entries[0];
			if (element.isIntersecting) {
				setIsNearScreen(true);
				setNewLimit((prevLimit) => prevLimit + 5);
				once && observer.disconnect()
			}
		};

		const observer = new IntersectionObserver(onChange, {
			rootMargin: '100px',
		});

		observer.observe(elementRef.current);
	}, []);

	return { elementRef, newLimit, isNearScreen };
}
