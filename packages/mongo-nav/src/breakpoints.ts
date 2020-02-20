import {useState, useEffect} from 'react';
import fp from 'facepaint';

export const breakpoints = {
	small: 768,
	medium: 1024,
	large: 1200,
}

export const facepaint = fp([
  `@media only screen and (max-width: ${breakpoints.small}px)`,
  `@media only screen and (min-width: ${breakpoints.small + 1}px) and (max-width: ${breakpoints.medium}px)`,
  `@media only screen and (min-width: ${breakpoints.medium + 1}px)`,
]);

export function useWindowSize() {
	const [size, setSize] = useState(window.innerWidth)

	useEffect(() => {
		const resizeHandler = () => setSize(window.innerWidth)
		window.addEventListener('resize', resizeHandler)

		return () => window.removeEventListener('resize', resizeHandler)
	}, [])

	return size;
}
