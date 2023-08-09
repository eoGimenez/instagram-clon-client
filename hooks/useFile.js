import { useState } from 'react';

export function useFIeld() {
	const [image, setImage] = useState(null);
	const [status, setStatus] = useState({});
	const [isLoadingImg, setIsLoadingImg] = useState(false);

	const API_URL = `${import.meta.env.VITE_API_URL}`;
}
