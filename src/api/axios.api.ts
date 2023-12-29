import axios from 'axios'

import { getTokenFromLocalStorage } from '../helpers/localstorage.helper.ts'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_API_URL,
	headers: {
		Authorization: `Bearer ${getTokenFromLocalStorage()}`
	}
})
