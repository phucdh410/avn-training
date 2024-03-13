import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

export const useQuery = () => {
	const search = useLocation().search;

	return parse(search);
};
