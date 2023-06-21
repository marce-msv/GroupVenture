import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddActivityPage from './AddActivityPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  google: () => jest.fn()
}));

jest.mock('../../Services/serviceUser', () => ({
    postActivity: () => ({ success: true, data: 202, message: 'OK' }),
}));


// import createGoogleMapsMock from 'jest-google-maps-mock';

// describe('createGoogleMapsMock', () => {
//   let googleMaps;

//   beforeEach(() => {
//     googleMaps = createGoogleMapsMock();
//   });

//   it('should create a map mock', () => {
//     const mapDiv = document.createElement('div');
//     new googleMaps.Map(mapDiv);

//     expect(googleMaps.Map).toHaveBeenCalledTimes(1);
//     expect(googleMaps.Map.mock.instances.length).toBe(1);
//     expect(googleMaps.Map).toHaveBeenLastCalledWith(mapDiv);
//   });
// });

describe('AddActivityPage Page', () => {
  //
  it('Has input fields and signup button', () => {
    //
    // render(<AddActivityPage />);
    //
    // const titleInput = screen.getByLabelText(/Title/);
    //date
    //addresss
    //activity type
    // const spotsInput = screen.getByLabelText(/How many people can join you?/);
    // const telegramInput = screen.getByLabelText(/Please, provide an telegram link on chat for communication/);
    // const aboutInput = screen.getByLabelText(/Tell us something about this activity/);
    //
    // expect(titleInput).toBeInTheDocument();

    // expect(spotsInput).toBeInTheDocument();
    // expect(telegramInput).toBeInTheDocument();
    // expect(aboutInput).toBeInTheDocument();
  });

});
