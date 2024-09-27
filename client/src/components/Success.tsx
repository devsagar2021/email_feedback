import axios from '../config/appAxios'
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useTypedAppHooks';
import addCredits from '../actions/addCredits';

const Success = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isTxnId, setIsTxnId] = React.useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.post('/api/add-credits', { txnid: params.get('txnid') });
        dispatch(addCredits(res.data.credits));
        setTimeout(() => navigate('/surveys'), 1000);
      } catch (error) {
        console.error(error);
        setTimeout(() => navigate('/add-credits'), 1000);
      }
    }
    if (params.get('txnid')) {
      fetchCredits();
    } else {
      setIsTxnId(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Payment Successful!</h1>
      {isTxnId
        ? <h4>Adding credits.....</h4>
        : <h4 className='red-text'>
            Unable to verify, invalid Transaction ID
          </h4>
      }
    </div>
  );
}

export default Success;
