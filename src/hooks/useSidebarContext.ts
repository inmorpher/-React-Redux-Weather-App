import { useContext } from 'react';
import { SidebarContext } from '../context/Sidebar.context';
//TODO: add documentation
export const useSidebarContext = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebarContext must be used within a SidebarProvider');
	}
	return context;
};
