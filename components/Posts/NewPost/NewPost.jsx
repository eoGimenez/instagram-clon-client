import { useField } from '../../../hooks/useField';
import { useFile } from '../../../hooks/useFile';
import './NewPost.css';
import Uploader from '../../HandlerImage/Uploader/Uploader';
import LoadingImage from '../../HandlerImage/Loading/LoadingImage';
import Successfull from '../../HandlerImage/Successfull/Successfull';

export default function NewPost() {
	const caption = useField({ type: 'text', field: '' });
	const { image, isLoadingImg, status, onChange, handleDrag, handleDrop } = useFile();

	return (
		<div className='modal--new--post'>
			<form onSubmit={null} className='modal--new--post--form'>
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
			</form>
		</div>
	);
}
