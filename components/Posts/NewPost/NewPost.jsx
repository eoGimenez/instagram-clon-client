import { useField } from '../../../hooks/useField';
import { useFile } from '../../../hooks/useFile';
import './NewPost.css';
import Uploader from '../../HandlerImage/Uploader/Uploader';
import LoadingImage from '../../HandlerImage/Loading/LoadingImage';
import Successfull from '../../HandlerImage/Successfull/Successfull';
import { usePost } from '../../../hooks/usePost';

export default function NewPost({ user }) {
	const caption = useField({ type: 'text', field: '' });
	const { image, isLoadingImg, status, onChange, handleDrag, handleDrop } = useFile();
	const { createPost } = usePost();

	console.log(user);
	const handleNewPost = (e) => {
		e.preventDefault();
		createPost({
			userId: user.id,
			caption: caption.value,
			image: image,
		});
	};

	return (
		<div className='modal--new--post'>
			<form onSubmit={handleNewPost} className='modal--new--post--form'>
				<fieldset>
					<input {...caption} placeholder='Describe aqui tu post' required />
				</fieldset>
				<fieldset>
					{!image && !isLoadingImg && (
						<Uploader
							onChange={onChange}
							status={status}
							handleDrag={handleDrag}
							handleDrop={handleDrop}
						/>
					)}
					{!image && isLoadingImg && <LoadingImage />}
					{image && <Successfull image={image} />}
				</fieldset>
				<button className='modal--new--post--btn'>Crear post</button>'
			</form>
		</div>
	);
}
