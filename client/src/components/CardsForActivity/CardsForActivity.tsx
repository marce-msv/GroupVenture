import { updateUserActivity, updateUserActivityLeave } from '../../Services/serviceParticipants';
import { MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { deleteActivityByID, getActivityById } from '../../Services/serviceActivity';
import { ActivityInterface } from '../../pages/AddActivityPage/AddActivityPage';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getUserById, getUsersByIds } from '../../Services/serviceUser';
import EditActivity from '../EditActivity/EditActivity';
import { useUID } from '../../customHooks';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './CardsForActivity.css';
import { UserInterface } from '../../pages/Profile/Profile';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export interface Coordinates {
  lat: number | null;
  lng: number | null;
  id?: string;
}

interface CardsForActivityProps {
  marker: Coordinates;
  id?: number;
  onClose?: Dispatch<SetStateAction<Coordinates | null>>;
}

interface User {
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  infoAboutUser: string;
  id: number;
}

const CardsForActivity: React.FC<CardsForActivityProps> = ({ marker, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [occupiedSpots, setOccupiedSpots] = useState(0);
  const [participants, setParticipants] = useState<User[]>([]);
  const [isUserParticipant, setIsUserParticipant] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activity, setActivity] = useState<ActivityInterface>({
    title: '',
    date: '',
    meetingPoint: '',
    createdBy: 0,
    coordinates: {
      lat: null,
      lng: null,
    },
    typeOfActivity: '',
    aboutActivity: '',
    spots: 0,
    telegramLink: '',
    UserActivityParticipations: [],
    id: '',
  });
  const [creator, setCreator] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    age: 0,
    infoAboutUser: '',
    id: -1,
  });

  const uid = useUID();

  useEffect(() => {
    if (marker.id) {
      getActivityById(marker.id)
        .then((activity: ActivityInterface) => {
          if (activity) {
            setActivity(activity);
            const userIds = [activity.createdBy];

            if (activity.UserActivityParticipations) {
              const userParticipationIds = activity.UserActivityParticipations.map(
                (participation: number) => participation
              );

              userIds.push(...userParticipationIds);

              getUsersByIds(userIds)
                .then((users: UserInterface[]) => {
                  const creator = users.find(
                    (user: UserInterface) => user.id == activity.createdBy
                  );

                  if (!creator) return;
                  setCreator(creator);

                  const participants = users.filter(
                    (user: UserInterface) => user.id !== creator.id
                  );

                  setParticipants(participants);
                  setOccupiedSpots(participants.length);
                  setIsUserParticipant(participants.some((part: { id: number }) => part.id == uid));
                })
                .catch((error: any) => {
                  console.error(error);
                });
            } else {
              getUserById(activity.createdBy)
                .then((user: UserInterface) => {
                  if (user) {
                    setCreator(user);
                  }
                })
                .catch((error: any) => {
                  console.error(error);
                });
            }
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [occupiedSpots]);

  if (!marker || !isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose(null);
    }
  };

  const joinActivity = () => {
    const participantsData = {
      userId: Number(uid || ''),
      activityId: parseInt(marker.id || ''),
    };

    toast.info(
      `You've joined this activity created by: ${creator.firstName}, join in the following link ${activity.telegramLink} `,
      {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      }
    );
    updateUserActivity(participantsData)
      .then((response) => {
        setOccupiedSpots((prevSpots) => prevSpots + 1);
        getUsersByIds([activity.createdBy, ...activity.UserActivityParticipations]).then(
          (users) => {
            const userParticipationIds = activity.UserActivityParticipations.map(
              (participation) => participation
            );
            const updatedParticipants = users.filter((user: UserInterface) =>
              userParticipationIds.includes(user.id)
            );
            setParticipants(updatedParticipants);
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const leaveActivity = () => {
    const participantsData = {
      userId: String(uid || ''),
      activityId: parseInt(marker.id || ''),
    };

    updateUserActivityLeave(participantsData)
      .then((response) => {
        setParticipants((prevParticipants) =>
          prevParticipants.filter((participant) => participant.id !== uid)
        );
        setIsUserParticipant(false);
        setOccupiedSpots((prevSpots) => prevSpots - 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteActivity = () => {
    deleteActivityByID(activity.id).then(() => {
      handleClose();
    });
  };

  const editActivity = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return <EditActivity handleClose={handleClose} activity={activity} />;
  }

  const notify = () => toast('Wow so easy !');

  return (
    <div className="card">
      <div className="button-section">
        <MDBBtn className="delete-button" onClick={handleClose}>
          ✕
        </MDBBtn>
      </div>
      <div className="activity-details">
        <div className="activity-info">
          <MDBCardTitle>{activity.title}</MDBCardTitle>
          <MDBCardSubTitle>{moment(activity.date).format('llll')}</MDBCardSubTitle>
          <MDBCardText>
            <strong>Type of activity:</strong> {activity.typeOfActivity}
          </MDBCardText>
          <MDBCardText>
            <strong>Info about activity:</strong> {activity.aboutActivity}
          </MDBCardText>
          <MDBCardText>
            <strong>Address:</strong> {activity.meetingPoint}
          </MDBCardText>
          <MDBCardText>
            <strong>Occupied spots:</strong> {occupiedSpots}/{activity.spots}
          </MDBCardText>
        </div>
          <div className="created-by">
            <div className="createdText">
              {' '}
              <strong>Created by:</strong> 
            </div>
        <Link to={`/profile/${creator.id}`}>
            <div className="avatar" title={creator.firstName}>
              {' '}
              <img src={creator?.avatar} alt="Avatar" />
            </div>
        </Link>
          </div>
      </div>
      <div >
        {participants.length ? (
          <div className="participants">
            <strong>Already joined:</strong>
            {participants.map((part, index) => (
              <React.Fragment key={part.id}>
                <Link to={`/profile/${part.id}`}>
                <div className="participantImg" title={part.firstName}>
                  <img src={part.avatar} alt="Avatar" />
                </div>
                </Link>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div>No participants yet</div>
        )}
      </div>
      <div className="button-section">
        {uid != creator.id && (
          <>
            {isUserParticipant ? (
              <MDBBtn color="danger" onClick={leaveActivity}>
                Leave
              </MDBBtn>
            ) : (
              <MDBBtn color="success" onClick={joinActivity}>
                Join
              </MDBBtn>
            )}
          </>
        )}
        {uid == creator.id && (
          <div className="btns">
            <MDBBtn className="me-2 width-btn" color="info" onClick={editActivity}>
              EDIT
            </MDBBtn>
            <MDBBtn className="me-1 width-btn" color="danger" onClick={deleteActivity}>
              Delete
            </MDBBtn>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsForActivity;
