import { FC } from 'react'
import { Link } from 'react-router-dom'

import img from '../assets/page-not-found.png'

const ErrorPage: FC = () => {
	return (
		<div className='font-roboto flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-900 text-white'>
			<img src={img} alt='img' />
			<Link to='/' className='rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600'>
				Back
			</Link>
		</div>
	)
}

export default ErrorPage
