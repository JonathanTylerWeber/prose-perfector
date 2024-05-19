import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './Login';

describe('LoginForm Component', () => {
  const mockHandleLogin = vi.fn();

  beforeEach(() => {
    mockHandleLogin.mockClear();
  });

  it('renders the login form correctly', () => {
    const { getByLabelText, getByPlaceholderText } = render(<LoginForm handleLogin={mockHandleLogin} />);

    getByLabelText(/Username:/i);
    getByPlaceholderText(/Enter username/i);
    getByLabelText(/Password:/i);
    getByPlaceholderText(/Enter password/i);
  });

  it('calls handleLogin with username and password when submitted', async () => {
    const { getByLabelText, getByText } = render(<LoginForm handleLogin={mockHandleLogin} />);

    fireEvent.change(getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/Password:/i), { target: { value: 'password123' } });

    fireEvent.submit(getByText(/Submit/i));

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledTimes(1);
      expect(mockHandleLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });
});
