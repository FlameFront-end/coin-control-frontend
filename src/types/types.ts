export interface IUser {
	id: number
	email: string
	token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponseUser extends IUserData {
	id: number
	createdAt: string
	updatedAt: string
	message: string
}

export interface IResponseUserData {
	token: string
	user: IResponseUser
}

export interface ICategory {
	title: string
	id: number
	createdAt: string
	updatedAt: string
	transaction?: []
}

export interface ITransaction {
	id: number
	title: string
	type: string
	amount: number
	createdAt: string
	updatedAt: string
	category: ICategory
}

export interface IResponseTransactionLoader {
	categories: ICategory[]
	transactions: ITransaction[]
	totalIncome: number
	totalExpense: number
}
