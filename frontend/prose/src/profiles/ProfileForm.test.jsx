import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfileForm from './ProfileForm';
import ProseApi from '../API/api';

vi.mock('../API/api');

const mockUserData = {
  username: 'testuser',
  email: 'testuser@example.com',
};

describe('ProfileForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<ProfileForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component and fetches user data', async () => {
    ProseApi.getCurrentUser.mockResolvedValue(mockUserData);

    render(
      <MemoryRouter initialEntries={['/profile/testuser']}>
        <Routes>
          <Route path="/profile/:username" element={<ProfileForm />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText(/Update Email:/i)).toHaveValue(mockUserData.email);
    });

    expect(screen.getByLabelText(/New Password:/i)).toBeInTheDocument();
  });

  it('submits the form with updated email and password', async () => {
    ProseApi.getCurrentUser.mockResolvedValue(mockUserData);
    ProseApi.updateUser.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/profile/testuser']}>
        <Routes>
          <Route path="/profile/:username" element={<ProfileForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Update Email:/i)).toHaveValue(mockUserData.email);
    });

    fireEvent.change(screen.getByLabelText(/Update Email:/i), { target: { value: 'newemail@example.com' } });
    fireEvent.change(screen.getByLabelText(/New Password:/i), { target: { value: 'newpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    await waitFor(() => {
      expect(ProseApi.updateUser).toHaveBeenCalledWith('testuser', {
        email: 'newemail@example.com',
        password: 'newpassword',
      });
    });

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });

  it('submits the form with updated email only', async () => {
    ProseApi.getCurrentUser.mockResolvedValue(mockUserData);
    ProseApi.updateUser.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/profile/testuser']}>
        <Routes>
          <Route path="/profile/:username" element={<ProfileForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Update Email:/i)).toHaveValue(mockUserData.email);
    });

    fireEvent.change(screen.getByLabelText(/Update Email:/i), { target: { value: 'newemail@example.com' } });
    fireEvent.change(screen.getByLabelText(/New Password:/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    await waitFor(() => {
      expect(ProseApi.updateUser).toHaveBeenCalledWith('testuser', {
        email: 'newemail@example.com',
      });
    });

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });

  it('navigates to the home page after successful update', async () => {
    ProseApi.getCurrentUser.mockResolvedValue(mockUserData);
    ProseApi.updateUser.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/profile/testuser']}>
        <Routes>
          <Route path="/profile/:username" element={<ProfileForm />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Update Email:/i)).toHaveValue(mockUserData.email);
    });

    fireEvent.change(screen.getByLabelText(/Update Email:/i), { target: { value: 'newemail@example.com' } });
    fireEvent.change(screen.getByLabelText(/New Password:/i), { target: { value: 'newpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    });
  });
});
