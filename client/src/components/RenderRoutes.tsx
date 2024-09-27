import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddCredits from './AddCredits';
import SurveyNew from './surveys/SurveyNew';
import Success from './Success';
import Failure from './Failure';
import Landing from './Landing';
import { useAppSelector } from '../hooks/useTypedAppHooks';

const protectedRoutes = [
  { path: '/surveys', element: <Dashboard /> },
  { path: '/add-credits', element: <AddCredits /> },
  { path: '/surveys/new', element: <SurveyNew /> },
  { path: '/payment/success', element: <Success /> },
  { path: '/payment/failure', element: <Failure /> }
]

const publicRoutes = [
  { path: '/', element: <Landing /> },
  { path: '*', element: <Navigate to='/' /> },
]

const RenderRoutes = () => {
  const { authenticated } = useAppSelector(state => state.auth);

  const routes = useRoutes([...publicRoutes, ...(authenticated ? protectedRoutes : [])]);
  return <>{routes}</>
}

export default RenderRoutes;
