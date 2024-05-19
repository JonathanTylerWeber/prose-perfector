import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it("matches snapshot", function () {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders title correctly', () => {
    render(<Home />);
    const titleElement = screen.getByText(/Perfect your prose/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders description text correctly when user is logged in', () => {
    const currentUser = { username: 'TestUser' };
    render(<Home currentUser={currentUser} />);
    const welcomeText = screen.getByText(/Welcome back, TestUser!/i);
    expect(welcomeText).toBeInTheDocument();
  });

  test('renders description text correctly when user is not logged in', () => {
    render(<Home />);
    const descriptionText = screen.getByText(/Input your writing and the mood you want to convey/i);
    expect(descriptionText).toBeInTheDocument();
  });
});
