import './Successfull.css';

export default function Successfull({ image }) {
	return (
		<div className='successfull--container'>
			<span className='material-symbols-outlined'>check_circle</span>
			<h3>Upload successfully</h3>
			<div className='img--container'>
				{' '}
				<img src={image} alt='Image uploaded' />
			</div>
		</div>
	);
}
