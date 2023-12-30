import { FC } from 'react'
import type { ActionFunction } from 'react-router'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'

import { instance } from '../api/axios.api.ts'

import { Chart, TransactionForm, TransactionTable } from '../components'
import { formatToUSD } from '../helpers/currency.helper.ts'
import {
	ICategory,
	IResponseTransactionLoader,
	ITransaction
} from '../types/types.ts'

export const transactionsLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const transactions = await instance.get<ITransaction[]>('/transactions')
	const totalIncome = await instance.get<number>('/transactions/income/find')
	const totalExpense = await instance.get<number>('/transactions/expense/find')

	return {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data
	}
}

export const transactionsAction: ActionFunction = async ({
	request
}: {
	request: Request
}) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: Number(formData.get('amount')),
				category: formData.get('category'),
				type: formData.get('type')
			}

			await instance.post('/transactions', newTransaction)

			toast.success('Transaction added')
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = formData.get('id')
			await instance.delete(`/transactions/transaction/${transactionId}`)

			toast.success('Transaction deleted')
			return null
		}
	}
}

const Transactions: FC = () => {
	const { totalIncome, totalExpense } =
		useLoaderData() as IResponseTransactionLoader

	return (
		<>
			<div className='mt-4 grid grid-cols-3 items-start gap-4'>
				<div className='col-span-2 grid'>
					<TransactionForm />
				</div>

				<div className='rounded-md bg-slate-800 p-3'>
					<div className='grid grid-cols-2 gap-3'>
						<div>
							<p className='text-md mb-2 font-bold uppercase'>Total Income:</p>
							<p className='rounded-sm bg-green-600 p-1 text-center'>
								{formatToUSD(totalIncome)}
							</p>
						</div>
						<div>
							<p className='text-md mb-2 font-bold uppercase'>Total Expense:</p>
							<p className='rounded-sm bg-red-500 p-1 text-center'>
								{formatToUSD(totalExpense)}
							</p>
						</div>
					</div>
					<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
				</div>
			</div>

			<TransactionTable limit={5} />
		</>
	)
}

export default Transactions
