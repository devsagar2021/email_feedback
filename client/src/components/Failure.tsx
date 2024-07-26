import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Failure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/add-credits'), 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className='red-text'>Payment Failed!</h1>
      <h3>Any amount deducted will credited back</h3>
      <h5>Redirecting to Add credits page...</h5>
    </div>
  );
}

export default Failure;
