import { useEffect, useRef, useState } from 'react';

export function useIntersection({ externalRef, once = true } = {}) {
  const [newLimit, setNewLimit] = useState(5);
  const [isNearScreen, setIsNearScreen] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    let observer;

    const element = externalRef ? externalRef.current : elementRef.current;

    // setIsNearScreen(false);
    const onChange = (entries, observer) => {
      const element = entries[0];
      if (element.isIntersecting) {
        setTimeout(() => {
          setIsNearScreen(true);
          setNewLimit((prevLimit) => prevLimit + 5);
          once && observer.disconnect();
        }, 200);
      } else {
        !once && setIsNearScreen(false);
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: '100px',
    });
    1;
    element ? observer.observe(element) : null;
  }, []);

  return { elementRef, newLimit, isNearScreen };
}
