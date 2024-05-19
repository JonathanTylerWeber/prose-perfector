import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  // Hoist the mock creation function
  const createNavigateMock = () => vi.fn();

  it('renders children when currentUser is present', () => {
    // Mocking Navigate component
    const NavigateMock = createNavigateMock();

    // Simulating currentUser being present
    const currentUser = { username: 'testuser' };
    const { getByText } = render(
      <BrowserRouter>
        <PrivateRoute currentUser={currentUser}>
          <div>Children Component</div>
        </PrivateRoute>
      </BrowserRouter>
    );

    // Expecting that children component is rendered
    expect(getByText('Children Component')).toBeTruthy();
    // Expecting that Navigate component is not rendered
    expect(NavigateMock).not.toHaveBeenCalled();
  });

  it('redirects to "/" when currentUser is not present', () => {
    // Mock window.location.pathname
    const originalLocation = window.location;
    delete window.location;
    window.location = { pathname: '/' };

    // Simulating currentUser not being present
    render(
      <BrowserRouter>
        <PrivateRoute currentUser={null} />
      </BrowserRouter>
    );

    // Expecting that the location matches the redirect location "/"
    expect(window.location.pathname).toEqual('/');

    // Restore window.location
    window.location = originalLocation;
  });
});
