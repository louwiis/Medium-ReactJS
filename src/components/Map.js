import { LocationContext } from '../providers/LocationStore';
import { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const { location } = useContext(LocationContext);

  return (
    <>
      <MapContainer center={[48.86628, 2.37361]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%", zIndex: 0}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          location !== null && Object.keys(location).map((key) => {
            return (
              <Marker key={key} position={[location[key].location.latitude, location[key].location.longitude]}>
                <Popup>
                  { key }
                </Popup>
              </Marker>
            )
          })
        }
      </MapContainer>
    </>
  );
}