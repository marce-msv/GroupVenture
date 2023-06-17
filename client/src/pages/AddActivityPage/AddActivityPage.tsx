import { MDBBtn, MDBContainer, MDBInput, MDBRow, MDBCol, MDBTextArea } from 'mdb-react-ui-kit';
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import Map, { Coordinates } from '../../components/Map/Map';
import { Autocomplete } from '@react-google-maps/api';
import { postActivity } from '../../Services/serviceActivity';
import { useUID } from '../../customHooks';

export interface ActivityInterface {
  id?: string;
  title: string;
  date: string;
  meetingPoint: string;
  coordinates: Coordinates;
  typeOfActivity: string;
  aboutActivity: string;
  spots: string;
  telegramLink: string;
}

export default function AddActivityPage() {
  const uid = useUID();
  const geocoder = new google.maps.Geocoder();
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(null);

  const [mapCenter, setMapCenter] = useState<Coordinates>({
    lat: 41.390205,
    lng: 2.154007,
  });

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

  useEffect(() => {
    if (formData.coordinates.lng === null && formData.coordinates.lat === null) {
      return;
    }
    setMarkerPosition(formData.coordinates);
  }, [formData.coordinates]);

  useEffect(() => {
    const address = formData.meetingPoint;

    if (address === '') {
      return;
    }

    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
        const location = results[0].geometry.location;
        const latitude = location.lat();
        const longitude = location.lng();

        setFormData({
          ...formData,
          coordinates: {
            lat: latitude,
            lng: longitude,
          },
        });
        setMapCenter({
          lat: latitude,
          lng: longitude,
        });
      }
    });
  }, [formData.meetingPoint]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postActivity(formData, uid);
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

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleTypeOfActivityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      typeOfActivity: e.target.value,
    });
  };

  const handleMapClick = (event: any) => {
    console.log('location before geocoder');
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    const location = new google.maps.LatLng(latitude, longitude);

    console.log('location before geocoder');
    console.log(location);

    geocoder.geocode({ location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
        console.log('i am here');
        const address = results[0].formatted_address;

        setFormData({
          ...formData,
          meetingPoint: address,
          coordinates: {
            lat: location.lat(),
            lng: location.lng(),
          },
        });
        console.log('Selected place:', address);
        console.log('Location:', location.lat(), location.lng());

        const marker = new google.maps.Marker({
          position: location,
          map: mapRef.current,
        });
      } else {
        setFormData({
          ...formData,
          meetingPoint: `${latitude}, ${longitude}`,
        });
      }
    });

    console.log('Map clicked:', event.latLng.lat(), event.latLng.lng());
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center">
        <MDBCol sm="5">
          <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <h3 className="fw-normal mb-3" style={{ letterSpacing: '1px' }}>
              Add an activity
            </h3>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Title"
                id="title"
                type="text"
                size="lg"
                value={formData.title}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4 w-100"
                id="date"
                type="datetime-local"
                size="lg"
                value={formData.date}
                onChange={handleChange}
              />
              <div>
                <Autocomplete
                  onPlaceChanged={() => {
                    const selectedPlace = (
                      document.getElementById('meetingPoint') as HTMLInputElement
                    ).value;

                    setFormData({
                      ...formData,
                      meetingPoint: selectedPlace,
                    });
                  }}
                >
                  <input
                    id="meetingPoint"
                    type="text"
                    className="form-control"
                    placeholder="Enter a meeting point or select on map"
                    value={formData.meetingPoint}
                    onChange={handleChange}
                  />
                </Autocomplete>
              </div>
              <div className="forMap">
                <Map
                  onMapClick={handleMapClick}
                  markers={markerPosition ? [markerPosition] : []}
                  center={mapCenter as google.maps.LatLngLiteral}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="typeOfActivity" className="form-label"></label>
                <select
                  id="typeOfActivity"
                  className="form-select"
                  value={formData.typeOfActivity}
                  onChange={handleTypeOfActivityChange}
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
                wrapperClass="mb-4 w-100"
                label="How many people can join you?"
                id="spots"
                type="number"
                size="lg"
                value={formData.spots}
                min="0"
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Please, provide an telegram link on chat for communication"
                id="telegramLink"
                type="text"
                size="lg"
                value={formData.telegramLink}
                onChange={handleChange}
              />
              <MDBTextArea
                wrapperClass="mb-4 w-100"
                label="Tell us something about this activity"
                id="aboutActivity"
                rows={4}
                value={formData.aboutActivity}
                onChange={handleChange}
              />
              <MDBBtn className="mb-4 w-100" color="info" size="lg" type="submit">
                Submit
              </MDBBtn>
            </form>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
