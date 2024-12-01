import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const startDate = '2020-10-10 00:00:00';
      const endDate = '2024-12-12 00:00:00';
      const { tasks } = await fetchTasks(startDate, endDate);
      console.log(tasks);
      setTasks(tasks);
    };
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Assignee</th>
            {/*<th>Status</th>*/}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.assignee}</td>
              {/*<td>{task.status}</td>*/}
              <td>
                <button onClick={() => alert('Implement status update')}>
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
