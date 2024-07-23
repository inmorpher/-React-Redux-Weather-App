import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
	const queryClient = new QueryClient();
	return (
		// <Suspense fallback={<div>...loading</div>}>
		<QueryClientProvider client={queryClient}>
			<SidebarProvider>
				<DailyProvider>
					<RouterProvider router={router} />
				</DailyProvider>
			</SidebarProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
		// </Suspense>
	);
};

export default App;
