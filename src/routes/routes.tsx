import { createBrowserRouter } from 'react-router-dom'

import { categoriesAction, categoriesLoader } from '../pages/Categories.tsx'
import {
	transactionsAction,
	transactionsLoader
} from '../pages/Transactions.tsx'

import { ProtectedRoute } from '../components'
import Layout from '../Layouts/Layout.tsx'
import { Auth, Categories, ErrorPage, Home, Transactions } from '../pages'

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: 'transactions',
				loader: transactionsLoader,
				action: transactionsAction,
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				)
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoriesLoader,
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				)
			},
			{
				path: '/auth',
				element: <Auth />
			}
		]
	}
])
