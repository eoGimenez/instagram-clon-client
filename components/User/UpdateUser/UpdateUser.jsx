import { useFile } from '../../../hooks/useFile';
import { useUser } from '../../../hooks/useUser';
import LoadingImage from '../../HandlerImage/Loading/LoadingImage';
import Successfull from '../../HandlerImage/Successfull/Successfull';
import Uploader from '../../HandlerImage/Uploader/Uploader';
import './UpdateUser.css';

export default function UpdateUser({ user }) {
	const { image, isLoadingImg, status, onChange, handleDrag, handleDrop } = useFile();
	const { updateUserById } = useUser();

	const updateHandler = (e) => {
		e.preventDefault();
		updateUserById({
			userId: user.id,
			username: user.username,
			email: user.email,
			avatar: image,
		});
	};
	return (
		<form onSubmit={updateHandler} className='profile--update--user--img'>
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
			<button>Actualizar</button>
		</form>
	);
}
