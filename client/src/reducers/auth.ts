import { UnknownAction } from 'redux'

export const FETCH_USER = 'auth/FETCH_USER'
export const LOADING = 'auth/LOADING'
export const ERROR = 'auth/ERROR'
export const ADD_CREDITS = 'user/ADD_CREDITS'
export const LOGOUT = 'auth/LOGOUT'

type User = {
  _id: string,
  googleId: string,
  displayName: string,
  displayPicURL: string,
  email: string,
  credits: number
}

type AuthState = {
  loading: boolean,
  user: User | null,
  error: string | unknown,
  authenticated: boolean,
  time: number
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  authenticated: false,
  time: 0
}

const authReducer = (state = initialState, action: UnknownAction) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case FETCH_USER:
      return {...state, user: action.payload as User || null, loading: false, authenticated: true, time: 5 * 60}
    case ADD_CREDITS:
      return {
        ...state,
        user: {...state.user, credits: action.payload as number },
        loading: false
      }
    case LOGOUT:
      return {...state, user: null, loading: false, authenticated: false}
    case ERROR:
      return {...state, error: action.payload, loading: false}
    default:
      return state;
  }
};

export default authReducer;
