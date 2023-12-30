import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'

import { IResponseTransactionLoader } from '../types/types.ts'

import CategoryModal from './CategoryModal.tsx'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader

	const [visibleModal, setVisibleModal] = useState(false)

	return (
		<div className='rounded-md bg-slate-800 p-4'>
			<Form className='grid gap-4' method='post' action='/transactions'>
				<label htmlFor='title' className='grid'>
					<span className='mb-2'>Title</span>
					<input
						type='text'
						className='input'
						placeholder='Title...'
						name='title'
						required
					/>
				</label>
				<label htmlFor='amount' className='grid'>
					<span className='mb-2'>Amount</span>
					<input
						type='number'
						className='input'
						placeholder='Amount...'
						name='amount'
						required
					/>
				</label>

				{categories.length ? (
					<label htmlFor='category' className='grid'>
						<span className='mb-2'>Category</span>
						<select name='category' required className='input  bg-slate-800'>
							{categories.map((ctg, index) => (
								<option key={index} value={ctg.id}>
									{ctg.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className='mt-1 text-red-300'>
						To continue create to category first
					</h1>
				)}

				<button
					className='flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
					type='button'
					onClick={() => {
						setVisibleModal(true)
					}}
				>
					<FaPlus />
					<span>Manage categories</span>
				</button>

				<div className='flex items-center gap-4'>
					<label className='flex cursor-pointer items-center gap-2'>
						<input
							type='radio'
							name='type'
							value='income'
							className='form-radio text-blue-600'
						/>
						<span>Income</span>
					</label>
					<label className='flex cursor-pointer items-center gap-2'>
						<input
							type='radio'
							name='type'
							value='expense'
							className='form-radio text-blue-600'
						/>
						<span>Expense</span>
					</label>
				</div>

				<button className='btn btn-green max-w-fit' type='submit'>
					Submit
				</button>
			</Form>

			{visibleModal && (
				<CategoryModal type='post' setVisibleModal={setVisibleModal} />
			)}
		</div>
	)
}

export default TransactionForm
