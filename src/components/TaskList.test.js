import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import TaskList from '../components/TaskList';

describe('TaskList Component', () => {
  const mock = new MockAdapter(axios);

  const tasks = [
    {
      id: '1',
      title: 'Task 1',
      assignee: 'user1',
      description: 'Description 1',
      created_at: '2024-01-01',
    },
    {
      id: '2',
      title: 'Task 2',
      assignee: 'user2',
      description: 'Description 2',
      created_at: '2024-01-02',
    },
  ];

  beforeEach(() => {
    mock.reset();
  });

  it('should display loading initially', () => {
    render(<TaskList />);
    expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();
  });

  it('should display tasks on successful API call', async () => {
    mock.onPost('http://127.0.0.1:5002/v1/task/own').reply(200, { tasks });

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  it('should display error message on API failure', async () => {
    mock.onPost('http://127.0.0.1:5002/v1/task/own').reply(500);

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch tasks/i)).toBeInTheDocument();
    });
  });
});
