import axios from 'axios'
import { ERROR, FETCH_USER, LOADING } from '../reducers/auth'
import { AppThunk } from '../store'

export const fetchUser = (): AppThunk => async (dispatch) => {
	dispatch({ type: LOADING })
	try {
		const res = await axios.get('/api/current_user')
		dispatch({ type: FETCH_USER, payload: res.data })
	} catch(error) {
		dispatch({ type: ERROR, payload: error})
		throw error
	}
}
