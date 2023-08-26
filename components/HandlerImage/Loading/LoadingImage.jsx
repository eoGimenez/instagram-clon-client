import './LoadingImage.css'
import { LineWobble } from '@uiball/loaders';

export default function LoadingImage() {
	return (
		<div className='loading--container'>
			<h3>Uploading...</h3>
			<LineWobble size={200} lineWeight={5} speed={1.75} color='#2F80ED' />
		</div>
	);
}
