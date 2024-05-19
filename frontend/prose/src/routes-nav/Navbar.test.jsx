import NavbarComp from './Navbar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('NavbarComp', () => {
  it('renders without crashing', async () => {
    render(<NavbarComp />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<NavbarComp />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders brand title', async () => {
    render(<NavbarComp />);
    const title = await screen.findByText('Prose Perfector');
    expect(title).toBeVisible();
  });

  it('renders navigation links for logged-in user', async () => {
    const currentUser = { username: 'testuser' };
    render(<NavbarComp currentUser={currentUser} />);
    const newPrompt = await screen.findByText('New Prompt')
    expect(newPrompt).toBeVisible();
    const history = await screen.findByText('History')
    expect(history).toBeVisible();
    const profile = await screen.findByText('Profile')
    expect(profile).toBeVisible();
    const logOut = await screen.findByText('Log out')
    expect(logOut).toBeVisible();
  });

  it('renders navigation links when not logged in', async () => {
    render(<NavbarComp />);
    const login = await screen.findByText('Login')
    expect(login).toBeVisible();
    const signup = await screen.findByText('Sign Up')
    expect(signup).toBeVisible();
  });

  it('calls handleLogout when logout button is clicked', async () => {
    const handleLogoutMock = vi.fn().mockImplementation(() => {
      console.log('Mock implementation of handleLogout called');
    });
    const currentUser = { username: 'testuser' };
    render(<NavbarComp currentUser={currentUser} handleLogout={handleLogoutMock} />);

    const logoutButton = await screen.findByText('Log out');
    await userEvent.click(logoutButton);

    expect(handleLogoutMock).toHaveBeenCalledTimes(1);
  });
});
