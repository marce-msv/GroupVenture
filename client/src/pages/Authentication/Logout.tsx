import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Services/serviceUser';
import { MDBBtn } from 'mdb-react-ui-kit';
import './Authentication.css';

import { Dispatch, SetStateAction } from 'react';

export default function Logout({
  setIsLoggedIn,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
  let navigate = useNavigate();
  const handleClick = async () => {
    await logout();
    localStorage.removeItem('uid');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div
      className='mainPage'
      style={{
        backgroundImage: 'url(/pexels.jpeg)',
      }}
    >
      <div className='textDiv'>
        <h3>
          Are you sure you want to log out? You won't be able to add an
          activities anymore
        </h3>
        <div className='btns'>
          <MDBBtn
            className='mx-2'
            color='info'
            onClick={() => navigate('/')}
          >
            No
          </MDBBtn>
          <Link to='/'>
            <MDBBtn
              className='mx-2'
              color='danger'
              onClick={() => handleClick()}
            >
              Yes
            </MDBBtn>
          </Link>
        </div>
      </div>
    </div>
  );
}
