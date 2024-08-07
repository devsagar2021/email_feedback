import axios from 'axios'
import { ERROR, FETCH_SURVEYS, LOADING } from '../reducers/surveys'
import { AppThunk } from '../store'

export const fetchSurveys = (): AppThunk => async (dispatch) => {
	dispatch({ type: LOADING })
	try {
		const res = await axios.get('/api/surveys')
		dispatch({ type: FETCH_SURVEYS, payload: res.data })
	} catch(error) {
		dispatch({ type: ERROR, payload: error})
		throw error
	}
}
