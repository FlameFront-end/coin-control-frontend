import { FC, useState } from 'react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { ActionFunction, Form, useLoaderData } from 'react-router-dom'

import { instance } from '../api/axios.api.ts'

import { CategoryModal } from '../components'
import { ICategory } from '../types/types.ts'

export const categoriesAction: ActionFunction = async ({ request }) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const title = {
				title: formData.get('title')
			}
			await instance.post('/categories', title)
			return null
		}
		case 'PATCH': {
			const formData = await request.formData()
			const category = {
				id: formData.get('id'),
				title: formData.get('title')
			}
			await instance.patch(`/categories/category/${category.id}`, category)
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const categoryID = formData.get('id')
			await instance.delete(`/categories/category/${categoryID}`)
			return null
		}
	}
}

export const categoriesLoader = async () => {
	const { data } = await instance.get<ICategory[]>('/categories')
	return data
}

const Categories: FC = () => {
	const categories = useLoaderData() as ICategory[]

	const [visibleModal, setVisibleModal] = useState(false)
	const [categoryId, setCategoryId] = useState(0)
	const [isEdit, setIsEdit] = useState(false)

	return (
		<>
			<div className='mt-10 rounded-md bg-slate-800 p-4'>
				<h1>Your category list</h1>
				<div className='mt-2 flex flex-wrap items-center gap-2'>
					{categories.map((category, index) => (
						<div
							key={index}
							className='group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2'
						>
							{category.title}
							<div className='absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex'>
								<button
									onClick={() => {
										setCategoryId(category.id)
										setVisibleModal(true)
										setIsEdit(true)
									}}
								>
									<AiFillEdit />
								</button>
								<Form className='flex' method='delete' action='/categories'>
									<input type='hidden' name='id' value={category.id} />
									<button
										type='submit'
										onClick={() => {
											setVisibleModal(false)
											setIsEdit(false)
										}}
									>
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>

				<button
					className='mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
					onClick={() => {
						setVisibleModal(true)
					}}
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>

			{visibleModal && (
				<CategoryModal type='post' setVisibleModal={setVisibleModal} />
			)}

			{visibleModal && isEdit && (
				<CategoryModal
					type='patch'
					id={categoryId}
					setVisibleModal={setVisibleModal}
				/>
			)}
		</>
	)
}

export default Categories
