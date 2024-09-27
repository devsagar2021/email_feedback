import React, { FC } from 'react';
import { SurveyForm } from '../../types';

interface SurveyDetailsVerifyProps {
  surveyFormData: SurveyForm;
  sendSurvey: VoidFunction;
  setSurveyFormData: (data: SurveyForm | undefined) => void;
}
const SurveyDetailsVerify: FC<SurveyDetailsVerifyProps> = ({ surveyFormData, sendSurvey, setSurveyFormData }) => {
  return (
    <div>
      <h5>Please verify email details</h5>
      {Object.entries(surveyFormData).map(([key, value]) => (
        <div key={key} style={{ marginTop: '10px' }}>
          <div><b>{key}:</b></div>
          <div>{value}</div>
        </div>
      ))}
      <div style={{ marginTop: '20px', width: '100%' }}>
        <button className='amber darken-3 btn-flat white-text' onClick={() => setSurveyFormData(undefined)}>Back</button>
        <button className='btn right' onClick={sendSurvey}>Send Survey</button>
      </div>
    </div>
  )
}

export default SurveyDetailsVerify;
