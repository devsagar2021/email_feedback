import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => (
  <div>
    <h4>Dashboard Component</h4>
    <SurveyList />
    <div className="fixed-action-btn">
      <Link to="/surveys/new" className="btn-floating btn-large red">
        <i className="large material-icons">assignment</i>
      </Link>
    </div>
  </div>
);


export default Dashboard;
