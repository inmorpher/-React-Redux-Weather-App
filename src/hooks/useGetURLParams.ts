import { useParams } from 'react-router-dom';

export const useGetURLParams = () => {
	const params = useParams();
	const urlParams = Object.values(params).join(',');

	return urlParams;
};
