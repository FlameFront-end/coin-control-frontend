import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header.tsx'

const Layout: FC = () => {
	return (
		<div className='font-roboto min-h-screen bg-slate-900 pb-20 text-white'>
			<Header />
			<div className='container'>
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
