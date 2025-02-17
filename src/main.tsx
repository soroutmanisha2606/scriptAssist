import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import Signup from './components/signupForm/SignUpForm';
import Resource from './pages/Resourse/Resource';

export const routes = [
	{
		path: '/resource',
		element: <Landing />,
		
		isPrivate:true
	
			
	},
	{ path: "*", element: <h1>404 Not Found</h1>, isPrivate: false },
	{
		path: '/login',
		element: <Login />,
		isPrivate: false
	
	},
	{
		path: '/signup',
		element: <Signup />,
		isPrivate: false

			},
	{
		path: '/resource/:id',
		element: <Resource />,
		isPrivate:true
	
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
