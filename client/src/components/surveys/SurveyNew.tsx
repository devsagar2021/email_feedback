import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyForm } from '../../types';
import axios from '../../config/appAxios';
import { useAppDispatch } from '../../hooks/useTypedAppHooks';
import addCredits from '../../actions/addCredits';
import SurveyDetails from './SurveyDetails';
import SurveyDetailsVerify from './SurveyDetailsVerify';

const SurveyNew: FC = () => {
  const dispatch = useAppDispatch();
  const [surveyFormData, setSurveyFormData] = React.useState<SurveyForm>();
  const navigate = useNavigate();

  const processFormData = async (data: SurveyForm) => {
    setSurveyFormData(data);
  };

  const sendSurvey = async () => {
    const res = await axios.post('/api/surveys', surveyFormData)
    dispatch(addCredits(res.data.credits));
    navigate('/surveys')
  }

  return (
    !surveyFormData 
      ? <SurveyDetails processFormData={processFormData} />
      : <SurveyDetailsVerify {...{ surveyFormData, sendSurvey, setSurveyFormData }} />
  )
}

export default SurveyNew;
