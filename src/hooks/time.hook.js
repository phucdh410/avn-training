import { useEffect, useState } from 'react';

export const useCountdown = (second = 0) => {
	const [secondCount, setSecondCount] = useState(second);

	useEffect(() => {
		setTimeout(() => {
			if (secondCount > 0) {
				setSecondCount(secondCount - 1);
			}
		}, 1000);
	}, [secondCount]);

	return [secondCount, setSecondCount];
};
