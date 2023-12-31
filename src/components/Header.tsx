import { FC } from 'react'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '../hooks/useAuth.ts'

import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper.ts'
import { useAppDispatch } from '../store/hooks.ts'
import { logout } from '../store/user/userSlice.ts'

const Header: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const isAuth = useAuth()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('You logged out')
		navigate('/')
	}

	const routes = [
		{
			path: '/transactions',
			title: 'Transactions'
		},
		{
			path: '/categories',
			title: 'Categories'
		}
	]

	return (
		<header className='flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm'>
			<Link to='/'>
				<FaBtc size={30} />
			</Link>

			{isAuth && (
				<nav className='ml-auto mr-10 '>
					<ul className='flex items-center gap-5'>
						{routes.map((item, index) => (
							<li key={index}>
								<NavLink
									to={item.path}
									className={({ isActive }) =>
										isActive ? 'text-white' : 'text-white/50'
									}
								>
									{item.title}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			)}

			{isAuth ? (
				<button onClick={logoutHandler} className='btn btn-red'>
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					to='/auth'
					className='ml-auto py-2 text-white/50 hover:text-white'
				>
					Log in / Sign in
				</Link>
			)}
		</header>
	)
}

export default Header
