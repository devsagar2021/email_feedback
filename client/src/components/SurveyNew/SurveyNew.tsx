import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SurveyForm } from '../../types';
import Input from '../formComponents/Input';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/useTypedAppHooks';
import addCredits from '../../actions/addCredits';

const SurveyNew = () => {
  const dispatch = useAppDispatch();
  const [surveyFormData, setSurveyFormData] = React.useState<SurveyForm>();
  const navigate = useNavigate();
  const defaultValues: SurveyForm = {
    title: '',
    subject: '',
    body: '',
    recipients: ''
  };
  const methods = useForm<SurveyForm>({ defaultValues });
  const { handleSubmit } = methods;

  const processFormData = async (data: SurveyForm) => {
    console.log(data);
    setSurveyFormData(data);
  };

  const sendSurvey = async () => {
    const res = await axios.post('/api/surveys', surveyFormData)
    dispatch(addCredits(res.data.credits));
    navigate('/surveys')
  }

  return (
    <>
    {!surveyFormData 
      ? (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(processFormData)}>
              <Input name='title' placeholder='Title' rules={{ required: true }} />
              <Input name='subject' placeholder='Subject' rules={{ required: true }} />
              <Input name='body' placeholder='Body' rules={{ required: true }} />
              <Input name='recipients' placeholder='Recipients' rules={{ required: true }} />
              <button className='btn' onClick={() => navigate('/surveys')}>Cancel</button>
              <button type="submit" className='btn'>Next</button>
            </form>
          </FormProvider>
        )
      : (
          <div>
            <h5>Please verify your entries</h5>
            {Object.entries(surveyFormData).map(([key, value]) => (
              <div key={key}>{key}: {value}</div>
            ))}
            <button type="submit" className='btn' onClick={() => setSurveyFormData(undefined)}>Back</button>
            <button type="submit" className='btn' onClick={sendSurvey}>Send Survey</button>
          </div>
        )
    }
    </>
  )
}

export default SurveyNew;
