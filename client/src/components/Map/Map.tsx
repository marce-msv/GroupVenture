import './Map.css';

import { GoogleMap, Marker } from '@react-google-maps/api';

export interface Coordinates {
  lat: number | null;
  lng: number | null;
}

interface MapProps {
  markers: Coordinates[];
  selectedMarker?: Coordinates | null;
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  onMarkerClick?: (marker: Coordinates, id?: string) => void;
  center?: google.maps.LatLngLiteral | undefined;
}

export default function Map({ markers, onMarkerClick, onMapClick, center }: MapProps) {
  const mapContainerStyle = {
    marginTop: '30px',
    width: '100%',
    height: '500px',
  };

  const centerCoordinates = {
    lat: 41.390205,
    lng: 2.154007,
  };

  const handleMarkerClick = (marker: Coordinates) => {
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  const renderMarkers = () => {
    if (!markers.length) {
      return;
    }
    return markers.map((position, key) => (
      <Marker
        key={key}
        position={position as google.maps.LatLngLiteral}
        onClick={() => handleMarkerClick(position)}
      />
    ));
  };

  return (
    <div className="mainbodyforMap">
      <div className="map">
        <GoogleMap
          onClick={onMapClick}
          mapContainerStyle={mapContainerStyle}
          center={center || centerCoordinates}
          zoom={11}
        >
          {renderMarkers()}
        </GoogleMap>
      </div>
    </div>
  );
}
