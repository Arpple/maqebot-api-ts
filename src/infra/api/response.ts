export const error = (err: Error) => ({
	error: err.name,
	message: err.message,
})
