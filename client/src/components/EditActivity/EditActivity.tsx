import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTextArea } from 'mdb-react-ui-kit';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ActivityInterface } from '../../pages/AddActivityPage/AddActivityPage';
import { updateActivity } from '../../Services/serviceActivity';
import './EditActivity.css';

export default function EditActivity({ handleClose, activity }: any) {
  
  const [formData, setFormData] = useState<ActivityInterface>({
    title: '',
    date: '',
    meetingPoint: '',
    coordinates: {
      lat: null,
      lng: null,
    },
    typeOfActivity: '',
    aboutActivity: '',
    spots: '',
    telegramLink: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newActivity = {
      title: formData.title || activity.title,
      date: formData.date || activity.date,
      meetingPoint: activity.meetingPoint,
      coordinates: activity.coordinates,
      typeOfActivity: formData.typeOfActivity || activity.typeOfActivity,
      aboutActivity: formData.aboutActivity || activity.aboutActivity,
      spots: formData.spots || activity.spots,
      telegramLink: formData.telegramLink || activity.telegramLink,
    };
    const activityUpdated = updateActivity(activity.id, newActivity);
    handleClose();
    setFormData({
      title: '',
      date: '',
      meetingPoint: '',
      coordinates: {
        lat: null,
        lng: null,
      },
      typeOfActivity: '',
      aboutActivity: '',
      spots: '',
      telegramLink: '',
    });
  };

  const handleTypeOfActivityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      typeOfActivity: e.target.value,
    });
  };

  return (
    <div className="cardDiv">
      <MDBContainer fluid>
        <MDBRow className="justify-content-center">
          <MDBCol sm="9">
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
              <h3 className="fw-normal mb-3" style={{ letterSpacing: '1px' }}>
                Change info about activity
              </h3>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  label="Title"
                  id="title"
                  type="text"
                  size="lg"
                  defaultValue={formData.title || activity?.title || ''}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  id="date"
                  type="datetime-local"
                  size="lg"
                  defaultValue={formData.date || activity?.date || ''}
                  onChange={handleChange}
                />
                <div className="mb-2">
                  <select
                    id="typeOfActivity"
                    className="form-select"
                    defaultValue={formData.typeOfActivity || activity?.typeOfActivity || ''}
                    onChange={handleTypeOfActivityChange}
                    style={{ background: 'transparent' }}
                  >
                    <option value="">Select an activity type</option>
                    <option value="hiking">Hiking</option>
                    <option value="trip">Trip</option>
                    <option value="city activities">City activities</option>
                    <option value="camping">Camping</option>
                    <option value="sport activities">Sport activities</option>
                  </select>
                </div>
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  label="How many people can join you?"
                  id="spots"
                  type="number"
                  size="lg"
                  defaultValue={formData.spots || activity?.spots || ''}
                  min="0"
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  label="Please, provide an telegram link on chat for communication"
                  id="telegramLink"
                  type="text"
                  size="lg"
                  defaultValue={formData.telegramLink || activity?.telegramLink || ''}
                  onChange={handleChange}
                />
                <MDBTextArea
                  wrapperClass="mb-2 w-100"
                  label="Tell us something about this activity"
                  id="aboutActivity"
                  rows={4}
                  defaultValue={formData.aboutActivity || activity?.aboutActivity || ''}
                  onChange={handleChange}
                />
                <MDBBtn className="mb-2 w-100" color="info" size="lg" type="submit">
                  Submit
                </MDBBtn>
                <MDBBtn
                  className="mb-2 w-100"
                  color="danger"
                  size="lg"
                  type="reset"
                  onClick={handleClose}
                >
                  Close
                </MDBBtn>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
