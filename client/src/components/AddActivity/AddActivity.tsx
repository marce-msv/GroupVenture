import { Link, useNavigate } from 'react-router-dom';
import { useUID } from '../../customHooks';
import { MDBBtn } from 'mdb-react-ui-kit';
import './AddActivity.css';

export default function AddActivity() {
  const navigate = useNavigate();
  const uid = useUID();

  return (
    <div>
      {uid ? (
        <MDBBtn color="info" onClick={() => navigate('/addactivity')}>
          Add an activity
        </MDBBtn>
      ) : (
        <p className="testBlock" style={{ fontWeight: 'bold', fontSize: '20px' }}>
          To access detailed information about activities, please log in to your account.{' '}
          <Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link> to get started.
        </p>
      )}
    </div>
  );
}
