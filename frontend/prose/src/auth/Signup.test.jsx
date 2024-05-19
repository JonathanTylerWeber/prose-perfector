import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './Signup';

describe('SignupForm Component', () => {
  const mockHandleSignup = vi.fn();

  beforeEach(() => {
    mockHandleSignup.mockClear();
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<SignupForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the signup form correctly', () => {
    const { getByLabelText, getByPlaceholderText } = render(<SignupForm handleSignup={mockHandleSignup} />);

    getByLabelText(/Username:/i);
    getByPlaceholderText(/Enter username/i);
    getByLabelText(/Email:/i);
    getByPlaceholderText(/Enter email/i);
    getByLabelText(/Password:/i);
    getByPlaceholderText(/Enter password/i);
  });

  it('calls handleSignup with form data when submitted', async () => {
    const { getByLabelText, getByText } = render(<SignupForm handleSignup={mockHandleSignup} />);

    fireEvent.change(getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password:/i), { target: { value: 'password123' } });

    fireEvent.submit(getByText(/Submit/i));

    await waitFor(() => {
      expect(mockHandleSignup).toHaveBeenCalledTimes(1);
      expect(mockHandleSignup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

});
