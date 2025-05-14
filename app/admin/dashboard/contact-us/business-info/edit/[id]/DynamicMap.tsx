import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

// Dynamic Map to render using Leaflet
const DynamicMap = ({ lat, lng }: { lat: number, lng: number }) => {
  const position: LatLngExpression = [lat, lng]

  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  )
}

export default DynamicMap
