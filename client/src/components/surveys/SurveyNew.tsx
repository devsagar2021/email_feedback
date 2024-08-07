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
    setSurveyFormData(data);
  };

  const sendSurvey = async () => {
    const res = await axios.post('/api/surveys', surveyFormData)
    dispatch(addCredits(res.data.credits));
    navigate('/surveys')
  }

  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateEmails = (emails: string) => {
    const invalidEmails = emails
      .split(',')
      .map(email => email.trim())
      .filter(email => !emailRegex.test(email));

    if (invalidEmails.length) {
      return `These emails are invalid: ${invalidEmails.join(', ')}`;
    }
    return
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
              <Input name='recipients' placeholder='Recipients' rules={{ required: true, validate: validateEmails }} />
              <div style={{ marginTop: '20px' }}>
                <button className='red lighten-1 btn-flat white-text' onClick={() => navigate('/surveys')}>Cancel</button>
                <button type="submit" className='btn right'>Next</button>
              </div>
            </form>
          </FormProvider>
        )
      : (
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
    </>
  )
}

export default SurveyNew;
