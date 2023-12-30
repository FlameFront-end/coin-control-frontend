import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import { Form, useLoaderData } from 'react-router-dom'

import { instance } from '../api/axios.api.ts'

import { formatToUSD } from '../helpers/currency.helper.ts'
import { formatDate } from '../helpers/date.helper.ts'
import { IResponseTransactionLoader, ITransaction } from '../types/types.ts'

interface TransactionTableProps {
	limit: number
}

const TransactionTable: FC<TransactionTableProps> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader

	const [data, setData] = useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)

	const fetchTransactions = async (page: number) => {
		const response = await instance.get(
			`/transactions/pagination?page=${page}&limit=${limit}`
		)
		setData(response.data)
		setTotalPages(Math.ceil(transactions.length / limit))
	}

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	useEffect(() => {
		fetchTransactions(currentPage)
	}, [currentPage, transactions])

	return (
		<>
			<ReactPaginate
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handlePageChange}
				className='mt-4 flex items-center justify-end gap-3'
				activeClassName='bg-blue-600 rounded-md flex items-center justify-center'
				pageLinkClassName='text-white text-xs py-1 px-2 rounded-md'
				previousClassName='text-white py-1 px-2 bg-slate-800 rounded-md text-xs'
				nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				disabledClassName='cursor-not-allowed text-white/50'
				disabledLinkClassName='cursor-not-allowed text-slate-600'
			/>
			<div className='mt-4 rounded-md bg-slate-800 px-4 py-3'>
				<table className='w-full'>
					<thead>
						<tr>
							<td className='font-bold'>№</td>
							<td className='font-bold'>Title</td>
							<td className='font-bold'>Amount</td>
							<td className='font-bold'>Category</td>
							<td className='font-bold'>Date</td>
							<td className='text-right'>Action</td>
						</tr>
					</thead>
					<tbody>
						{data.map((transaction, index) => (
							<tr key={index}>
								<td>{transaction.id + 1}</td>
								<td>{transaction.title}</td>
								<td
									className={
										transaction.type === 'income'
											? 'text-green-500'
											: 'text-red-500'
									}
								>
									{transaction.type === 'income'
										? `+ ${formatToUSD(transaction.amount)}`
										: `- ${formatToUSD(transaction.amount)}`}
								</td>
								<td>{transaction.category?.title || 'Other'}</td>
								<td>{formatDate(transaction.createdAt)}</td>
								<td>
									<Form method='delete' action='/transactions'>
										<input type='hidden' name='id' value={transaction.id} />
										<button className='btn hover:btn-red ml-auto'>
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default TransactionTable
