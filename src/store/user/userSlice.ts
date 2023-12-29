import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../../types/types.ts'

interface IUserState {
	user: IUser | null
	isAuth: boolean
}

const initialState: IUserState = {
	user: null,
	isAuth: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: state => {
			state.user = null
			state.isAuth = false
		},
		checkAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload
		}
	}
})

export const { login, logout, checkAuth } = userSlice.actions
export default userSlice.reducer
