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

export interface Coordinates {
  lat: number | null;
  lng: number | null;
  id?: string;
}

interface CardsForActivityProps {
  marker: Coordinates;
  id?: string;
  onClose?: Dispatch<SetStateAction<Coordinates | null>>;
}

interface User {
  avatar: string;
  firstName: string;
  lastName: string;
  age: string;
  infoAboutUser: string;
  id: string;
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
    age: '',
    infoAboutUser: '',
    id: '',
  });

  const uid = useUID();

  useEffect(() => {
    if (marker.id) {
      getActivityById(marker.id)
        .then((activity: ActivityInterface) => {
          if (activity) {
            // console.log(activity);
            setActivity(activity);
            const userIds = [activity.createdBy];
            // console.log('userIds 1', userIds);

            if (activity.UserActivityParticipations) {
              // console.log(activity.UserActivityParticipations);
              const userParticipationIds = activity.UserActivityParticipations.map(
                (participation: any) => participation
              );
              // console.log('participantsIds', userParticipationIds);

              userIds.push(...userParticipationIds);
              // console.log('userIds 2', userIds);

              getUsersByIds(userIds)
                .then((users: number[] | any) => {
                  // console.log('users', users                  );

                  const creator = users.find((user: any) => user.id == activity.createdBy);
                  // console.log('creator', creator);
                  setCreator(creator);
                  const participants = users.filter((user: any) =>
                    userParticipationIds.includes(+user.id)
                  );
                  // console.log('participants', participants);

                  setParticipants(participants);
                  setOccupiedSpots(participants.length);
                  setIsUserParticipant(
                    participants.some((part: { id: number }) => part.id === uid)
                  );
                })
                .catch((error: any) => {
                  console.error(error);
                });
            } else {
              getUserById(activity.createdBy)
                .then((user: any) => {
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

    alert(
      `You just joined an activity created by: ${creator.firstName}, for for further communication use this link ${activity.telegramLink} `
    );
    updateUserActivity(participantsData)
      .then((response) => {
        setOccupiedSpots((prevSpots) => prevSpots + 1);
        getUsersByIds([activity.createdBy, ...activity.UserActivityParticipations]).then(
          (users: any) => {
            const userParticipationIds = activity.UserActivityParticipations.map(
              (participation: any) => participation.userId
            );
            const updatedParticipants = users.filter((user: any) =>
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
          prevParticipants.filter((participant) => parseInt(participant.id) !== uid)
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
        <Link to={`/profile/${creator.id}`}>
          <div className="created-by">
            <div className="createdText">
              {' '}
              Created by: <span>{creator.firstName} </span>
            </div>
            <div className="avatar">
              {' '}
              <img src={creator?.avatar} alt="Avatar" />
            </div>
          </div>
        </Link>
      </div>
      <div className="participants">
        {participants.length ? (
          <div>
            <strong>Already joined:</strong>
            {participants.map((part, index) => (
              <React.Fragment key={part.id}>
                <Link to={`/profile/${part.id}`}>
                  <span>{part.firstName}</span>
                </Link>
                {index !== participants.length - 1 && ', '}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div>No participants yet</div>
        )}
      </div>
      <div className="button-section">
        {uid !== parseInt(creator.id) && (
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
        {uid === parseInt(creator.id) && (
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
