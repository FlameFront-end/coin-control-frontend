import { FC, ReactNode } from 'react'

import { useAuth } from '../hooks/useAuth.ts'

import ErrorPage from '../pages/ErrorPage.tsx'

interface ProtectedRouteProps {
	children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const isAuth = useAuth()

	return <>{isAuth ? children : <ErrorPage />}</>
}

export default ProtectedRoute
