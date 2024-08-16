import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CityListProvider } from './context/CityList.context';
import { DailyProvider } from './context/Daily.context';
import { MetricProvider } from './context/Metric.context';
import { SidebarProvider } from './context/Sidebar.context';
import { ThemeProvider } from './context/Theme.context';
import router from './router';

const App: React.FC = () => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<CityListProvider>
					<MetricProvider>
						<SidebarProvider>
							<DailyProvider>
								<RouterProvider router={router} />
							</DailyProvider>
						</SidebarProvider>
					</MetricProvider>
				</CityListProvider>
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
