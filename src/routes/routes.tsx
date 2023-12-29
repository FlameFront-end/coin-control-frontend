import { createBrowserRouter } from 'react-router-dom'

import Auth from '../pages/Auth.tsx'
import Categories from '../pages/Categories.tsx'
import ErrorPage from '../pages/ErrorPage.tsx'
import Home from '../pages/Home.tsx'
import Transactions from '../pages/Transactions.tsx'

import ProtectedRoute from '../components/ProtectedRoute.tsx'

import Layout from '../Layouts/Layout.tsx'

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/home',
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				)
			},
			{
				path: 'transactions',
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				)
			},
			{
				path: 'categories',
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				)
			},
			{
				path: '',
				element: <Auth />
			}
		]
	}
])
