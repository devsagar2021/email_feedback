import React from 'react';

import Header from './Header';
import RenderRoutes from './RenderRoutes';
import useAxiosInterceptor from '../hooks/useAxiosInterceptors';

import 'materialize-css/dist/css/materialize.min.css'

const App: React.FC = () => {
  useAxiosInterceptor();
  return (
    <div>
      <Header />
      <div className="container">
        <RenderRoutes />
      </div>
    </div>
  );
}

export default App;
