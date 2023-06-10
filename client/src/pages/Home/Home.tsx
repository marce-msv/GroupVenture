import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Map, { Coordinates } from "../../components/Map/Map";
import AddActivity from "../../components/AddActivity/AddActivity";
import './Home.css'
import { getActivities } from "../../Services/serviceActivity";
import { ActivityInterface } from "../AddActivityPage/AddActivityPage";
import CardsForActivity from "../../components/CardsForActivity/CardsForActivity";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";

export default function Home () {
  const geocoder = new google.maps.Geocoder();
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
    useEffect(()=> {
        loadMarkers();
    }, [])
    useEffect(() => {
      const address = formData.meetingPoint;
      
      if (address === "") {
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
            }
          });
          setMapCenter({
            lat: latitude,
            lng: longitude,
          });
        } 
      });
    }, [formData.meetingPoint])
    
    const loadMarkers = async () => {
        try {
          const activities = await getActivities();
          const filteredActivities = activities.data.filter((activity: ActivityInterface) => {
            if (formData.date && activity.date !== formData.date) {
              return false;
            }
            if (formData.typeOfActivity && activity.typeOfActivity !== formData.typeOfActivity) {
              return false;
            }
      
            // Check if the activity matches the selected coordinates??????
            // if (
            //   formData.coordinates.lat !== 0 && 
            //   formData.coordinates.lng !== 0 && 
            //   (activity.coordinates.lat !== formData.coordinates.lat ||
            //     activity.coordinates.lng !== formData.coordinates.lng)
            // ) {
            //   return false;
            // }
      
            return true;
          });
      
          const markers = filteredActivities.map((activity: ActivityInterface) => ({
            lat: activity.coordinates.lat,
            lng: activity.coordinates.lng,
            id: activity.id || ""
           }));
          setMarkers(markers);
        } catch (error) {
          console.error(error);
        }
      };

      const handleMarkerClick = (marker: Coordinates) => {
        setSelectedMarker(marker);
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
    const handleSubmit = (event: any) => {
      event.preventDefault();
      console.log(formData)
      loadMarkers();
      setFormData({
        date: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
      meetingPoint: '',
      typeOfActivity: '',})
    };
      // const visibleActivity = useMemo(
      //   () => {
      //     return (
      //       selectedMarker && <CardsForActivity marker={selectedMarker} onClose={setSelectedMarker} />
      //     );
      //   },
      //   [selectedMarker]
      // );


    return (
        
        <div className="mainPage" style={{ 
            backgroundImage: "url(/pexels.jpeg)" 
          }}>
            <div className="bodyHome">
            <form className="search-form" onSubmit={handleSubmit}>
            <Autocomplete
                    // onLoad={(autoComplete) => {
          
                    //   console.log('Autocomplete loaded:', autoComplete);
                    // }}
                    onPlaceChanged={() => {
                      const selectedPlace = (document.getElementById(
                        'meetingPoint'
                      ) as HTMLInputElement).value;


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

      <select id="typeOfActivity"
        value={formData.typeOfActivity}
        onChange={handleTypeOfActivityChange}>
        <option value="">Select an activity type</option>
        <option value="hiking">Hiking</option>
        <option value="trip">Trip</option>
        <option value="city activities">City activities</option>
        <option value="camping">Camping</option>
        <option value="sport activities">Sport activities</option>
        <option value="all">Select all</option>
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <div className="search-button-container">
        <input type="submit" value="Search" className="search-button" />
      </div>
    </form>
          <div className="mapHomePage">
          <Map markers={markers} selectedMarker={selectedMarker} onMarkerClick={handleMarkerClick} center={mapCenter as google.maps.LatLngLiteral}/>
          <div className="cardContainer">
          {selectedMarker && <CardsForActivity marker={selectedMarker} onClose={setSelectedMarker} />}
          </div>
        </div>
            <AddActivity/>
            {/* {JSON.stringify(selectedMarker)} */}
            </div>
        </div>
    )
}