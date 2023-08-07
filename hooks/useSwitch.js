import { useState } from 'react';

export function useSwitch() {
	const [isTrue, setIsTrue] = useState(false);
	const [isTrueSign, setIsTrueSign] = useState(false);

	const switchingLogin = () => {
		setIsTrue(!isTrue);
		setIsTrueSign(false);
	};
	const switchingSignup = () => {
		setIsTrueSign(!isTrueSign);
		setIsTrue(false);
	};

	return { isTrue, isTrueSign, switchingSignup, switchingLogin };
}
