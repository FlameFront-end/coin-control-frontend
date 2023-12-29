import { FC, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { getTokenFromLocalStorage } from './helpers/localstorage.helper.ts'
import { routes } from './routes/routes.tsx'
import { AuthService } from './services/auth.service.ts'
import { useAppDispatch } from './store/hooks.ts'
import { login, logout } from './store/user/userSlice.ts'

const App: FC = () => {
	const dispatch = useAppDispatch()

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await AuthService.getProfile()

				if (data) {
					dispatch(login(data))
				} else {
					dispatch(logout())
				}
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	return <RouterProvider router={routes} />
}

export default App
