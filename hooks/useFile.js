import { useState } from 'react';

export function useFile() {
	const [image, setImage] = useState(null);
	const [status, setStatus] = useState({});
	const [isLoadingImg, setIsLoadingImg] = useState(false);

	const API_URL = `${import.meta.env.VITE_API_URL}`;

	const onChange = (e) => {
		handleImage(e.target.files[0]);
	};

	const handleDrag = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		handleImage(e.dataTransfer.files[0]);
	};

	const handleImage = (file) => {
		setIsLoadingImg(true);

		const storedToken = localStorage.getItem('authToken');

		const uploadData = new FormData();
		uploadData.append('image', file);

		const requestOptions = {
			method: 'POST',
			headers: new Headers({
				Authorization: `Bearer ${storedToken}`,
			}),
			body: uploadData,
		};

		fetch(`${API_URL}/post/upload`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				setStatus({ message: 'The file was successfully uploaded' });
				setImage(data.url);
				setIsLoadingImg(false);
			})
			.catch((err) => {
				setStatus({
					message: 'Ocurrió un error de red, por favor, inténtalo nuevamente',
					codeError: err,
				});
				setIsLoadingImg(false);
			});
	};
	return {
		image,
		status,
		isLoadingImg,
		onChange,
		handleDrag,
		handleDrop,
	};
}
