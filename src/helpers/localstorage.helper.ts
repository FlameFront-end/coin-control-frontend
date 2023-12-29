export const getTokenFromLocalStorage = (): string => {
	const data = localStorage.getItem('token')
	return data ? JSON.parse(data) : ''
}

export const setTokenToLocalStorage = (key: string, token: string): void => {
	localStorage.setItem(key, JSON.stringify(token))
}

export const removeTokenFromLocalStorage = (key: string): void => {
	localStorage.removeItem(key)
}
