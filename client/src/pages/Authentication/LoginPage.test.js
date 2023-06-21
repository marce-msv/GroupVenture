import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../Services/serviceUser', () => ({
  login: () => ({}),
}));

describe('Login Page', () => {
  it('Has email/password fields and submit button', () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email address/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByText(/Login/);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Allows user to submit with its credentials', async () => {
    const setIsLoggedIn = jest.fn();
    render(<LoginPage setIsLoggedIn={setIsLoggedIn} />);

    const emailInput = screen.getByLabelText(/Email address/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByText(/Login/);

    act(() => {
      userEvent.type(emailInput, 'a@a');
      userEvent.type(passwordInput, 'a');
    });

    await waitFor(() => {
      expect(emailInput).toHaveValue('a@a');
      expect(passwordInput).toHaveValue('a');
    });

    act(() => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });
  });
});
