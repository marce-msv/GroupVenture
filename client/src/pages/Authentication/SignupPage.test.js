import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupPage from './SignupPage';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../Services/serviceUser', () => ({
  postUser: () => ({ success: true, data: {}, message: 'User created' }),
}));

describe('SignUp Page', () => {
  //
  it('Has input fields and signup button', () => {
    //
    render(<SignupPage />);
    //
    const fitstNameInput = screen.getByLabelText(/First name/);
    const lastNameInput = screen.getByLabelText(/Last Name/);
    const ageInput = screen.getByLabelText(/Age/);
    const emailInput = screen.getByLabelText(/Email address/);
    const passwordInput = screen.getByLabelText(/Password/);
    const infoInput = screen.getByLabelText(/Info about you/);
    const submitButton = screen.getByTestId('sign-up-btn');
    //
    expect(fitstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(infoInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Allows user to create an account', async () => {
    //
    const setIsLoggedIn = jest.fn();
    render(<SignupPage setIsLoggedIn={setIsLoggedIn} />);
    //
    // const imageInput = screen.getByTestId('upload-pic');
    const firstNameInput = screen.getByLabelText(/First name/);
    const lastNameInput = screen.getByLabelText(/Last Name/);
    const ageInput = screen.getByLabelText(/Age/);
    const emailInput = screen.getByLabelText(/Email address/);
    const passwordInput = screen.getByLabelText(/Password/);
    const infoInput = screen.getByLabelText(/Info about you/);
    const submitButton = screen.getByTestId('sign-up-btn');
    //
    act(() => {
      // userEvent.upload(imageInput, 'url...')
      userEvent.type(firstNameInput, 'Testing');
      userEvent.type(lastNameInput, 'FE');
      userEvent.type(ageInput, '5');
      userEvent.type(emailInput, 'h@h');
      userEvent.type(passwordInput, 'h');
      userEvent.type(infoInput, 'h0h0h0h0h0h0h0h0h0');
    });
    //
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('Testing');
      expect(lastNameInput).toHaveValue('FE');
      expect(ageInput).toHaveValue(5);
      expect(emailInput).toHaveValue('h@h');
      expect(passwordInput).toHaveValue('h');
      expect(infoInput).toHaveValue('h0h0h0h0h0h0h0h0h0');
    });
    //
    act(() => {
      userEvent.click(submitButton);
    });

    //
    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });
  });
});
