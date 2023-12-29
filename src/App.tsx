import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

import { routes } from './routes/routes.tsx'

const App: FC = () => {
	return <RouterProvider router={routes} />
}

export default App
