import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../components/Login';
import { MemoryRouter } from 'react-router-dom';

describe('Login Component', () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
  });

  it('should render the login form', () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should display error on failed login', async () => {
    mock
      .onPost('http://127.0.0.1:5000/v1/login')
      .reply(401, { message: 'Unauthorized' });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'invalid_user' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrong_password' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() =>
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument()
    );
  });

  it('should redirect on successful login', async () => {
    const token = 'mocked_session_token';
    mock
      .onPost('http://127.0.0.1:5000/v1/login')
      .reply(200, { session_token: token });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'valid_user' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'correct_password' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(sessionStorage.getItem('token')).toBe(token);
    });
  });
});
