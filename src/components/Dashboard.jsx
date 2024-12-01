import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      {role === 'Employer' ? (
        <>
          <button onClick={() => navigate('/tasks')}>View Tasks</button>
          <button onClick={() => navigate('/summary')}>View Summary</button>
          <button onClick={() => navigate('/create')}>Create Task</button>
        </>
      ) : (
        <button onClick={() => navigate('/tasks')}>View My Tasks</button>
      )}
    </div>
  );
};

export default Dashboard;
