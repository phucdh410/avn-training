import { useState } from 'react';

export const useToggle = (defaultValue = false) => {
	const [baseState, setBaseState] = useState(defaultValue);

	const onToggleState = value => {
		if (value !== undefined || value !== null) {
			setBaseState(value);
		} else {
			setBaseState(!baseState);
		}
	};

	return [baseState, onToggleState];
};
