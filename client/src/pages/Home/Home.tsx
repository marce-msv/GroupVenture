import React, { ChangeEvent, useEffect, useState } from 'react';
import { ActivityInterface } from '../AddActivityPage/AddActivityPage';
import Map, { Coordinates } from '../../components/Map/Map';
import { getActivities } from '../../Services/serviceActivity';
import CardsForActivity from '../../components/CardsForActivity/CardsForActivity';
import { Autocomplete } from '@react-google-maps/api';
import AddActivity from '../../components/AddActivity/AddActivity';
import { useUID } from '../../customHooks';
import './Home.css';

export default function Home() {
  const [formData, setFormData] = useState({
    date: '',
    coordinates: {
      lat: 0,
      lng: 0,
    },
    meetingPoint: '',
    typeOfActivity: '',
  });

  const [mapCenter, setMapCenter] = useState<Coordinates>({
    lat: 41.390205,
    lng: 2.154007,
  });

  const [markers, setMarkers] = useState<Coordinates[]>([]);

  const [selectedMarker, setSelectedMarker] = useState<Coordinates | null>(null);

  const geocoder = new google.maps.Geocoder();

  const uid = useUID();

  useEffect(() => {
    loadMarkers();
  }, [selectedMarker]);

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

  const loadMarkers = async () => {
    try {
      const activities = await getActivities();
      const filteredActivities = activities.data.filter((activity: ActivityInterface) => {
        if (formData.date && activity.date.substring(0, 10) !== formData.date) {
          return false;
        }
        if (formData.typeOfActivity && activity.typeOfActivity !== formData.typeOfActivity) {
          return false;
        }
        return true;
      });

      const markers = filteredActivities.map((activity: ActivityInterface) => ({
        lat: activity.coordinates.lat,
        lng: activity.coordinates.lng,
        id: activity.id || '',
      }));
      setMarkers(markers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkerClick = (marker: Coordinates) => {
    if (uid) {
      setSelectedMarker(marker);
    } else {
      alert('You need to log in to see information about activities');
    }
  };

  const handleTypeOfActivityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      typeOfActivity: e.target.value,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    loadMarkers();
    setFormData({
      date: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
      meetingPoint: '',
      typeOfActivity: '',
    });
  };

  return (
    <div
      className="mainPage"
      style={{
        backgroundImage: 'url(/pexels.jpeg)',
      }}
    >
      <div className="homePageMain">
        <div className="bodyHome">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="form-group">
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
                  placeholder="Enter a meeting point"
                  value={formData.meetingPoint}
                  onChange={handleChange}
                />
              </Autocomplete>
            </div>

            <div className="form-group">
              <select
                id="typeOfActivity"
                className="form-control"
                value={formData.typeOfActivity}
                onChange={handleTypeOfActivityChange}
              >
                <option value="">Select an activity type</option>
                <option value="hiking">Hiking</option>
                <option value="trip">Trip</option>
                <option value="city activities">City activities</option>
                <option value="camping">Camping</option>
                <option value="sport activities">Sport activities</option>
                <option value="all">Select all</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="date"
                id="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Search" className="search-button" />
            </div>
          </form>
          <div className="mapHomePage">
            <Map
              markers={markers}
              selectedMarker={selectedMarker}
              onMarkerClick={handleMarkerClick}
              center={mapCenter as google.maps.LatLngLiteral}
            />
            {uid && (
              <div className="cardContainer">
                {selectedMarker && (
                  <CardsForActivity marker={selectedMarker} onClose={setSelectedMarker} />
                )}
              </div>
            )}
          </div>
        </div>
        <AddActivity />
      </div>
    </div>
  );
}
