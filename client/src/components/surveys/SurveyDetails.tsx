import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import Input from '../formComponents/Input';
import { SurveyForm } from '../../types';

interface SurveyDetailsProps {
  processFormData: (data: SurveyForm) => void;
}
const SurveyDetails: FC<SurveyDetailsProps> = ({ processFormData }) => {
  const navigate = useNavigate();
  const defaultValues: SurveyForm = {
    title: '',
    subject: '',
    body: '',
    recipients: ''
  };
  const methods = useForm<SurveyForm>({ defaultValues });
  const { handleSubmit } = methods;

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
    };
  
  return (
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
}

export default SurveyDetails;
