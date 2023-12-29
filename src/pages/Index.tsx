import { FC } from 'react'
import { Link } from 'react-router-dom'

const Index: FC = () => {
	return (
		<div className='my-56 flex flex-col items-center justify-center gap-5'>
			<h1 className='text-3xl font-bold'>
				To start using the app, please register or log in to your account
			</h1>
			<Link to='/auth' className='btn btn-green text-lg'>
				Log in / Sign in
			</Link>
		</div>
	)
}

export default Index
