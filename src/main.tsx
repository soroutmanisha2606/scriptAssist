import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore from './store/authStore';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import Signup from './components/signupForm/SignUpForm';
import Resource from './pages/Resourse/Resource';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export const routes = [
  {
    path: '/',
    element: <Navigate to="/login" />, // Redirect to login initially
    isPrivate: false
  },
  {
    path: '/resource',
    element: <ProtectedRoute element={<Landing />} />, // Protecting the route
    isPrivate: true
  },
  {
    path: '/resource/:id',
    element: <ProtectedRoute element={<Resource />} />, // Protecting the resource details page
    isPrivate: true
  },
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
    path: '*',
    element: <h1>404 Not Found</h1>,
    isPrivate: false
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
