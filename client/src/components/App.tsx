import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

import 'materialize-css/dist/css/materialize.min.css'
import { fetchUser } from '../actions';
import { useAppDispatch } from '../hooks/useTypedAppHooks';
import AddCredits from './AddCredits';
import Success from './Success';
import Failure from './Failure';
import SurveyNew from './SurveyNew';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/surveys" element={<Dashboard />} />
          <Route path="/add-credits" element={<AddCredits />} />
          <Route path="/surveys/new" element={<SurveyNew />} />
          <Route path="/payment/success" element={<Success />}/>
          <Route path="/payment/failure" element={<Failure />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
