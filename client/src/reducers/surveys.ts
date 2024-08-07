import { UnknownAction } from 'redux'

export const FETCH_SURVEYS = 'surveys/FETCH_SURVEYS'
export const LOADING = 'surveys/LOADING'
export const ERROR = 'surveys/ERROR'

type Surveys = {
  _id: string,
  body: string,
  dateSent: string,
  title: string,
  yes: number,
  no: number
}

type SurveysState = {
  loading: boolean,
  surveyList: Surveys[],
  error: string | unknown
}

const initialState: SurveysState = {
  loading: false,
  surveyList: [],
  error: null
}

const surveys = (state = initialState, action: UnknownAction) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case FETCH_SURVEYS:
      return {...state, surveyList: action.payload as Surveys[] || null, loading: false}
    case ERROR:
      return {...state, error: action.payload, loading: false}
    default:
      return state;
  }
};

export default surveys;
