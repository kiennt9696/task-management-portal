import React, { useEffect, useState } from 'react';
import { fetchSummary } from '../services/api';

const Summary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const loadSummary = async () => {
      const { data } = await fetchSummary();
      setSummary(data);
    };
    loadSummary();
  }, []);

  return (
    <div>
      <h2>Employee Task Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Total Tasks</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.total_tasks}</td>
              <td>{employee.completed_tasks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
