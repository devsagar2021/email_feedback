import axios from '../config/appAxios'
import React from 'react'
import { useAppSelector } from '../hooks/useTypedAppHooks'
import { FormProvider, useForm } from 'react-hook-form'
import Input from './formComponents/Input'
import { PaymentForm } from '../types'

const AddCredits: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user)
  const [ pData, setPData ] = React.useState<any | null>(null)
  const [ formData, setFormData ] = React.useState<any | null>({})

  const processDetails = async (data: PaymentForm) => {
    const formDataSubmitted = {
      firstName: data.name,
      email: data.email,
      amt: data.amt,
      phone: data.phone,
      productInfo: 'Test Product'
    }
    try {
      const res = await axios.post(
        '/api/payment/token',
        formDataSubmitted,
        { headers: {
            'Content-Type': 'application/json'
        }}
      );
      if (res.status === 200 && res.data) {
        setFormData(formDataSubmitted)
        setPData(res.data)
      } else {
        console.error('failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const defaultValues: PaymentForm = {
    name: user?.displayName?.split(' ')[0] ?? '',
    email: user?.email ?? '',
    phone: '9999999999',
    amt: ''
  };
  const methods = useForm<PaymentForm>({ defaultValues });
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

  const validateAmt = (amt: number) => {
    if (amt < 1) {
      return 'Amount should be 1 or more.'
    }
    return
  }

  const serverHost = import.meta.env.VITE_SERVER_HOST
  
  return (
    <div>
      <h5>Add Credits</h5>
      <p>₹1 is equal to one credit.</p>
      {!pData &&
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(processDetails)}
          className='row'
          style={{ minWidth: '250px', maxWidth: '50%'}}
        >
          <Input disabled name='name' rules={{ required: true }} className='input-field col s12'/>
          <Input name='email' placeholder='Email' rules={{ required: true, validate: validateEmails }} className='input-field col s12'/>
          <Input name='phone' placeholder='Phone number' rules={{ required: true }} className='input-field col s12'/>
          <Input type='number' name='amt' placeholder='₹ Enter amount' rules={{ required: true, validate: validateAmt }} className='input-field col s12'/>
          <div style={{ marginTop: '20px' }}>
            <button type="submit" className='waves-effect waves-light btn col s12'>Next</button>
          </div>
        </form>
      </FormProvider>
        // <form
        //   onSubmit={processDetails}
        //   className='row'
        //   style={{ minWidth: '250px', maxWidth: '50%'}}
        // >
        //   <input type='text' disabled required defaultValue={user?.displayName?.split(' ')[0]} placeholder='Name' id='name' name='name' className='validate input-field col s12'/>
        //   <input type='text' required defaultValue={user?.email} placeholder='Email' id='email' name='email' className='validate input-field col s12'/>
        //   <input type='text' required defaultValue={9999999999} placeholder='Phone number' id='phone' name='phone' className='validate input-field col s12'/>
        //   <input type='text' required placeholder='₹ Enter amount' id='amt' name='amt' className='validate input-field col s12'/>
        //   <button type='submit' style={{marginTop: '45px'}} className="waves-effect waves-light btn col s12">
        //     Next
        //   </button>
        // </form>
      }
      {pData &&
        <div className='row'>
          <h5 className='col s12'>Amount to be Paid: ₹{formData.amt}</h5>

          <form className='col s12' action='https://test.payu.in/_payment' method='post'>
            <input type="hidden" name="key" value={pData.key} />
            <input type="hidden" name="txnid" value={pData.txnId || ''} />
            <input type="hidden" name="productinfo" value={formData.productInfo} />
            <input type="hidden" name="amount" value={formData.amt} />
            <input type="hidden" name="firstname" value={formData.firstName}/>
            <input type="hidden" name="email" value={formData.email} />
            <input type="hidden" name="surl" value={`${serverHost}/api/payment/success`} />
            <input type="hidden" name="furl" value={`${serverHost}/api/payment/failure`} />
            <input type="hidden" name="phone" value={formData.phone} />
            <input type="hidden" name="hash" value={pData.hash || ''} />
            <button className='red lighten-1 btn-flat white-text' onClick={() => setPData(null)}>Cancel</button>
            <button type="submit" style={{marginTop: '45px'}} className="waves-effect waves-light btn col s12">
              Continue to Payment
            </button>
          </form>
        </div>
      }
    </div>
  )
}

export default AddCredits
