import { useContext } from 'react';
import { DailyContext } from '../context/Daily.context';

export const useDailyContext = () => {
	const context = useContext(DailyContext);
	if (!context) {
		throw new Error('usePopupContext must be used within a PopupProvider');
	}
	return context;
};
