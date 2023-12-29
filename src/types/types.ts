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
