import { useState } from 'react';

export function useField({ type, field }) {
	const [value, setValue] = useState(field);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	return {
		type,
		value,
		onChange,
	};
}
