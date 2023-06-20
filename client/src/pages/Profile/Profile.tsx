import CreatedActivities from '../../components/CreatedActivities/CreatedActivities';
import AddActivity from '../../components/AddActivity/AddActivity';
import EditProfile from './EditProfile';
import { useState, useEffect } from 'react';
import { getUserById } from '../../Services/serviceUser';
import { useParams } from 'react-router-dom';
import { useUID } from '../../customHooks';
import { MDBBtn } from 'mdb-react-ui-kit';
import './Profile.css';

export interface UserInterface {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  email: string;
  infoAboutUser: string;
}

export default function Profile() {
  const uid = useUID();
  const { id } = useParams();
  const [profileEdited, setProfileEdited] = useState<boolean>(false);
  const [profileUser, setProfileUser] = useState<UserInterface | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [isEditing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((user: UserInterface) => {
          if (user) setProfileUser(user);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (uid && profileUser && uid === profileUser.id && !isEditable) {
      setIsEditable(true);
    }
  }, [uid, profileUser]);

  useEffect(() => {
    if (profileEdited && typeof id === 'number') {
      getUserById(id)
        .then((user: UserInterface) => {
          if (user) {
            setProfileUser(user);
            setProfileEdited(false);
          }
          console.log(user);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [profileEdited, id]);

  const handleClose = () => {
    setEditing(false);
  };

  const RenderEditables = () => {
    if (!isEditable) {
      return null;
    }

    const handleEditClick = () => {
      setEditing((state) => !state);
    };
    return (
      <>
        <MDBBtn
          className='mx-2'
          color='secondary'
          onClick={handleEditClick}
        >
          {' '}
          Edit Profile
        </MDBBtn>
        <AddActivity />
      </>
    );
  };

  const handleProfileEdit = () => {
    setProfileEdited(true);
  };

  return (
    <div
      className='mainDivForProfile'
      style={{
        backgroundImage: 'url(/pexels.jpeg)',
      }}
    >
      <div className='profileBody'>
        <div className='profileName'>
          <strong>
            {profileUser?.firstName || ''} {profileUser?.lastName || ''}
          </strong>
        </div>
        {profileUser?.age ? `Age: ${profileUser.age}` : ''}
        <div className='profileAvatar'>
          {profileUser?.avatar && (
            <img
              src={profileUser?.avatar}
              alt='Avatar'
            />
          )}
        </div>
        <div className='infoAboutUser'>{profileUser?.infoAboutUser || ''}</div>

        <CreatedActivities />
        <div className='btns'>{RenderEditables()}</div>
        {isEditing && (
          <EditProfile
            handleClose={handleClose}
            profileUser={profileUser}
            handleProfileEdit={handleProfileEdit}
          />
        )}
      </div>
    </div>
  );
}
