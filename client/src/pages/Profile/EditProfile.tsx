import { useState, ChangeEvent, FormEvent } from 'react';
import { MDBBtn, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { FormDataInterface } from '../Authentication/SignupPage';
import { updateUser } from '../../Services/serviceUser';
import { useUID } from '../../customHooks';
import './Profile.css';
import { UserInterface } from './Profile';
import { toast } from 'react-toastify';

interface EditProfileProps {
  handleClose: () => void;
  profileUser: UserInterface | null;
  handleProfileEdit: () => void;
}

const EditProfile = ({ handleClose, profileUser, handleProfileEdit }: EditProfileProps) => {
  const initialFormData = {
    avatar: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    infoAboutUser: '',
  };

  const [image, _setImage] = useState(profileUser?.avatar);
  const [formData, setFormData] = useState<FormDataInterface>(initialFormData);

  const uid = useUID();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.id === 'avatar' && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      setFormData({
        ...formData,
        avatar: file || null,
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          _setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        _setImage(undefined);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dpzz6vn2w/upload';
    const cloudinaryUploadPreset = 'AleCloud';

    const formDataToUpload = new FormData();
    formDataToUpload.append('file', formData.avatar || '');
    formDataToUpload.append('upload_preset', cloudinaryUploadPreset);

    try {
      let imageUrl = null;

      if (formData.avatar !== null) {
        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formDataToUpload,
        });
        const data = await response.json();
        imageUrl = data.url;
      }

      if (!profileUser) return; // TODO revisar esta logica

      const user: UserInterface | FormDataInterface = {
        avatar: formData.avatar !== null ? imageUrl : profileUser.avatar,
        firstName: formData.firstName || profileUser.firstName,
        lastName: formData.lastName || profileUser.lastName,
        email: formData.email || profileUser.email,
        password: formData.password || profileUser.password,
        age: Number(formData.age) || profileUser.age,
        infoAboutUser: formData.infoAboutUser || profileUser.infoAboutUser,
      };

      const userUpdated = await updateUser(uid, user);
      setFormData(userUpdated);

      const fileInput = document.getElementById('avatar') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      handleClose();
      handleProfileEdit();
    } catch (error) {
      console.error('Error:', error);
      toast.warn(
        'An error occurred while uploading the image. Please try again.',
        {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        }
      );
    }
  };

  return (
    <div className="editProfileContainer">
      <div className="chnageBody">
        <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-2 mx-5 w-100">
              <div>Here you can edit your profile info</div>
              <div className=" d-flex justify-content-center">
                <div className="profileAvatar">
                  {formData.avatar || profileUser?.avatar ? (
                    <img src={image} alt="img" />
                  ) : (
                    <div className="altTextContainer">
                      <div>Choose your profile picture</div>
                    </div>
                  )}
                </div>
              </div>
              <MDBInput
                id="avatar"
                type="file"
                size="lg"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <MDBInput
              wrapperClass="mb-2 mx-5 w-100"
              label="First name"
              id="firstName"
              type="text"
              size="lg"
              defaultValue={formData.firstName || profileUser?.firstName || ''}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-2 mx-5 w-100"
              label="Last Name"
              id="lastName"
              type="text"
              size="lg"
              defaultValue={formData.lastName || profileUser?.lastName || ''}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-2 mx-5 w-100"
              label="Age"
              id="age"
              type="number"
              size="lg"
              min="0"
              defaultValue={formData.age || profileUser?.age || ''}
              onChange={handleChange}
            />
            <MDBTextArea
              wrapperClass="mb-2 mx-5 w-100"
              label="Info about you"
              id="infoAboutUser"
              size="lg"
              defaultValue={formData.infoAboutUser || profileUser?.infoAboutUser || ''}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-2 mx-5 w-100"
              label="Email address"
              id="email"
              type="email"
              size="lg"
              defaultValue={formData.email || profileUser?.email || ''}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-2 mx-5 w-100"
              label="Password"
              id="password"
              type="password"
              size="lg"
              defaultValue={formData.password || profileUser?.password || ''}
              onChange={handleChange}
            />
            <MDBBtn className="mb-2 px-4 mx-5 w-100" color="info" size="lg" type="submit">
              Submit Changes
            </MDBBtn>
            <MDBBtn className="mb-2 px-4 mx-5 w-100" color="danger" size="lg" onClick={handleClose}>
              Close
            </MDBBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
