import { AxiosError } from 'axios'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { setTokenToLocalStorage } from '../helpers/localstorage.helper.ts'
import { AuthService } from '../services/auth.service.ts'
import { useAppDispatch } from '../store/hooks.ts'
import { login } from '../store/user/userSlice.ts'
import { IUserData } from '../types/types.ts'

const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState(true)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const toggleIsLogin = () => {
		setIsLogin(prevState => !prevState)
	}

	const registrationHandler = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()

			const user: IUserData = {
				email,
				password
			}

			const data = await AuthService.registration(user)

			if (data) {
				toast.success('Account has been created')
				setIsLogin(prevState => !prevState)
			}
		} catch (err: AxiosError | any) {
			if (err instanceof AxiosError) {
				const errorMessage = err.response?.data?.message
				if (errorMessage) {
					toast.error(errorMessage)
				}
			} else {
				const errorMessages = err.response?.data?.message

				if (
					errorMessages &&
					Array.isArray(errorMessages) &&
					errorMessages.length > 0
				) {
					errorMessages.forEach((errorMessage: string) => {
						toast.error(errorMessage)
					})
				}
			}
		}
	}

	const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()

			const user: IUserData = {
				email,
				password
			}

			const data = await AuthService.login(user)

			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('You logged in.')
				navigate('/transactions')
			}
		} catch (err: any) {
			const errorMessages = err.response?.data?.message

			if (
				errorMessages &&
				Array.isArray(errorMessages) &&
				errorMessages.length > 0
			) {
				errorMessages.forEach((errorMessage: string) => {
					toast.error(errorMessage)
				})
			}
		}
	}

	return (
		<div className='mt-40 flex flex-col items-center justify-center bg-slate-900 text-white'>
			<h1 className='mb-10 text-center text-xl'>
				{isLogin ? 'Login' : 'Registration'}
			</h1>

			<form
				className='mx-auto flex w-1/3 flex-col gap-5'
				onSubmit={isLogin ? loginHandler : registrationHandler}
			>
				<input
					type='text'
					className='input'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type='password'
					className='input'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type='submit' className='btn btn-green mx-auto'>
					Submit
				</button>
			</form>

			<div className='mt-5 flex justify-center'>
				{isLogin ? (
					<button
						className='text-slate-300 hover:text-white'
						onClick={toggleIsLogin}
					>
						You don't have an account?
					</button>
				) : (
					<button
						className='text-slate-300 hover:text-white'
						onClick={toggleIsLogin}
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
