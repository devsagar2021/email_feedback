import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedAppHooks';
import { fetchSurveys } from '../../actions/surveys';

const SurveyList = () => {
  const dispatch = useAppDispatch();
  const { loading, surveyList } = useAppSelector((state) => state.surveys);

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  return (
    <>
      {loading && <li>Loading...</li>}
      {!loading && (
        surveyList.reverse().map((survey: any) => (
          <div className="card blue-grey darken-1" key={survey._id}>
            <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a href="#">Yes: {survey.yes}</a>
              <a href="#">No: {survey.no}</a>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default SurveyList;
