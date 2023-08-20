import { useState } from 'react';

export function useSwitch() {
	const [isTrue, setIsTrue] = useState(false);
	const [isTrueSign, setIsTrueSign] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const switchingGeneric = () => {
		setIsTrue(!isTrue);
		setIsTrueSign(false);
		setIsUpdating(false);
	};
	const switchingSignup = () => {
		setIsTrueSign(!isTrueSign);
		setIsTrue(false);
		setIsUpdating(false);
	};

	const switchingUpdate = () => {
		setIsUpdating(!isUpdating);
		setIsTrue(false);
		setIsTrueSign(false);
	};

	return { isTrue, isTrueSign, isUpdating, switchingUpdate, switchingSignup, switchingGeneric };
}
