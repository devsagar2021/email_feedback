import axios from 'axios'
import React from 'react'
import { useAppSelector } from '../hooks/useTypedAppHooks'

const AddCredits: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user)
  const [ pData, setPData ] = React.useState<any | null>(null)
  const [ formData, setFormData ] = React.useState<any | null>({})

  const processPayment = async (event: any) => {
    event.preventDefault()
    const formDataSubmitted = {
      firstName: event.target.name.value,
      email: event.target.email.value,
      amt: event.target.amt.value,
      phone: event.target.phone.value,
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

  const serverHost = import.meta.env.VITE_SERVER_HOST
  
  return (
    <div>
      <h5>Add Credits</h5>
      <p>₹1 is equal to one credit.</p>
      {!pData &&
        <form
          onSubmit={processPayment}
          className='row'
          style={{ minWidth: '250px', maxWidth: '50%'}}
        >
          <input type='text' disabled required defaultValue={user?.displayName?.split(' ')[0]} placeholder='Name' id='name' name='name' className='validate input-field col s12'/>
          <input type='text' required defaultValue={user?.email} placeholder='Email' id='email' name='email' className='validate input-field col s12'/>
          <input type='text' required defaultValue={9999999999} placeholder='Phone number' id='phone' name='phone' className='validate input-field col s12'/>
          <input type='text' required placeholder='₹ Enter amount' id='amt' name='amt' className='validate input-field col s12'/>
          <button type='submit' style={{marginTop: '45px'}} className="waves-effect waves-light btn col s12">
            Next
          </button>
        </form>
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
