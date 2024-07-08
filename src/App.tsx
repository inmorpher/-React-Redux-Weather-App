import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { DailyProvider } from './context/Daily.context';
import { SidebarProvider } from './context/Sidebar.context';
import { router } from './router';
import { useAppDispatch } from './store/hooks.type';
import { fetchUserList } from './store/slices/userSlice';

const App: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUserList());
	}, [dispatch]);

	return (
		<Suspense fallback={<div>...loading</div>}>
			<SidebarProvider>
				<DailyProvider>
					<RouterProvider router={router} />
				</DailyProvider>
			</SidebarProvider>
		</Suspense>
	);
};

export default App;
